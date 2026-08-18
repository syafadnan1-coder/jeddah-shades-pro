import { Phone, MessageCircle } from "lucide-react";
import { telHref, waHref } from "@/lib/site";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3 print:hidden">
      <a
        href={waHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105"
      >
        <MessageCircle className="size-7" aria-hidden />
      </a>
      <a
        href={telHref}
        aria-label="اتصال هاتفي"
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition hover:scale-105"
      >
        <Phone className="size-6" aria-hidden />
      </a>
    </div>
  );
}
