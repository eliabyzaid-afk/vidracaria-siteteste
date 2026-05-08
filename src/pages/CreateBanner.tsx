import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase';
import { BannerCopy, GenerateRequest } from '../types';
import BannerCard from '../components/BannerCard';
import {
  Sparkles, ArrowLeft, AlertCircle, Zap, Package, Tag,
  Star, Lightbulb, ChevronRight
} from 'lucide-react';

const BANNER_TYPES = [
  'Produto em destaque',
  'Promoção / Desconto',
  'Lançamento',
  'Temporada / Sazonal',
  'Serviço / Consultoria',
  'Curso / Infoproduto',
  'Evento',
];

type Step = 'form' | 'generating' | 'results';

export default function CreateBanner() {
  const { profile, session, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('form');

  const [form, setForm] = useState<GenerateRequest>({
    tipo: BANNER_TYPES[0],
    produto: '',
    preco: '',
    beneficios: '',
    diferencial: '',
  });

  const [copies, setCopies] = useState<BannerCopy[]>([]);
  const [error, setError] = useState('');
  const [savedBannerId, setSavedBannerId] = useState<string | null>(null);
  const [savedIndexes, setSavedIndexes] = useState<Set<number>>(new Set());

  function setField(field: keyof GenerateRequest, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleGenerate(e: FormEvent) {
    e.preventDefault();
    if (!profile || !session) return;
    if (profile.creditos < 1) {
      setError('Voce nao tem creditos suficientes. Compre mais creditos para continuar.');
      return;
    }

    setError('');
    setStep('generating');

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-banners`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
          'Apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Erro ao gerar banners');
      }

      setCopies(data.copies ?? []);
      await refreshProfile();
      setStep('results');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro inesperado');
      setStep('form');
    }
  }

  async function handleSaveBanner(dataUrl: string, index: number) {
    if (!profile) return;

    const bannerId = savedBannerId ?? undefined;

    if (!bannerId) {
      const { data } = await supabase.from('banners').insert({
        user_id: profile.id,
        tipo: form.tipo,
        produto: form.produto,
        preco: form.preco,
        dados: { copies, form },
        imagem_url: dataUrl,
      }).select('id').single();

      if (data) {
        setSavedBannerId(data.id);
        setSavedIndexes((prev) => new Set([...prev, index]));
      }
    } else {
      setSavedIndexes((prev) => new Set([...prev, index]));
    }
  }

  async function handleRegenerate() {
    if (!profile || profile.creditos < 1) {
      navigate('/pricing');
      return;
    }
    setStep('form');
    setCopies([]);
    setSavedBannerId(null);
    setSavedIndexes(new Set());
  }

  // GENERATING screen
  if (step === 'generating') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-950 to-blue-950 border border-cyan-800/40 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Gerando banners de alta conversao...</h2>
          <p className="text-slate-400 text-sm">A IA esta criando 5 variacoes personalizadas para {form.produto}.</p>
          <div className="mt-6 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-cyan-500"
                style={{ animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </div>
          <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
        </div>
      </div>
    );
  }

  // RESULTS screen
  if (step === 'results' && copies.length > 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Banners gerados!</h1>
            <p className="text-slate-400 text-sm mt-1">{copies.length} variacoes para "{form.produto}"</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Nova geracao
            </button>
            <button
              onClick={() => navigate('/history')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-all"
            >
              Ver historico
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {copies.map((copy, i) => (
            <BannerCard
              key={i}
              copy={copy}
              index={i}
              produto={form.produto}
              preco={form.preco}
              onSave={(dataUrl) => handleSaveBanner(dataUrl, i)}
              onRegenerate={i === 0 ? handleRegenerate : undefined}
              saved={savedIndexes.has(i)}
            />
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            Creditos restantes: <span className="text-white font-semibold">{profile?.creditos}</span>
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            Comprar mais creditos →
          </button>
        </div>
      </div>
    );
  }

  // FORM screen
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Criar banners com IA</h1>
        <p className="text-slate-400">Preencha os dados do produto e a IA vai gerar 5 banners profissionais.</p>
      </div>

      {/* Credits warning */}
      {profile && profile.creditos === 0 && (
        <div className="mb-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-amber-950/40 border border-amber-800/40">
          <div className="flex items-center gap-2 text-amber-300 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Sem creditos disponíveis.
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold text-sm hover:bg-amber-400 transition-colors whitespace-nowrap"
          >
            Comprar creditos
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-red-950/40 border border-red-800/40 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Banner type */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            <span className="flex items-center gap-2"><Tag className="w-4 h-4 text-cyan-400" /> Tipo de Banner</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BANNER_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setField('tipo', type)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  form.tipo === type
                    ? 'bg-cyan-950/60 border-2 border-cyan-600/60 text-cyan-300'
                    : 'bg-slate-800 border-2 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            <span className="flex items-center gap-2"><Package className="w-4 h-4 text-cyan-400" /> Nome do Produto / Servico</span>
          </label>
          <input
            type="text"
            value={form.produto}
            onChange={(e) => setField('produto', e.target.value)}
            required
            placeholder="Ex: Curso de Marketing Digital, iPhone 15 Pro, Consultoria Financeira..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-600 transition-colors"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-cyan-400" /> Preco (R$)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">R$</span>
            <input
              type="text"
              value={form.preco}
              onChange={(e) => setField('preco', e.target.value)}
              required
              placeholder="297,00"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-600 transition-colors"
            />
          </div>
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-cyan-400" /> Principais Beneficios</span>
          </label>
          <input
            type="text"
            value={form.beneficios}
            onChange={(e) => setField('beneficios', e.target.value)}
            required
            placeholder="Ex: Acesso vitalicio, Suporte 24h, Garantia de 30 dias..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-600 transition-colors"
          />
          <p className="text-slate-600 text-xs mt-1">Separe por vírgulas.</p>
        </div>

        {/* Differentiator */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            <span className="flex items-center gap-2"><Lightbulb className="w-4 h-4 text-cyan-400" /> Diferencial / Por que escolher?</span>
          </label>
          <textarea
            value={form.diferencial}
            onChange={(e) => setField('diferencial', e.target.value)}
            required
            rows={3}
            placeholder="Ex: Unico no mercado com tecnologia exclusiva, 10 anos de experiencia, metodologia comprovada..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-600 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Zap className="w-4 h-4" />
            Custa <span className="text-white font-semibold mx-1">1 credito</span> ({profile?.creditos ?? 0} disponíveis)
          </div>
          <button
            type="submit"
            disabled={!profile || profile.creditos < 1}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            GERAR BANNERS
          </button>
        </div>
      </form>
    </div>
  );
}
