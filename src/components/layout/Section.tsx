import type { CSSProperties, ReactNode } from "react";
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
  return (
    <section
      id={id}
      className={cn("section", className)}
      style={style}
      aria-labelledby={labelledBy}
    >
      <div className="container">{children}</div>
    </section>
  );
}