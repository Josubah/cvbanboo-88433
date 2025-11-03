import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";

interface ResumePreviewProps {
  resume: string;
  onBack: () => void;
  onDownload: () => void;
}

export const ResumePreview = ({ resume, onBack, onDownload }: ResumePreviewProps) => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            
            <Button variant="hero" onClick={onDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Baixar PDF
            </Button>
          </div>
          
          <Card className="p-12 shadow-large bg-card">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: resume }}
            />
          </Card>
          
          <div className="flex justify-center">
            <Button variant="hero" size="lg" onClick={onDownload} className="gap-2 text-lg h-14 px-8">
              <Download className="w-5 h-5" />
              Baixar Currículo em PDF
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
