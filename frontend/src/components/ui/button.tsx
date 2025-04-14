import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ShadCN-style variants
export const shadcnVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-base-100 shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-md px-8 has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// DaisyUI-style variants
export const daisyVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
      error: "btn-error",
      warning: "btn-warning",
      success: "btn-success",
      default: "",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
    },
    shape: {
      circle: "btn-circle",
      square: "btn-square",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Props for ShadCN version
type ShadcnButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  library?: "shadcn";
} & VariantProps<typeof shadcnVariants>;

// Props for DaisyUI version
type DaisyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  library: "daisy";
} & VariantProps<typeof daisyVariants>;

// Union of both
type UniversalButtonProps = ShadcnButtonProps | DaisyButtonProps;

const Button = React.forwardRef<HTMLButtonElement, UniversalButtonProps>(
  ({ className, asChild = false, library = "shadcn", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const styles =
      library === "daisy"
        ? daisyVariants({
            ...(props as DaisyButtonProps),
            className,
          })
        : shadcnVariants({
            ...(props as ShadcnButtonProps),
            className,
          });

    return <Comp ref={ref} className={cn(styles)} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
