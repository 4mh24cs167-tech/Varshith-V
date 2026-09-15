import type { ReactNode, MouseEventHandler, CSSProperties } from "react";
import { cn } from "../../lib/cn";

const VARIANTS = ["primary", "secondary", "text", "icon"] as const;
const SIZES = ["md", "lg"] as const;

type BaseProps = {
  variant?: (typeof VARIANTS)[number];
  size?: (typeof SIZES)[number];
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLElement>;
  ariaLabel?: string;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonAsLink = BaseProps & {
  href: string;
  disabled?: never;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  style,
  onClick,
  ariaLabel,
  ...rest
}: ButtonProps) {
  const classes = cn("btn", `btn-${variant}`, size === "lg" && "btn--lg", className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a
        href={rest.href}
        className={classes}
        style={style}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        aria-label={ariaLabel}
        target={rest.target}
        rel={rest.rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      className={classes}
      style={style}
      onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
      aria-label={ariaLabel}
      disabled={rest.disabled}
    >
      {children}
    </button>
  );
}