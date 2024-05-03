import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <label className={cn("flex items-center", className)}>
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "peer h-4 w-4 opacity-0 absolute cursor-pointer",
          className
        )}
        {...props}
      />
      <div className="relative flex-shrink-0 h-4 w-4 border border-primary rounded-sm">
        <div className="absolute inset-0 flex items-center justify-center">
          <Check className="h-3 w-3 text-primary" />
        </div>
      </div>
    </label>
  )
);

export { Checkbox };
