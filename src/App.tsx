import { CommandPalette, Layout } from '@/components'
import { PerspectiveProvider, usePerspective } from '@/context'
import { ProjectTransitionProvider } from '@/components/projects'
import { HomePage, NotFoundPage, ProjectDetailPage, ProjectsPage } from '@/pages'
import { RouterProvider, useRouter } from '@/router'

function AppContent() {
  const { route } = useRouter()
  const { isCommandOpen, closeCommandPalette } = usePerspective()

  return (
    <Layout>
      {route === 'project-detail' ? (
        <ProjectDetailPage />
      ) : route === 'projects' ? (
        <ProjectsPage />
      ) : route === 'not-found' ? (
        <NotFoundPage />
      ) : (
        <HomePage />
      )}
      <CommandPalette isOpen={isCommandOpen} onClose={closeCommandPalette} />
    </Layout>
  )
}

export function App() {
  return (
    <RouterProvider>
      <PerspectiveProvider>
        <ProjectTransitionProvider>
          <AppContent />
        </ProjectTransitionProvider>
      </PerspectiveProvider>
    </RouterProvider>
  )
}

export default App
