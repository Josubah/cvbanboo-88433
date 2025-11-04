import { useState } from "react";
import { ResumeForm, type ResumeData } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);

  const handleGenerate = async (data: ResumeData) => {
    setIsGenerating(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-resume`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            jobAd: data.jobAd,
            userData: {
              fullName: data.fullName,
              email: data.email,
              phone: data.phone,
              linkedin: data.linkedin,
              summary: data.summary,
              experience: data.experience,
              education: data.education,
              skills: data.skills,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao gerar currículo');
      }

      const { resume } = await response.json();
      setGeneratedResume(resume);
      
      toast({
        title: "Currículo gerado com sucesso!",
        description: "Seu currículo foi otimizado para a vaga.",
      });
      
      // Scroll to preview
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: "Erro ao gerar currículo",
        description: error instanceof Error ? error.message : "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedResume) return;
    
    // Create a printable version
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Erro ao abrir janela",
        description: "Permita pop-ups para baixar o PDF.",
        variant: "destructive",
      });
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Currículo</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            h1 { font-size: 28px; margin-bottom: 8px; }
            h2 { font-size: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; }
            p { margin: 8px 0; }
            .space-y-6 > * + * { margin-top: 24px; }
            .space-y-2 > * + * { margin-top: 8px; }
            .space-y-1 > * + * { margin-top: 4px; }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          ${generatedResume}
        </body>
      </html>
    `);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleBack = () => {
    setGeneratedResume(null);
  };

  if (generatedResume) {
    return (
      <ResumePreview 
        resume={generatedResume}
        onBack={handleBack}
        onDownload={handleDownload}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <ResumeForm onGenerate={handleGenerate} isLoading={isGenerating} />
    </main>
  );
};

export default Index;
