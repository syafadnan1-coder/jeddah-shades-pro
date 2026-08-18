import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const cache = new Map<string, string>();

export function useStorageUrl(value?: string | null) {
  const [url, setUrl] = useState<string | null>(() => {
    if (!value) return null;
    if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
    return cache.get(value) ?? null;
  });

  useEffect(() => {
    if (!value) return setUrl(null);
    if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return setUrl(value);
    if (cache.has(value)) return setUrl(cache.get(value)!);
    const [bucket, ...rest] = value.split("/");
    if (!bucket || rest.length === 0) return;
    let alive = true;
    supabase.storage
      .from(bucket)
      .createSignedUrl(rest.join("/"), 60 * 60)
      .then(({ data }) => {
        if (!alive || !data?.signedUrl) return;
        cache.set(value, data.signedUrl);
        setUrl(data.signedUrl);
      });
    return () => {
      alive = false;
    };
  }, [value]);

  return url;
}

type Props = {
  src?: string | null;
  fallback?: string;
  alt: string;
  className?: string;
  eager?: boolean;
  width?: number;
  height?: number;
};

export function SmartImage({ src, fallback, alt, className, eager, width, height }: Props) {
  const resolved = useStorageUrl(src) ?? fallback ?? null;
  if (!resolved) {
    return <div className={className} aria-hidden style={{ background: "var(--color-muted)" }} />;
  }
  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      width={width}
      height={height}
    />
  );
}
