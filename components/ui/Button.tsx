import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const baseStyles =
  "group relative inline-flex items-center justify-center gap-2 rounded-sm px-6 py-[15px] text-[12px] font-semibold uppercase leading-none tracking-[0.18em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-steel text-obsidian hover:bg-steel-soft hover:-translate-y-[1px] active:translate-y-0",
  secondary:
    "border border-line-2 text-ink hover:border-steel hover:text-steel hover:-translate-y-[1px] active:translate-y-0",
  ghost:
    "text-ink-dim hover:text-steel",
};

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AnchorProps = BaseProps & { href: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className" | "children"
>;

type ButtonElProps = BaseProps & { href?: undefined } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
>;

export function Button(props: AnchorProps | ButtonElProps) {
  const variant: Variant = props.variant ?? "primary";
  const classes = cn(baseStyles, variantStyles[variant], props.className);

  if ("href" in props && props.href) {
    const { variant: _v, className: _c, children, href, ...rest } = props;
    void _v;
    void _c;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
        <span
          aria-hidden="true"
          className="translate-x-0 transition-transform duration-200 group-hover:translate-x-[3px]"
        >
          →
        </span>
      </a>
    );
  }

  const { variant: _v, className: _c, children, ...rest } = props as ButtonElProps;
  void _v;
  void _c;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
      <span
        aria-hidden="true"
        className="translate-x-0 transition-transform duration-200 group-hover:translate-x-[3px]"
      >
        →
      </span>
    </button>
  );
}
