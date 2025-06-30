// src/components/ui/textarea.tsx
import * as React from "react"

import { cn } from "@/lib/utils"

// Use React.forwardRef to properly receive and forward the ref
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => { // 'ref' is now accessible here
    return (
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref} // Forward the ref to the actual HTML textarea element
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea" // Add a display name for better debugging

export { Textarea }