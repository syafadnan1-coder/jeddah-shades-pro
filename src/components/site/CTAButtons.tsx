import { Phone, MessageCircle } from "lucide-react";
import { SITE, telHref, waHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CTAButtons({
  message,
  className,
  variant = "default",
}: {
  message?: string;
  className?: string;
  variant?: "default" | "onDark";
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a
        href={waHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white shadow-soft transition hover:brightness-95"
      >
        <MessageCircle className="size-5" aria-hidden />
        اطلب عرض سعر واتساب
      </a>
      <a
        href={telHref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-bold transition",
          variant === "onDark"
            ? "border border-white/40 text-white hover:bg-white/10"
            : "border border-border bg-card text-foreground hover:bg-accent",
        )}
      >
        <Phone className="size-5" aria-hidden />
        اتصل الآن {SITE.phone.replace("966", "0")}
      </a>
    </div>
  );
}
