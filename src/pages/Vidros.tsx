import { useMemo, useState } from 'react';
import { Play, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type MediaKind = 'image' | 'video';

type CatalogItem = {
  title: string;
  subtitle: string;
  category:
    | 'Box'
    | 'Janelas'
    | 'Portas'
    | 'Pias'
    | 'Corrimão'
    | 'Guarda-corpo'
    | 'Espelhos com LED'
    | 'Espelhos com Bisotê';
  kind: MediaKind;
  src: string;
  poster?: string;
};

const PLACEHOLDER_ITEMS: CatalogItem[] = [
  {
    title: 'Box — Transparência Premium',
    subtitle: 'Vidro temperado • ferragens inox • vedação limpa',
    category: 'Box',
    kind: 'image',
    src: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Box — Detalhes e brilho',
    subtitle: 'Acabamento alinhado • sensação de amplitude',
    category: 'Box',
    kind: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Janelas — Luz natural',
    subtitle: 'Transparência com conforto e proteção',
    category: 'Janelas',
    kind: 'image',
    src: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Janelas — Corte e encaixe',
    subtitle: 'Precisão no esquadro • linhas limpas',
    category: 'Janelas',
    kind: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Portas — Integração de ambientes',
    subtitle: 'Segurança + estética • perfil discreto',
    category: 'Portas',
    kind: 'image',
    src: 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Portas — Movimento suave',
    subtitle: 'Trilhos e roldanas • fechamento consistente',
    category: 'Portas',
    kind: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Pias — Sofisticação',
    subtitle: 'Vidro com brilho • presença no ambiente',
    category: 'Pias',
    kind: 'image',
    src: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Pias — Reflexo controlado',
    subtitle: 'Acabamento uniforme • toque clean',
    category: 'Pias',
    kind: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Corrimão — Segurança elegante',
    subtitle: 'Transparência + firmeza • visual moderno',
    category: 'Corrimão',
    kind: 'image',
    src: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Corrimão — Detalhe técnico',
    subtitle: 'Fixação discreta • acabamento consistente',
    category: 'Corrimão',
    kind: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Guarda-corpo — Transparência total',
    subtitle: 'Visão livre • proteção para piscina e escadas',
    category: 'Guarda-corpo',
    kind: 'image',
    src: 'https://images.pexels.com/photos/1262574/pexels-photo-1262574.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Guarda-corpo — Instalação impecável',
    subtitle: 'Alinhamento • vedação • acabamento',
    category: 'Guarda-corpo',
    kind: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.pexels.com/photos/1262574/pexels-photo-1262574.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Espelhos com LED — Luz suave',
    subtitle: 'Realce do ambiente • bordas limpas',
    category: 'Espelhos com LED',
    kind: 'image',
    src: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Espelhos com LED — Demonstração',
    subtitle: 'Iluminação • brilho • acabamento',
    category: 'Espelhos com LED',
    kind: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Espelhos com Bisotê — Sofisticação',
    subtitle: 'Cortes precisos • reflexão elegante',
    category: 'Espelhos com Bisotê',
    kind: 'image',
    src: 'https://images.pexels.com/photos/6492406/pexels-photo-6492406.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
  {
    title: 'Espelhos com Bisotê — Close do bisotê',
    subtitle: 'Brilho no corte • acabamento premium',
    category: 'Espelhos com Bisotê',
    kind: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.pexels.com/photos/6492406/pexels-photo-6492406.jpeg?auto=compress&cs=tinysrgb&w=1200&q=40',
  },
];

function MediaThumbnail({ item, onOpen }: { item: CatalogItem; onOpen: () => void }) {
  const commonClass =
    'absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]';

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full text-left rounded-3xl overflow-hidden border border-white/10 bg-navy-900/35 hover:bg-navy-900/55 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/70"
    >
      <div className="relative aspect-[4/3] bg-navy-950/30">
        {item.kind === 'video' ? (
          <>
            <img
              src={item.poster || ''}
              alt={item.title}
              loading="lazy"
              className={commonClass}
            />
            <div className="absolute inset-0 bg-navy-950/25" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <Play className="w-6 h-6 text-white/90 translate-x-[1px]" />
              </div>
            </div>
          </>
        ) : (
          <img src={item.src} alt={item.title} loading="lazy" className={commonClass} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/15 to-transparent opacity-95 pointer-events-none" />
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-white font-semibold tracking-wide">{item.title}</div>
            <div className="mt-1 text-sm text-white/55 leading-relaxed">{item.subtitle}</div>
          </div>
          <div className="shrink-0 text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-300/90">
            {item.category}
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
          Substituir mídia
          <span className="text-white/25">•</span>
          <span className="text-white/45">{item.kind === 'video' ? 'Vídeo (capa)' : 'Foto'}</span>
        </div>
      </div>
    </button>
  );
}

function MediaModal({
  item,
  onClose,
}: {
  item: CatalogItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 bg-navy-900/60 shadow-2xl">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10">
          <div className="min-w-0">
            <div className="text-white font-semibold truncate">{item.title}</div>
            <div className="text-sm text-white/55 truncate">{item.subtitle}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-white/80" />
          </button>
        </div>

        <div className="bg-navy-950/30">
          {item.kind === 'video' ? (
            <video
              className="w-full aspect-video bg-black"
              controls
              preload="none"
              poster={item.poster}
              playsInline
            >
              <source src={item.src} />
            </video>
          ) : (
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="w-full max-h-[75vh] object-contain bg-black/10"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Vidros() {
  const items = useMemo(() => PLACEHOLDER_ITEMS, []);
  const [active, setActive] = useState<CatalogItem | null>(null);

  return (
    <div className="bg-navy-950">
      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900/40" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-teal-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                Área de Vidros
                <span className="text-teal-400">.</span>
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-white/70 max-w-3xl leading-relaxed font-light">
                Catálogo com foco total em brilho, acabamento e transparência. Conteúdo leve e carregamento instantâneo para Itapevi e região.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-teal-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {items.map((item) => (
              <MediaThumbnail key={`${item.category}-${item.title}`} item={item} onOpen={() => setActive(item)} />
            ))}
          </div>
        </div>
      </section>

      {active ? <MediaModal item={active} onClose={() => setActive(null)} /> : null}
    </div>
  );
}

