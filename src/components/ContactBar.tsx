import { MessageCircle, Clock } from 'lucide-react';

export default function ContactBar() {
  return (
    <section id="contato-rapido" className="bg-navy-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm text-center sm:text-left whitespace-nowrap">
            <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <span>Seg–Sex 8h–18h &nbsp;|&nbsp; Sáb 8h–12h</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm mx-auto lg:ml-auto lg:mr-0">
            <a
              href="https://wa.me/5511980347789?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto lg:w-[220px] contactbar-button-fixed flex items-center justify-center gap-3 bg-[#13382c] hover:bg-[#0f2f24] border border-black/10 hover:border-black/20 text-white rounded-full px-8 sm:px-6 py-3 sm:py-2.5 transition-all duration-200 group text-sm sm:text-sm font-bold"
              aria-label="WhatsApp Atendimento"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0" />
              <span className="text-sm font-bold">ATENDIMENTO</span>
            </a>

            <a
              href="https://wa.me/5511983093577?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20o%20serviço%20de%20vidraçaria%20e%20orçamentos."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto lg:w-[220px] contactbar-button-fixed flex items-center justify-center gap-3 bg-[#13382c] hover:bg-[#0f2f24] border border-black/10 hover:border-black/20 text-white rounded-full px-8 sm:px-6 py-3 sm:py-2.5 transition-all duration-200 group text-sm sm:text-sm font-bold"
              aria-label="WhatsApp Orçamentos"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0" />
              <span className="text-sm font-bold">ORÇAMENTOS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
