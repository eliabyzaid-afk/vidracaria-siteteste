import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BannerRequest {
  tipo: string;
  produto: string;
  preco: string;
  beneficios: string;
  diferencial: string;
}

interface BannerCopy {
  titulo: string;
  subtitulo: string;
  beneficios: string[];
  cta: string;
}

const MOCK_COPIES: BannerCopy[] = [
  {
    titulo: "Transforme Sua Vida Hoje!",
    subtitulo: "A solução que você estava esperando chegou",
    beneficios: ["Resultado garantido", "Suporte completo", "Preço justo"],
    cta: "Aproveitar Agora"
  },
  {
    titulo: "Oferta Por Tempo Limitado",
    subtitulo: "Não perca essa oportunidade única",
    beneficios: ["Qualidade premium", "Entrega rápida", "Satisfação garantida"],
    cta: "Quero Comprar"
  },
  {
    titulo: "O Melhor Custo-Benefício",
    subtitulo: "Qualidade superior pelo menor preço",
    beneficios: ["Frete grátis", "Garantia de 30 dias", "Parcelamento sem juros"],
    cta: "Comprar Agora"
  },
  {
    titulo: "Sucesso Começa Aqui",
    subtitulo: "Junte-se a milhares de clientes satisfeitos",
    beneficios: ["Aprovado por especialistas", "Resultados comprovados", "Suporte 24h"],
    cta: "Começar Já"
  },
  {
    titulo: "Promoção Exclusiva!",
    subtitulo: "Condições especiais só para você",
    beneficios: ["Desconto imperdível", "Bônus exclusivo", "Atendimento VIP"],
    cta: "Garantir Desconto"
  }
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("creditos, plano")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: "Perfil não encontrado" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (profile.creditos < 1) {
      return new Response(JSON.stringify({ error: "Créditos insuficientes. Adquira mais créditos para continuar." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const body: BannerRequest = await req.json();
    const { tipo, produto, preco, beneficios, diferencial } = body;

    let copies: BannerCopy[] = [];
    const openaiKey = Deno.env.get("OPENAI_API_KEY");

    if (openaiKey) {
      const prompt = `Você é um copywriter especialista em vendas. Crie 5 variações de copy para um banner de vendas.

Produto/Serviço: ${produto}
Tipo de banner: ${tipo}
Preço: R$ ${preco}
Benefícios: ${beneficios}
Diferencial: ${diferencial}

Retorne APENAS um array JSON válido com exatamente 5 objetos, sem texto adicional:
[
  {
    "titulo": "título impactante (máx 8 palavras)",
    "subtitulo": "subtítulo persuasivo (máx 15 palavras)",
    "beneficios": ["benefício 1", "benefício 2", "benefício 3"],
    "cta": "chamada para ação (máx 4 palavras)"
  }
]`;

      try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openaiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.9,
            max_tokens: 1500,
          }),
        });

        if (openaiRes.ok) {
          const openaiData = await openaiRes.json();
          const content = openaiData.choices[0]?.message?.content ?? "";
          const jsonMatch = content.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            copies = JSON.parse(jsonMatch[0]);
          }
        }
      } catch (_e) {
        copies = [];
      }
    }

    if (!copies || copies.length < 5) {
      copies = MOCK_COPIES.map((c, i) => ({
        titulo: i === 0 ? `${produto} - Oferta Especial!` : c.titulo,
        subtitulo: i === 0 ? `Por apenas R$ ${preco}` : c.subtitulo,
        beneficios: beneficios ? beneficios.split(",").slice(0, 3).map((b: string) => b.trim()).filter(Boolean).concat(c.beneficios).slice(0, 3) : c.beneficios,
        cta: c.cta,
      }));
    }

    await supabase
      .from("profiles")
      .update({ creditos: profile.creditos - 1 })
      .eq("id", user.id);

    await supabase.from("credit_transactions").insert({
      user_id: user.id,
      tipo: "debit",
      quantidade: -1,
      descricao: `Geração de banners: ${produto}`,
    });

    return new Response(JSON.stringify({ copies, produto, preco, tipo }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
