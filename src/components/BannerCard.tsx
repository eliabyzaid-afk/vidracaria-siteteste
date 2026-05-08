import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { BannerCopy } from '../types';
import BannerTemplate1 from './banners/BannerTemplate1';
import BannerTemplate2 from './banners/BannerTemplate2';
import BannerTemplate3 from './banners/BannerTemplate3';
import BannerTemplate4 from './banners/BannerTemplate4';
import BannerTemplate5 from './banners/BannerTemplate5';
import { Download, RefreshCw, Save, Check } from 'lucide-react';

const templates = [BannerTemplate1, BannerTemplate2, BannerTemplate3, BannerTemplate4, BannerTemplate5];
const templateLabels = ['Neon Tech', 'Dark Fire', 'Clean Pro', 'Luxury Gold', 'Nature Green'];

interface Props {
  copy: BannerCopy;
  index: number;
  produto: string;
  preco: string;
  onSave?: (dataUrl: string) => void;
  onRegenerate?: () => void;
  saved?: boolean;
}

export default function BannerCard({ copy, index, produto, preco, onSave, onRegenerate, saved }: Props) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedLocal, setSavedLocal] = useState(saved ?? false);

  const Template = templates[index % templates.length];
  const label = templateLabels[index % templateLabels.length];

  async function captureCanvas(): Promise<HTMLCanvasElement | null> {
    if (!bannerRef.current) return null;
    return html2canvas(bannerRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `banner-${produto.replace(/\s+/g, '-').toLowerCase()}-v${index + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  async function handleSave() {
    if (savedLocal || !onSave) return;
    setSaving(true);
    try {
      const canvas = await captureCanvas();
      if (canvas) {
        onSave(canvas.toDataURL('image/png'));
        setSavedLocal(true);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-xs font-medium">Versao {index + 1} — {label}</span>
      </div>

      {/* Banner preview */}
      <div className="relative group">
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/40" style={{ aspectRatio: '9/16', width: '100%' }}>
          <div
            style={{
              transformOrigin: 'top left',
              width: 390,
              height: 693,
              transform: 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                paddingBottom: '177.78%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}>
                <ScaledBanner>
                  <Template ref={bannerRef as React.RefObject<HTMLDivElement>} copy={copy} produto={produto} preco={preco} containerRef={bannerRef as React.RefObject<HTMLDivElement>} />
                </ScaledBanner>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all border border-slate-700 disabled:opacity-50"
        >
          {downloading ? (
            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          Baixar
        </button>

        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regerar
          </button>
        )}

        {onSave && (
          <button
            onClick={handleSave}
            disabled={savedLocal || saving}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all border ${
              savedLocal
                ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                : 'bg-slate-800 hover:bg-cyan-950 border-slate-700 hover:border-cyan-800 text-slate-300 hover:text-cyan-300'
            } disabled:opacity-50`}
          >
            {saving ? (
              <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : savedLocal ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {savedLocal ? 'Salvo' : 'Salvar'}
          </button>
        )}
      </div>
    </div>
  );
}

// Scales the 390x693 banner to fit its container responsively
function ScaledBanner({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: 390,
        height: 693,
        transformOrigin: 'top left',
        transform: 'scale(var(--banner-scale, 1))',
      }}
        ref={(el) => {
          if (el) {
            const parent = el.parentElement;
            if (parent) {
              const parentWidth = parent.offsetWidth;
              const scale = parentWidth / 390;
              el.style.setProperty('--banner-scale', String(scale));
              el.style.transform = `scale(${scale})`;
            }
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
