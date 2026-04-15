import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const baseStyles =
  "inline-flex items-center justify-center rounded-sm px-[22px] py-[14px] text-[14px] font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gold text-[#0b0b0d] hover:bg-gold-soft hover:-translate-y-[1px] active:translate-y-0",
  secondary:
    "border border-white/[0.18] text-ink hover:border-gold hover:-translate-y-[1px] active:translate-y-0",
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
      </a>
    );
  }

  const { variant: _v, className: _c, children, ...rest } = props as ButtonElProps;
  void _v;
  void _c;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
