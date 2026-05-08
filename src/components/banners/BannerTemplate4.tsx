import { BannerCopy } from '../../types';

interface Props {
  copy: BannerCopy;
  produto: string;
  preco: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function BannerTemplate4({ copy, produto, preco, containerRef }: Props) {
  return (
    <div
      ref={containerRef}
      style={{
        width: 390,
        height: 693,
        background: '#0c0a09',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: 36,
        boxSizing: 'border-box',
      }}
    >
      {/* Gold accent top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 180, height: 180,
        background: 'radial-gradient(circle at top right, rgba(251,191,36,0.12) 0%, transparent 70%)',
      }} />

      {/* Corner gold line */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 80, height: 4,
        background: 'linear-gradient(90deg, transparent, #f59e0b)',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 4, height: 80,
        background: 'linear-gradient(180deg, #f59e0b, transparent)',
      }} />

      {/* Logo mark */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 36,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#1c1917', fontSize: 16, fontWeight: 900 }}>★</span>
        </div>
        <span style={{ color: '#d6d3d1', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em' }}>
          {produto.toUpperCase()}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        color: '#fafaf9', fontSize: 36, fontWeight: 900,
        lineHeight: 1.1, marginBottom: 16,
      }}>
        {copy.titulo}
      </h1>

      {/* Gold divider */}
      <div style={{
        width: '100%', height: 1,
        background: 'linear-gradient(90deg, #f59e0b, transparent)',
        marginBottom: 20,
      }} />

      {/* Subtitle */}
      <p style={{ color: '#a8a29e', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
        {copy.subtitulo}
      </p>

      {/* Benefits */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
        {copy.beneficios.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ color: '#f59e0b', fontSize: 14, flexShrink: 0, fontWeight: 700 }}>◆</span>
            <span style={{ color: '#d6d3d1', fontSize: 14 }}>{b}</span>
          </div>
        ))}
      </div>

      {/* Price + CTA */}
      <div style={{
        border: '1px solid rgba(245,158,11,0.3)',
        borderRadius: 20, overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 24px',
          background: 'rgba(245,158,11,0.06)',
          display: 'flex', alignItems: 'baseline', gap: 8,
        }}>
          <span style={{ color: '#78716c', fontSize: 14 }}>R$</span>
          <span style={{ color: '#f59e0b', fontSize: 40, fontWeight: 900 }}>{preco}</span>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          padding: '18px 24px', textAlign: 'center',
        }}>
          <span style={{ color: '#1c1917', fontSize: 16, fontWeight: 900, letterSpacing: '0.04em' }}>
            {copy.cta.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
