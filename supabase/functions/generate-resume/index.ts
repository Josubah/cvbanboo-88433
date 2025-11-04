import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobAd, userData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Processing resume generation request');

    const systemPrompt = `Você é um especialista em criação de currículos otimizados para sistemas ATS (Applicant Tracking Systems) como Gupy, Kenoby e Pandapé.

Sua tarefa é:
1. Analisar cuidadosamente o anúncio da vaga fornecido
2. Identificar palavras-chave técnicas, habilidades requisitadas e competências mencionadas
3. Criar um currículo profissional que incorpore essas palavras-chave de forma natural
4. Otimizar a formatação para ser facilmente lida por sistemas ATS
5. Destacar experiências e habilidades do candidato que são relevantes para a vaga

IMPORTANTE:
- Use formato HTML simples e limpo
- Incorpore as palavras-chave do anúncio de forma natural no texto
- Priorize clareza e objetividade
- Mantenha formatação compatível com ATS (evite tabelas complexas, use tags semânticas)
- Adapte o resumo profissional para a vaga específica
- Destaque experiências relevantes primeiro`;

    const userPrompt = `
ANÚNCIO DA VAGA:
${jobAd}

DADOS DO CANDIDATO:
Nome: ${userData.fullName}
Email: ${userData.email}
Telefone: ${userData.phone || 'Não informado'}
LinkedIn: ${userData.linkedin || 'Não informado'}
Resumo: ${userData.summary || 'Não informado'}
Experiência: ${userData.experience || 'Não informado'}
Formação: ${userData.education || 'Não informado'}
Habilidades: ${userData.skills || 'Não informado'}

Crie um currículo otimizado para essa vaga em formato HTML limpo, incorporando as palavras-chave do anúncio de forma natural.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente em alguns instantes.' }), 
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos insuficientes. Por favor, adicione créditos ao seu workspace.' }), 
          {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Erro ao processar com a IA');
    }

    const data = await response.json();
    const generatedResume = data.choices[0].message.content;

    console.log('Resume generated successfully');

    return new Response(
      JSON.stringify({ resume: generatedResume }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-resume function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
