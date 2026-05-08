import { BannerCopy } from '../../types';

interface Props {
  copy: BannerCopy;
  produto: string;
  preco: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function BannerTemplate5({ copy, produto, preco, containerRef }: Props) {
  return (
    <div
      ref={containerRef}
      style={{
        width: 390,
        height: 693,
        background: 'linear-gradient(170deg, #14532d 0%, #166534 40%, #052e16 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 220, height: 220,
        borderRadius: '50%', background: 'rgba(134,239,172,0.08)',
      }} />
      <div style={{
        position: 'absolute', bottom: 80, left: -40, width: 160, height: 160,
        borderRadius: '50%', background: 'rgba(74,222,128,0.06)',
      }} />

      {/* Top section */}
      <div style={{ padding: '40px 36px 28px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(134,239,172,0.15)',
          border: '1px solid rgba(134,239,172,0.3)',
          borderRadius: 999, padding: '5px 14px', marginBottom: 20,
        }}>
          <span style={{
            color: '#86efac', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            {produto}
          </span>
        </div>

        <h1 style={{
          color: '#f0fdf4', fontSize: 36, fontWeight: 900,
          lineHeight: 1.1, marginBottom: 14,
        }}>
          {copy.titulo}
        </h1>
        <p style={{ color: '#bbf7d0', fontSize: 15, lineHeight: 1.6 }}>
          {copy.subtitulo}
        </p>
      </div>

      {/* Middle - benefits */}
      <div style={{
        flex: 1, margin: '0 24px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: 20, padding: '20px 24px',
        display: 'flex', flexDirection: 'column', gap: 14,
        border: '1px solid rgba(134,239,172,0.1)',
        position: 'relative', zIndex: 1,
      }}>
        {copy.beneficios.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'rgba(134,239,172,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 700 }}>✓</span>
            </div>
            <span style={{ color: '#dcfce7', fontSize: 14 }}>{b}</span>
          </div>
        ))}
      </div>

      {/* Bottom price + CTA */}
      <div style={{ padding: '24px 24px 36px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <div>
            <span style={{ color: '#86efac', fontSize: 13 }}>Preco promocional</span>
            <p style={{ color: '#f0fdf4', fontSize: 40, fontWeight: 900, lineHeight: 1 }}>
              R$ {preco}
            </p>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          borderRadius: 16, padding: '18px 0', textAlign: 'center',
          boxShadow: '0 8px 24px rgba(22,163,74,0.4)',
          border: '1px solid rgba(134,239,172,0.2)',
        }}>
          <span style={{ color: '#ffffff', fontSize: 18, fontWeight: 800 }}>
            {copy.cta} →
          </span>
        </div>
      </div>
    </div>
  );
}
