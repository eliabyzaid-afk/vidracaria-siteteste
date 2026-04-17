type GalleryItem = {
  title: string;
  subtitle: string;
  kind: 'image' | 'video';
};

const janelas: GalleryItem[] = [
  { title: 'Venezianas', subtitle: 'Linha Suprema / Linha 25 — placeholder', kind: 'image' },
  { title: 'Janelas de 2 folhas', subtitle: 'Linha Suprema / Linha 25 — placeholder', kind: 'image' },
  { title: 'Janelas de 3 folhas', subtitle: 'Linha Suprema / Linha 25 — placeholder', kind: 'image' },
  { title: 'Maxim-ar', subtitle: 'Linha Suprema / Linha 25 — placeholder', kind: 'video' },
  { title: 'Janelas com bandeira', subtitle: 'Preto e Branco — placeholder', kind: 'image' },
];

const portas: GalleryItem[] = [
  { title: 'Portas de Giro', subtitle: 'Linha Suprema / Linha 25 — placeholder', kind: 'image' },
  { title: 'Portas de Correr', subtitle: 'Linha Suprema / Linha 25 — placeholder', kind: 'video' },
  { title: 'Portas de 3 folhas (sacadas)', subtitle: 'Linha Suprema / Linha 25 — placeholder', kind: 'image' },
];

function MediaCard({ item }: { item: GalleryItem }) {
  return (
    <figure className="group rounded-3xl overflow-hidden border border-white/10 bg-navy-900/40 hover:bg-navy-900/60 transition-colors">
      <div className="relative aspect-[4/3] bg-navy-950/40">
        {item.kind === 'video' ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            controls
            preload="none"
            poster=""
          >
            <source src="" type="video/mp4" />
          </video>
        ) : (
          <img
            src=""
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent opacity-90 pointer-events-none" />
      </div>

      <figcaption className="p-6 sm:p-7">
        <div className="text-white font-semibold tracking-wide">{item.title}</div>
        <div className="mt-1 text-sm text-white/55 leading-relaxed">{item.subtitle}</div>
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-teal-300">
          Substituir mídia
          <span className="text-white/25">•</span>
          <span className="text-white/45">{item.kind === 'video' ? '<video>' : '<img>'}</span>
        </div>
      </figcaption>
    </figure>
  );
}

function GallerySection({
  title,
  items,
}: {
  title: string;
  items: GalleryItem[];
}) {
  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {title}
            <span className="text-teal-400">.</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <MediaCard key={`${title}-${item.title}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Esquadrias() {
  return (
    <div className="bg-navy-950">
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900/40" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-teal-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
            Esquadrias de Alta Performance e Design
            <span className="text-teal-400">.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-3xl leading-relaxed font-light">
            Especialistas em Linha Suprema e Linha 25 para residências de médio e alto padrão em Itapevi. Qualidade e vedação impecável para sua obra.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 bg-teal-500/10 border border-teal-400/25 text-teal-200 px-5 py-3 rounded-2xl">
            <span className="text-sm font-semibold tracking-wide">
              Especialistas em Linha Suprema e Linha 25: Durabilidade e Acabamento Premium
            </span>
          </div>
        </div>
      </section>

      <GallerySection title="Janelas" items={janelas} />
      <GallerySection title="Portas" items={portas} />
    </div>
  );
}

