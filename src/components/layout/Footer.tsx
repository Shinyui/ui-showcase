export function Footer() {
  return (
    <footer className="border-t border-border-default bg-surface">
      <div className="container mx-auto py-8 max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-text-muted">
            UI Theme Showcase — A design system showcase built with React, Tailwind CSS v4,
            and shadcn/ui.
          </p>
          <p className="text-sm text-text-muted">
            © 2025 UI Theme Showcase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
