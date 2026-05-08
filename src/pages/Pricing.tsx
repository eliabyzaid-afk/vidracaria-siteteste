import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PLANS } from '../types';
import { Check, Zap, CreditCard, AlertCircle } from 'lucide-react';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase';

export default function Pricing() {
  const { profile, session, refreshProfile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleBuy(planId: string, creditos: number) {
    if (!session) return;
    setLoading(planId);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/payment-create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
          'Apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ plano: planId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao criar pagamento');

      // Demo mode: simulate webhook approval immediately
      if (data.demo_mode && data.payment_id) {
        await fetch(`${SUPABASE_URL}/functions/v1/payment-webhook`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Apikey': SUPABASE_ANON_KEY },
          body: JSON.stringify({
            payment_id: data.payment_id,
            status: 'approved',
            user_id: profile?.id,
          }),
        });

        await refreshProfile();
        setSuccess(`${creditos} creditos adicionados com sucesso! Aproveite.`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro inesperado');
    } finally {
      setLoading(null);
    }

    // Simulate DB credit transaction for profile
    await supabase.from('credit_transactions').select('id').eq('user_id', profile?.id ?? '').limit(1);
    await refreshProfile();
  }

  return (
    <div>
      <div className="mb-8 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-900/40 text-cyan-400 text-xs font-semibold mb-4">
          <Zap className="w-3.5 h-3.5" />
          Comprar Creditos
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Escolha seu pacote</h1>
        <p className="text-slate-400">Cada geracao consome 1 credito e gera 5 banners profissionais automaticamente.</p>
      </div>

      {success && (
        <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 max-w-xl mx-auto">
          <Check className="w-5 h-5 flex-shrink-0" />
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-red-950/40 border border-red-800/40 text-red-400 max-w-xl mx-auto">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Current credits */}
      <div className="max-w-xl mx-auto mb-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between">
        <span className="text-slate-400 text-sm">Seus creditos atuais</span>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-white font-bold text-xl">{profile?.creditos ?? 0}</span>
          <span className="text-slate-500 text-sm">creditos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-200 ${
              plan.popular
                ? 'bg-gradient-to-b from-cyan-950/60 to-blue-950/60 border-cyan-700/50 shadow-xl shadow-cyan-900/20'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-b-lg">
                  MAIS POPULAR
                </div>
              </div>
            )}

            <div className={`p-6 ${plan.popular ? 'pt-8' : ''}`}>
              <h3 className="text-white font-bold text-xl mb-1">{plan.label}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-slate-400 text-lg">R$</span>
                <span className="text-white text-4xl font-black">{plan.valor}</span>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold mb-6 ${
                plan.popular ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-300'
              }`}>
                <Zap className="w-3.5 h-3.5" />
                {plan.creditos} creditos
              </div>

              <div className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-cyan-500/20' : 'bg-slate-800'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-cyan-400' : 'text-slate-400'}`} />
                    </div>
                    <span className="text-slate-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <button
                onClick={() => handleBuy(plan.id, plan.creditos)}
                disabled={loading === plan.id}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CreditCard className="w-4 h-4" />
                )}
                {loading === plan.id ? 'Processando...' : `Comprar ${plan.creditos} Creditos`}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-600 text-xs mt-8 max-w-md mx-auto">
        Pagamentos processados com seguranca via InfinitePay. Creditos nao expiram e ficam disponíveis até serem utilizados.
      </p>
    </div>
  );
}
