import { BannerCopy } from '../../types';

interface Props {
  copy: BannerCopy;
  produto: string;
  preco: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function BannerTemplate2({ copy, produto, preco, containerRef }: Props) {
  return (
    <div
      ref={containerRef}
      style={{
        width: 390,
        height: 693,
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      {/* Top colored bar */}
      <div style={{
        height: 6,
        background: 'linear-gradient(90deg, #f97316, #ef4444, #ec4899)',
      }} />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #7c2d12, #450a0a)',
        padding: '28px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -20, right: -20, width: 120, height: 120,
          borderRadius: '50%', background: 'rgba(249,115,22,0.15)',
        }} />
        <span style={{
          color: '#fb923c', fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 10,
        }}>
          OFERTA ESPECIAL • {produto}
        </span>
        <h1 style={{
          color: '#fff7ed', fontSize: 30, fontWeight: 900, lineHeight: 1.15,
          position: 'relative', zIndex: 1,
        }}>
          {copy.titulo}
        </h1>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p style={{ color: '#a3a3a3', fontSize: 15, lineHeight: 1.6 }}>
          {copy.subtitulo}
        </p>

        {/* Benefits */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {copy.beneficios.map((b, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 16px', borderRadius: 12,
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.15)',
            }}>
              <span style={{ color: '#f97316', fontSize: 18, flexShrink: 0 }}>◆</span>
              <span style={{ color: '#e5e5e5', fontSize: 14 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div>
            <p style={{ color: '#737373', fontSize: 12, marginBottom: 2 }}>Preco especial</p>
            <p style={{ color: '#f97316', fontSize: 32, fontWeight: 900 }}>R$ {preco}</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            borderRadius: 12, padding: '12px 20px', textAlign: 'center',
          }}>
            <span style={{ color: 'white', fontSize: 14, fontWeight: 800 }}>{copy.cta}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        height: 4,
        background: 'linear-gradient(90deg, #ec4899, #f97316)',
      }} />
    </div>
  );
}
