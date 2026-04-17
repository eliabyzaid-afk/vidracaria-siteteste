import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type GalleryItem = {
  title: string;
  subtitle: string;
  kind: 'image' | 'video';
  src: string;
  poster?: string;
};

type GallerySection = {
  title: string;
  description: string;
  items: GalleryItem[];
};

const gallerySections: GallerySection[] = [
  {
    title: 'Esquadrias de Alumínio',
    description:
      'Janelas e portas em alumínio com perfis Linha Suprema / Gold, vedação de alto desempenho, acabamento premium e controle acústico.',
    items: [
      {
        title: 'Janelas de correr premium',
        subtitle: 'Perfis linha Gold com alto isolamento térmico e acústico.',
        kind: 'image',
        src: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
      {
        title: 'Portas de giro em alumínio',
        subtitle: 'Acabamento clean e fechamento preciso com ótimo desempenho estrutural.',
        kind: 'image',
        src: 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
      {
        title: 'Perfil de porta Gold',
        subtitle: 'Ligação perfeita entre salão, varanda e ambiente interno.',
        kind: 'video',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster:
          'https://images.pexels.com/photos/361745/pexels-photo-361745.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
    ],
  },
  {
    title: 'Box até o Teto',
    description:
      'Soluções com vidro temperado do piso ao teto, capacidade de vedação total e design que valoriza qualquer banheiro.',
    items: [
      {
        title: 'Box de canto até o teto',
        subtitle: 'Vedação limpa, drenagem eficiente e visual moderno.',
        kind: 'image',
        src: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
      {
        title: 'Box walk-in com vidro fixo',
        subtitle: 'Fluxo aberto e acabamento linear para banheiros contemporâneos.',
        kind: 'image',
        src: 'https://images.pexels.com/photos/3704747/pexels-photo-3704747.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
      {
        title: 'Instalação com desempenho de vedação',
        subtitle: 'Ferragens inox e perfil rígido para retenção total de água.',
        kind: 'video',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster:
          'https://images.pexels.com/photos/1458477/pexels-photo-1458477.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
    ],
  },
  {
    title: 'Espelhos',
    description:
      'Espelhos com acabamento fino, bordas polidas e opções com bisotê ou iluminação LED para ambientes sofisticados.',
    items: [
      {
        title: 'Espelho bisotê clássico',
        subtitle: 'Acabamento de borda fina e reflexão uniforme.',
        kind: 'image',
        src: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
      {
        title: 'Espelho LED embutido',
        subtitle: 'Luz indireta e design delicado para banheiros e closets.',
        kind: 'image',
        src: 'https://images.pexels.com/photos/2852869/pexels-photo-2852869.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
      {
        title: 'Acabamento fino e corte preciso',
        subtitle: 'Espelhos de alta definição com perfil minimalista.',
        kind: 'video',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster:
          'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
    ],
  },
  {
    title: 'Guarda-corpo',
    description:
      'Guarda-corpos em vidro com fixação discreta, segurança certificada e estética leve para varandas e escadas.',
    items: [
      {
        title: 'Guarda-corpo de vidro laminado',
        subtitle: 'Resistência estrutural e transparência total.',
        kind: 'image',
        src: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
      {
        title: 'Fixação em pinça inox',
        subtitle: 'Detalhes minimalistas com segurança garantida.',
        kind: 'image',
        src: 'https://images.pexels.com/photos/3630804/pexels-photo-3630804.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
      {
        title: 'Projeto técnico de guarda-corpo',
        subtitle: 'Instalação precisa com nivelamento perfeito.',
        kind: 'video',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster:
          'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=1000&q=40',
      },
    ],
  },
];

function MediaCard({ item }: { item: GalleryItem }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!ref.current || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <figure
      ref={ref}
      className="group rounded-3xl overflow-hidden border border-white/10 bg-navy-900/40 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-navy-900/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-950/30">
        {item.kind === 'video' ? (
          shouldLoad ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              controls
              preload="none"
              poster={item.poster}
              playsInline
            >
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={item.poster ?? ''}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )
        ) : shouldLoad ? (
          <img
            src={item.src}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 bg-navy-950/50" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent pointer-events-none" />
        {item.kind === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Play className="w-6 h-6 text-white/90" />
            </div>
          </div>
        )}
      </div>

      <figcaption className="p-6 sm:p-7">
        <div className="text-white text-base font-semibold tracking-wide">{item.title}</div>
        <div className="mt-2 text-sm text-white/60 leading-relaxed">{item.subtitle}</div>
        <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-teal-300/90">
          {item.kind === 'video' ? 'Vídeo' : 'Foto'}
        </div>
      </figcaption>
    </figure>
  );
}

function GallerySectionBlock({ section }: { section: GallerySection }) {
  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{section.title}</h2>
            <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">{section.description}</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            <span className="font-semibold">Galeria técnica</span>
            <span className="text-teal-300">+ fotos e vídeos</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {section.items.map((item) => (
            <MediaCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Galeria() {
  return (
    <div className="bg-navy-950 text-white min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10 bg-navy-900/95 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.15),_transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-teal-400 text-sm font-semibold tracking-[0.25em] uppercase">Galeria</span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Mostramos as melhores soluções em vidro e alumínio.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Cada seção traz fotos e vídeos otimizados de Janelas, Portas, Box até o teto, Espelhos e Guarda-corpo. Navegação leve, carregamento inteligente e conteúdo técnico para projetos de alto padrão.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-navy-950">
        {gallerySections.map((section) => (
          <GallerySectionBlock key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}
