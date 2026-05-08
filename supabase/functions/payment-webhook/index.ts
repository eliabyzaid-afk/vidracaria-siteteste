import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body = await req.json();
    const { payment_id, status, user_id } = body;

    if (!payment_id || !user_id) {
      return new Response(JSON.stringify({ error: "Dados inválidos" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("payment_id", payment_id)
      .maybeSingle();

    if (subError || !subscription) {
      return new Response(JSON.stringify({ error: "Assinatura não encontrada" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (status === "approved" || status === "paid") {
      await supabase
        .from("subscriptions")
        .update({ status: "ativo", data_inicio: new Date().toISOString() })
        .eq("payment_id", payment_id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("creditos")
        .eq("id", user_id)
        .maybeSingle();

      const currentCredits = profile?.creditos ?? 0;
      await supabase
        .from("profiles")
        .update({ creditos: currentCredits + subscription.creditos_comprados })
        .eq("id", user_id);

      await supabase.from("credit_transactions").insert({
        user_id: user_id,
        tipo: "credit",
        quantidade: subscription.creditos_comprados,
        descricao: `Compra de créditos - Plano ${subscription.plano} (${payment_id})`,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
