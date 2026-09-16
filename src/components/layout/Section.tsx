import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";

type SectionProps = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  labelledBy?: string;
};

export function Section({
  id,
  className,
  style,
  children,
  labelledBy,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={cn("section", className)}
      style={style}
      aria-labelledby={labelledBy}
    >
      <div className="container">{children}</div>
    </section>
  );
}