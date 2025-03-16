
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground hover:bg-background/90",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive hover:bg-destructive/10",
        success: 
          "border-green-500/50 bg-green-50 text-green-800 dark:border-green-500 dark:bg-green-900/30 dark:text-green-300 [&>svg]:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/40",
        warning: 
          "border-yellow-500/50 bg-yellow-50 text-yellow-800 dark:border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-300 [&>svg]:text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/40",
        info: 
          "border-blue-500/50 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300 [&>svg]:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
