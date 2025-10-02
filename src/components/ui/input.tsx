import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type, ...rest } = props;
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bredi-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bredi-bg disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});
Input.displayName = "Input";

export { Input };
