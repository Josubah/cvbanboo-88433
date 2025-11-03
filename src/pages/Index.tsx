import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { ResumeForm, type ResumeData } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);

  const handleGetStarted = () => {
    const formSection = document.getElementById("form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerate = async (data: ResumeData) => {
    setIsGenerating(true);
    
    try {
      // TODO: Integrate with Lovable Cloud AI function
      // For now, we'll simulate the generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResume = `
        <div class="space-y-6">
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold text-foreground">${data.fullName}</h1>
            <div class="text-muted-foreground space-y-1">
              <p>${data.email} ${data.phone ? `• ${data.phone}` : ''}</p>
              ${data.linkedin ? `<p>${data.linkedin}</p>` : ''}
            </div>
          </div>
          
          ${data.summary ? `
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-foreground border-b-2 border-primary pb-1">RESUMO PROFISSIONAL</h2>
            <p class="text-foreground">${data.summary}</p>
          </div>
          ` : ''}
          
          ${data.experience ? `
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-foreground border-b-2 border-primary pb-1">EXPERIÊNCIA PROFISSIONAL</h2>
            <p class="text-foreground whitespace-pre-line">${data.experience}</p>
          </div>
          ` : ''}
          
          ${data.education ? `
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-foreground border-b-2 border-primary pb-1">FORMAÇÃO ACADÊMICA</h2>
            <p class="text-foreground whitespace-pre-line">${data.education}</p>
          </div>
          ` : ''}
          
          ${data.skills ? `
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-foreground border-b-2 border-primary pb-1">HABILIDADES</h2>
            <p class="text-foreground whitespace-pre-line">${data.skills}</p>
          </div>
          ` : ''}
        </div>
      `;
      
      setGeneratedResume(mockResume);
      
      toast({
        title: "Currículo gerado com sucesso!",
        description: "Seu currículo foi otimizado para a vaga.",
      });
      
      // Scroll to preview
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      
    } catch (error) {
      toast({
        title: "Erro ao gerar currículo",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download em breve!",
      description: "Funcionalidade de download será implementada em breve.",
    });
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
    <main className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <HowItWorks />
      <ResumeForm onGenerate={handleGenerate} isLoading={isGenerating} />
    </main>
  );
};

export default Index;
