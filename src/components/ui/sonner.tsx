import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = (props: React.ComponentProps<typeof Sonner>) => {
  const { theme = "system" } = useTheme()

  // Ensure theme is one of the allowed values
  const mappedTheme = (["light", "dark", "system"].includes(theme)
    ? theme
    : "system") as "light" | "dark" | "system";

  return (
    <Sonner
      theme={mappedTheme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
