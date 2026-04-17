import { MessageCircle } from 'lucide-react';

const ORCAMENTOS_LINK =
  'https://wa.me/5511980347789?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20de%20vidra%C3%A7aria%20e%20or%C3%A7amentos.';

export default function WhatsAppButton() {
  return (
    <a
      href={ORCAMENTOS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group flex items-center gap-3"
      aria-label="Falar no WhatsApp (Orçamentos)"
    >
      <span className="hidden sm:flex items-center bg-white text-gray-700 text-xs font-semibold px-3 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
        WhatsApp
      </span>
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#22c35e] rounded-full flex items-center justify-center shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-200 hover:scale-110">
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
      </div>
    </a>
  );
}
