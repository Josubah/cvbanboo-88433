import { Brain, Target, FileCheck, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "IA Especializada",
    description: "Nossa inteligência artificial entende o que os recrutadores e sistemas ATS procuram em um currículo.",
  },
  {
    icon: Target,
    title: "Palavras-Chave Precisas",
    description: "Extraímos automaticamente as palavras-chave do anúncio e incorporamos estrategicamente no seu currículo.",
  },
  {
    icon: FileCheck,
    title: "Compatível com ATS",
    description: "Formatação otimizada para passar pelos filtros do Gupy, Kenoby, Pandapé e outros sistemas de recrutamento.",
  },
  {
    icon: Zap,
    title: "Rápido e Fácil",
    description: "Cole o anúncio, preencha seus dados e pronto! Seu currículo otimizado estará pronto em segundos.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Por que usar nossa plataforma?
          </h2>
          <p className="text-xl text-muted-foreground">
            Tecnologia de ponta para aumentar suas chances de ser chamado para entrevista
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 space-y-4 border-border hover:shadow-medium transition-smooth bg-card group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-bounce">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
