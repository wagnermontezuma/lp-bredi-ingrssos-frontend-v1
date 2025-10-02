import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bredi-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-bredi-bg",
  {
    variants: {
      variant: {
        default: "bg-bredi-primary text-white hover:bg-bredi-secondary",
        secondary: "bg-bredi-accent text-bredi-primary hover:bg-bredi-primary hover:text-bredi-accent",
        outline: "border border-bredi-primary bg-transparent text-bredi-primary hover:bg-bredi-primary hover:text-white",
        ghost: "hover:bg-bredi-primary/10 hover:text-bredi-primary",
        link: "text-bredi-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, size, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...rest} />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
