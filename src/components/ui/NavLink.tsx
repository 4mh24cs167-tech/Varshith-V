import type { ReactNode, MouseEventHandler } from "react";
import { cn } from "../../lib/cn";

type NavLinkProps = {
  href: string;
  variant?: "nav" | "menu";
  active?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function NavLink({
  href,
  variant = "nav",
  active = false,
  className,
  children,
  onClick,
}: NavLinkProps) {
  const classes =
    variant === "nav" ? "nav-link" : "nav-link menu-link";

  return (
    <a
      href={href}
      className={cn(classes, active && "is-active", className)}
      data-active={active || undefined}
      onClick={onClick}
    >
      {children}
    </a>
  );
}