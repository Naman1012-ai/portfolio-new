import { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { Icon } from './Icon'
import { usePerspective } from '@/context'
import { useProjectTransition } from '@/components/projects'
import { siteProfile } from '@/data'
import { useRouter } from '@/router'

export interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

interface CommandAction {
  id: string
  title: string
  subtitle: string
  category: 'Navigation' | 'Perspectives' | 'Actions'
  badge?: string
  shortcut?: string
  perform: () => void
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setPerspective } = usePerspective()
  const { enterProject } = useProjectTransition()
  const { route, navigate } = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const navigateToHash = (hash: string) => {
    onClose()
    if (route !== 'home') {
      navigate('/' + hash)
    } else {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const navigateToProject = (slug: string) => {
    onClose()
    enterProject(slug)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback
    }
    onClose()
  }

  const email =
    siteProfile.socialLinks.find((s) => s.platform === 'email')?.url.replace('mailto:', '') ||
    'namanparjapati2007@gmail.com'
  const github =
    siteProfile.socialLinks.find((s) => s.platform === 'github')?.url ||
    'https://github.com/Naman1012-ai'
  const linkedin =
    siteProfile.socialLinks.find((s) => s.platform === 'linkedin')?.url ||
    'https://www.linkedin.com/in/naman-prajapati-46a942377/'

  const allActions: CommandAction[] = [
    // Navigation
    {
      id: 'nav-convia',
      title: 'Convia — Case Study',
      subtitle: 'Collaborative Workspace Platform & Realtime Sync',
      category: 'Navigation',
      badge: 'Flagship',
      perform: () => navigateToProject('convia'),
    },
    {
      id: 'nav-biolynk',
      title: 'BioLynk — Case Study',
      subtitle: 'Emergency Blood Donor Directory & Matching Network',
      category: 'Navigation',
      badge: 'Live',
      perform: () => navigateToProject('biolynk'),
    },
    {
      id: 'nav-resumetrices',
      title: 'ResumeTrices — Case Study',
      subtitle: 'Deterministic ATS Candidate Parser with JSON Schema validation',
      category: 'Navigation',
      badge: 'AI Systems',
      perform: () => navigateToProject('resumetrices'),
    },
    {
      id: 'nav-docframe',
      title: 'DocFrame — Case Study',
      subtitle: 'Client-Side In-Memory Vector PDF Rendering Engine',
      category: 'Navigation',
      badge: 'Local-First',
      perform: () => navigateToProject('docframe'),
    },
    {
      id: 'nav-nidar',
      title: 'NIDAR / VegaPilot — Robotics Track',
      subtitle: 'RP2040 Dual-Core Microcontroller Firmware & Bench Telemetry',
      category: 'Navigation',
      badge: 'Hardware Track',
      perform: () => navigateToProject('nidar-vegapilot'),
    },
    {
      id: 'nav-judgement',
      title: 'Engineering Judgement & Decision Log',
      subtitle: 'Architecture decisions, alternatives rejected, and trade-offs',
      category: 'Navigation',
      shortcut: 'G J',
      perform: () => navigateToHash('#how-i-build'),
    },
    {
      id: 'nav-projects',
      title: 'Project Universe',
      subtitle: 'Browse all engineering platforms, tools, and research tracks',
      category: 'Navigation',
      shortcut: 'G P',
      perform: () => {
        navigate('/projects')
        onClose()
      },
    },
    {
      id: 'nav-about',
      title: 'About Me — Identity & Evidence Hub',
      subtitle: 'What I build, how I learn, and current AI/software trajectory',
      category: 'Navigation',
      shortcut: 'G A',
      perform: () => navigateToHash('#about'),
    },
    {
      id: 'nav-contact',
      title: 'Get in Touch / Contact',
      subtitle: 'Direct email, LinkedIn, and collaboration inquiries',
      category: 'Navigation',
      shortcut: 'G C',
      perform: () => navigateToHash('#contact'),
    },

    // Perspectives
    {
      id: 'perspective-explore',
      title: 'Switch to Explore Perspective (Default)',
      subtitle: 'Balanced discovery across projects, personal story, and capabilities',
      category: 'Perspectives',
      badge: 'Explore',
      perform: () => {
        setPerspective('explore')
        onClose()
      },
    },
    {
      id: 'perspective-engineering',
      title: 'Switch to Engineering Perspective',
      subtitle: 'Deep focus on architecture, technical decisions, and system constraints',
      category: 'Perspectives',
      badge: 'Engineering',
      perform: () => {
        setPerspective('engineering')
        onClose()
      },
    },
    {
      id: 'perspective-product',
      title: 'Switch to Product Perspective',
      subtitle: 'Focus on product thinking, problem selection, and outcome trajectory',
      category: 'Perspectives',
      badge: 'Product',
      perform: () => {
        setPerspective('product')
        onClose()
      },
    },

    // Developer Actions
    {
      id: 'action-email',
      title: 'Copy Email Address',
      subtitle: email,
      category: 'Actions',
      badge: 'Clipboard',
      perform: () => copyToClipboard(email),
    },
    {
      id: 'action-github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/Naman1012-ai',
      category: 'Actions',
      badge: 'External',
      perform: () => {
        window.open(github, '_blank', 'noopener,noreferrer')
        onClose()
      },
    },
    {
      id: 'action-linkedin',
      title: 'Connect on LinkedIn',
      subtitle: 'linkedin.com/in/naman-prajapati-46a942377',
      category: 'Actions',
      badge: 'External',
      perform: () => {
        window.open(linkedin, '_blank', 'noopener,noreferrer')
        onClose()
      },
    },
  ]

  const query = search.toLowerCase().trim()
  const filteredActions = query
    ? allActions.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.subtitle.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query)
      )
    : allActions

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].perform()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  const handleInputChange = (value: string) => {
    setSearch(value)
    setSelectedIndex(0)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette quick navigation"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-slate-200/90 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.25)] overflow-hidden flex flex-col max-h-[80vh] animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/80">
          <Icon name="terminal" size="sm" className="text-indigo-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type a command or search (e.g. Convia, Engineering, Product)..."
            className="w-full text-sm font-sans bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus:outline-none"
            aria-autocomplete="list"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-200/70 border border-slate-300/80 rounded-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 divide-dashed" role="listbox">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              No matching commands or projects found.
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={action.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => action.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-900 font-display'}`}>
                        {action.title}
                      </span>
                      {action.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded-xs uppercase tracking-wider ${
                            isSelected
                              ? 'bg-indigo-700 text-white border border-indigo-400/40'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[11px] block truncate mt-0.5 ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500'
                      }`}
                    >
                      {action.subtitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {action.shortcut && (
                      <kbd
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-xs ${
                          isSelected
                            ? 'bg-indigo-700 text-white border border-indigo-400/40'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {action.shortcut}
                      </kbd>
                    )}
                    <span className={`text-xs ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      ↵
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-slate-400">Naman Prajapati · Studio</span>
        </div>
      </div>
    </div>
  )
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  if (!isOpen) return null
  return <CommandPaletteDialog onClose={onClose} />
}
