import { BannerCopy } from '../../types';

interface Props {
  copy: BannerCopy;
  produto: string;
  preco: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function BannerTemplate1({ copy, produto, preco, containerRef }: Props) {
  return (
    <div
      ref={containerRef}
      style={{
        width: 390,
        height: 693,
        background: 'linear-gradient(160deg, #0f172a 0%, #0c4a6e 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
      {/* Background circles */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 280, height: 280,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 40, left: -60, width: 200, height: 200,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
      }} />

      {/* Top tag */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.4)',
        borderRadius: 999, padding: '6px 16px', alignSelf: 'flex-start', marginBottom: 28,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4' }} />
        <span style={{ color: '#67e8f9', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {produto}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        color: '#ffffff', fontSize: 38, fontWeight: 800, lineHeight: 1.1,
        marginBottom: 16, flex: '0 0 auto',
      }}>
        {copy.titulo}
      </h1>

      {/* Subtitle */}
      <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.5, marginBottom: 32 }}>
        {copy.subtitulo}
      </p>

      {/* Benefits */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {copy.beneficios.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>✓</span>
            </div>
            <span style={{ color: '#cbd5e1', fontSize: 15 }}>{b}</span>
          </div>
        ))}
      </div>

      {/* Price + CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ color: '#64748b', fontSize: 14 }}>Por apenas</span>
          <span style={{ color: '#06b6d4', fontSize: 36, fontWeight: 900 }}>R$ {preco}</span>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
          borderRadius: 16, padding: '18px 0', textAlign: 'center',
          boxShadow: '0 8px 32px rgba(6,182,212,0.35)',
        }}>
          <span style={{ color: 'white', fontSize: 18, fontWeight: 800, letterSpacing: '0.03em' }}>
            {copy.cta.toUpperCase()} →
          </span>
        </div>
      </div>
    </div>
  );
}
