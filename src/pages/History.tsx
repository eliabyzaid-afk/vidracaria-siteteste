import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Banner, BannerCopy } from '../types';
import { History as HistoryIcon, Download, Image, Calendar, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import BannerTemplate1 from '../components/banners/BannerTemplate1';
import BannerTemplate2 from '../components/banners/BannerTemplate2';
import BannerTemplate3 from '../components/banners/BannerTemplate3';
import BannerTemplate4 from '../components/banners/BannerTemplate4';
import BannerTemplate5 from '../components/banners/BannerTemplate5';

const templates = [BannerTemplate1, BannerTemplate2, BannerTemplate3, BannerTemplate4, BannerTemplate5];

function DownloadableBanner({ copy, templateIndex, produto, preco, onDownload }: {
  copy: BannerCopy;
  templateIndex: number;
  produto: string;
  preco: string;
  onDownload: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Template = templates[templateIndex % templates.length];

  async function download() {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, backgroundColor: null, logging: false });
    const link = document.createElement('a');
    link.download = `banner-${produto.replace(/\s+/g, '-').toLowerCase()}-v${templateIndex + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onDownload();
  }

  return (
    <div className="relative">
      <div style={{ position: 'absolute', left: -9999, top: -9999, pointerEvents: 'none' }}>
        <Template containerRef={ref} copy={copy} produto={produto} preco={preco} />
      </div>
      <button
        onClick={download}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-xs font-medium transition-all"
      >
        <Download className="w-3 h-3" />
        Baixar
      </button>
    </div>
  );
}

export default function History() {
  const { profile } = useAuth();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    supabase
      .from('banners')
      .select('*')
      .eq('user_id', profile.id)
      .order('data_criacao', { ascending: false })
      .then(({ data }) => {
        if (data) setBanners(data as Banner[]);
        setLoading(false);
      });
  }, [profile]);

  async function handleDelete(id: string) {
    setDeleting(id);
    await supabase.from('banners').delete().eq('id', id);
    setBanners((prev) => prev.filter((b) => b.id !== id));
    setDeleting(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
            <HistoryIcon className="w-5 h-5 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Historico</h1>
        </div>
        <p className="text-slate-400">Todos os banners gerados pela sua conta.</p>
      </div>

      {banners.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-16 text-center">
          <Image className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">Nenhum banner salvo ainda.</p>
          <p className="text-slate-600 text-sm mt-1">Gere banners na pagina "Criar Banner" e salve-os aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {banners.map((banner) => {
            const copies: BannerCopy[] = banner.dados?.copies ?? [];
            return (
              <div key={banner.id} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-950 to-blue-950 border border-cyan-900/40 flex items-center justify-center flex-shrink-0">
                      <Image className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold truncate">{banner.produto}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-slate-500 text-xs">R$ {banner.preco}</span>
                        <span className="text-slate-700 text-xs">•</span>
                        <span className="text-slate-500 text-xs capitalize">{banner.tipo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(banner.data_criacao).toLocaleDateString('pt-BR')}
                    </div>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      disabled={deleting === banner.id}
                      className="p-2 rounded-lg hover:bg-red-950/30 text-slate-600 hover:text-red-400 transition-colors"
                    >
                      {deleting === banner.id ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {copies.length > 0 && (
                  <div className="p-5">
                    <p className="text-slate-500 text-xs mb-3">{copies.length} variacao{copies.length !== 1 ? 'oes' : ''} gerada{copies.length !== 1 ? 's' : ''}</p>
                    <div className="flex gap-3 flex-wrap">
                      {copies.map((copy, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700">
                          <span className="text-slate-400 text-xs">Versao {i + 1}</span>
                          <DownloadableBanner
                            copy={copy}
                            templateIndex={i}
                            produto={banner.produto}
                            preco={banner.preco}
                            onDownload={() => {}}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
