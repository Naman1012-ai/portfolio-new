import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-canvas text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white">
      <Header />
      <main className="flex-1 w-full max-w-full min-w-0">
        {children}
      </main>
      <Footer />
    </div>
  )
}
