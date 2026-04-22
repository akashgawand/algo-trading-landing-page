import * as React from "react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  children?: React.ReactNode;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5",
    destructive: "bg-red-600 text-white hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]",
    outline: "border border-white/10 bg-[#0f1117]/50 text-white hover:bg-white/5 hover:border-white/20",
    secondary: "bg-[#0f1117]/80 text-white hover:bg-[#1a1d27] border border-white/10",
    ghost: "hover:bg-white/5 hover:text-white text-gray-400",
    link: "text-blue-400 underline-offset-4 hover:underline",
  };
  
  const sizeStyles = {
    default: "h-11 px-8 py-3.5",
    sm: "h-9 px-4",
    lg: "h-12 px-10 text-base",
    icon: "h-11 w-11",
  };

  const combinedClassName = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...child.props,
      className: cn(combinedClassName, child.props.className),
    } as any);
  }

  return (
    <button
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
}

const buttonVariants = (props: { variant?: ButtonProps["variant"]; size?: ButtonProps["size"]; className?: string }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5",
    destructive: "bg-red-600 text-white hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]",
    outline: "border border-white/10 bg-[#0f1117]/50 text-white hover:bg-white/5 hover:border-white/20",
    secondary: "bg-[#0f1117]/80 text-white hover:bg-[#1a1d27] border border-white/10",
    ghost: "hover:bg-white/5 hover:text-white text-gray-400",
    link: "text-blue-400 underline-offset-4 hover:underline",
  };
  
  const sizeStyles = {
    default: "h-11 px-8 py-3.5",
    sm: "h-9 px-4",
    lg: "h-12 px-10 text-base",
    icon: "h-11 w-11",
  };

  return cn(
    baseStyles,
    props.variant ? variantStyles[props.variant] : variantStyles.default,
    props.size ? sizeStyles[props.size] : sizeStyles.default,
    props.className
  );
};

export { Button, buttonVariants };