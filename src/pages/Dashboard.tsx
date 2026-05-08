import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Banner } from '../types';
import { Sparkles, TrendingUp, Image, CreditCard, ArrowRight, Clock } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [recentBanners, setRecentBanners] = useState<Banner[]>([]);
  const [totalBanners, setTotalBanners] = useState(0);

  useEffect(() => {
    if (!profile) return;
    supabase
      .from('banners')
      .select('*')
      .eq('user_id', profile.id)
      .order('data_criacao', { ascending: false })
      .limit(4)
      .then(({ data }) => {
        if (data) {
          setRecentBanners(data as Banner[]);
          setTotalBanners(data.length);
        }
      });
    supabase
      .from('banners')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', profile.id)
      .then(({ count }) => { if (count) setTotalBanners(count); });
  }, [profile]);

  const stats = [
    { label: 'Créditos', value: profile?.creditos ?? 0, icon: Sparkles, color: 'cyan', suffix: '' },
    { label: 'Banners Criados', value: totalBanners, icon: Image, color: 'blue', suffix: '' },
    { label: 'Plano Atual', value: profile?.plano ?? 'free', icon: TrendingUp, color: 'emerald', suffix: '' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Ola, {profile?.nome?.split(' ')[0] ?? 'usuario'} 👋
        </h1>
        <p className="text-slate-400 mt-1">Pronto para criar banners de alta conversao?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorMap: Record<string, string> = {
            cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
            blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-400',
            emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
          };
          return (
            <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${colorMap[stat.color]} border p-5`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <Icon className={`w-5 h-5 ${colorMap[stat.color].split(' ').pop()}`} />
              </div>
              <p className="text-2xl font-bold text-white capitalize">{stat.value}{stat.suffix}</p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-800/40 p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl mb-1">Criar novo banner</h2>
          <p className="text-slate-400 text-sm">Gere 5 variações profissionais com IA em segundos.</p>
          {profile?.creditos === 0 && (
            <p className="text-amber-400 text-xs mt-2">Sem creditos. <button onClick={() => navigate('/pricing')} className="underline">Compre mais</button></p>
          )}
        </div>
        <button
          onClick={() => navigate('/create')}
          disabled={profile?.creditos === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4" />
          Gerar Banners
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Credits alert */}
      {profile && profile.creditos <= 2 && profile.creditos > 0 && (
        <div className="rounded-xl bg-amber-950/40 border border-amber-800/40 p-4 mb-8 flex items-center justify-between gap-4">
          <p className="text-amber-300 text-sm">
            Voce tem apenas <strong>{profile.creditos} credito{profile.creditos !== 1 ? 's' : ''}</strong> restante{profile.creditos !== 1 ? 's' : ''}.
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold text-sm hover:bg-amber-400 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Comprar
          </button>
        </div>
      )}

      {/* Recent banners */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg">Banners recentes</h2>
          {recentBanners.length > 0 && (
            <button onClick={() => navigate('/history')} className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1">
              Ver todos <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {recentBanners.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 border-dashed p-12 text-center">
            <Image className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">Nenhum banner criado ainda</p>
            <p className="text-slate-600 text-sm mt-1">Clique em "Gerar Banners" para comecar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentBanners.map((banner) => (
              <div key={banner.id} className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden group cursor-pointer hover:border-slate-700 transition-colors">
                <div className="aspect-[9/16] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                  {banner.imagem_url ? (
                    <img src={banner.imagem_url} alt={banner.produto} className="w-full h-full object-cover" />
                  ) : (
                    <Image className="w-8 h-8 text-slate-600" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate">{banner.produto}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-600" />
                    <p className="text-slate-500 text-xs">
                      {new Date(banner.data_criacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
