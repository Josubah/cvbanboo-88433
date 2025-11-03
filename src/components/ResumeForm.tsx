import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeFormProps {
  onGenerate: (data: ResumeData) => void;
  isLoading: boolean;
}

export interface ResumeData {
  jobAd: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
}

export const ResumeForm = ({ onGenerate, isLoading }: ResumeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ResumeData>({
    jobAd: "",
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobAd.trim()) {
      toast({
        title: "Anúncio da vaga necessário",
        description: "Por favor, cole o anúncio da vaga para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast({
        title: "Informações básicas necessárias",
        description: "Por favor, preencha seu nome e e-mail.",
        variant: "destructive",
      });
      return;
    }
    
    onGenerate(formData);
  };

  const handleChange = (field: keyof ResumeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="form" className="py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Crie Seu Currículo Agora
            </h2>
            <p className="text-xl text-muted-foreground">
              Preencha as informações abaixo e deixe a IA fazer o resto
            </p>
          </div>
          
          <Card className="p-8 shadow-large border-border">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Job Ad Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <Label htmlFor="jobAd" className="text-lg font-semibold">
                    Anúncio da Vaga *
                  </Label>
                </div>
                <Textarea
                  id="jobAd"
                  placeholder="Cole aqui o texto completo do anúncio da vaga..."
                  value={formData.jobAd}
                  onChange={(e) => handleChange("jobAd", e.target.value)}
                  className="min-h-[200px] text-base"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Nossa IA irá analisar o anúncio e extrair as palavras-chave mais importantes.
                </p>
              </div>

              <div className="border-t border-border" />

              {/* Personal Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informações Pessoais</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      placeholder="João Silva"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao@exemplo.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 98765-4321"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="linkedin.com/in/joaosilva"
                      value={formData.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informações Profissionais</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="summary">Resumo Profissional</Label>
                  <Textarea
                    id="summary"
                    placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
                    value={formData.summary}
                    onChange={(e) => handleChange("summary", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experiência Profissional</Label>
                  <Textarea
                    id="experience"
                    placeholder="Liste suas experiências profissionais mais relevantes..."
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education">Formação Acadêmica</Label>
                  <Textarea
                    id="education"
                    placeholder="Descreva sua formação acadêmica..."
                    value={formData.education}
                    onChange={(e) => handleChange("education", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Habilidades</Label>
                  <Textarea
                    id="skills"
                    placeholder="Liste suas principais habilidades e competências..."
                    value={formData.skills}
                    onChange={(e) => handleChange("skills", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full text-lg h-14"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando Currículo...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Currículo Otimizado
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
