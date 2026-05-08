import { BannerCopy } from '../../types';

interface Props {
  copy: BannerCopy;
  produto: string;
  preco: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function BannerTemplate3({ copy, produto, preco, containerRef }: Props) {
  return (
    <div
      ref={containerRef}
      style={{
        width: 390,
        height: 693,
        background: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: 36,
        boxSizing: 'border-box',
      }}
    >
      {/* Top accent */}
      <div style={{
        width: 48, height: 5, borderRadius: 3,
        background: 'linear-gradient(90deg, #1e40af, #0284c7)',
        marginBottom: 28,
      }} />

      {/* Product tag */}
      <span style={{
        fontSize: 11, fontWeight: 700, color: '#0284c7',
        textTransform: 'uppercase', letterSpacing: '0.14em',
        display: 'block', marginBottom: 14,
      }}>
        {produto}
      </span>

      {/* Title */}
      <h1 style={{
        color: '#0f172a', fontSize: 34, fontWeight: 900,
        lineHeight: 1.15, marginBottom: 14,
      }}>
        {copy.titulo}
      </h1>

      {/* Divider */}
      <div style={{ height: 1, background: '#e2e8f0', marginBottom: 20 }} />

      {/* Subtitle */}
      <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.65, marginBottom: 28 }}>
        {copy.subtitulo}
      </p>

      {/* Benefits */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {copy.beneficios.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: '#eff6ff', border: '2px solid #bfdbfe',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 2,
            }}>
              <span style={{ color: '#2563eb', fontSize: 11, fontWeight: 700 }}>✓</span>
            </div>
            <span style={{ color: '#334155', fontSize: 14, lineHeight: 1.5 }}>{b}</span>
          </div>
        ))}
      </div>

      {/* Price block */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af, #0284c7)',
        borderRadius: 20, padding: 24,
      }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 }}>Investimento</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 18 }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>R$</span>
          <span style={{ color: '#ffffff', fontSize: 44, fontWeight: 900, lineHeight: 1 }}>{preco}</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.15)', borderRadius: 12,
          padding: '14px 0', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <span style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>{copy.cta} →</span>
        </div>
      </div>
    </div>
  );
}
