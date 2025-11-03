import { ClipboardPaste, UserCircle, Sparkles, Download } from "lucide-react";

const steps = [
  {
    icon: ClipboardPaste,
    number: "01",
    title: "Cole o Anúncio",
    description: "Copie e cole o anúncio da vaga que você deseja aplicar.",
  },
  {
    icon: UserCircle,
    number: "02",
    title: "Preencha Seus Dados",
    description: "Adicione suas informações profissionais e experiências.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "IA Otimiza",
    description: "Nossa IA analisa e cria um currículo otimizado para a vaga.",
  },
  {
    icon: Download,
    number: "04",
    title: "Baixe e Use",
    description: "Baixe seu currículo em PDF e candidate-se com confiança!",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Como Funciona?
          </h2>
          <p className="text-xl text-muted-foreground">
            4 passos simples para criar seu currículo perfeito
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary -translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10 text-center space-y-4">
                  <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-large">
                    <Icon className="w-12 h-12 text-primary-foreground" />
                  </div>
                  
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg shadow-medium">
                    {step.number}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground pt-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
