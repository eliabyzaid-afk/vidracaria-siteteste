import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PLANS = {
  starter: { creditos: 10, valor: 10.00, label: "Starter" },
  popular: { creditos: 50, valor: 29.00, label: "Popular" },
  pro: { creditos: 100, valor: 49.00, label: "Pro" },
};

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

    const { plano } = await req.json();
    const plan = PLANS[plano as keyof typeof PLANS];

    if (!plan) {
      return new Response(JSON.stringify({ error: "Plano inválido" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const paymentId = `INF-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const { error: subError } = await supabase.from("subscriptions").insert({
      user_id: user.id,
      status: "pendente",
      plano: plano,
      creditos_comprados: plan.creditos,
      valor_pago: plan.valor,
      payment_id: paymentId,
    });

    if (subError) {
      return new Response(JSON.stringify({ error: subError.message }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Simulate InfinitePay checkout URL (mock)
    const checkoutUrl = `https://checkout.infinitepay.io/mock/${paymentId}`;

    return new Response(JSON.stringify({
      payment_id: paymentId,
      checkout_url: checkoutUrl,
      plano: plan.label,
      creditos: plan.creditos,
      valor: plan.valor,
      // For demo purposes - simulate immediate approval
      demo_mode: true,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
