import { Layout } from '@/components'
import { HomePage, ProjectDetailPage } from '@/pages'
import { RouterProvider, useRouter } from '@/router'

function AppContent() {
  const { route } = useRouter()

  return (
    <Layout>
      {route === 'project-detail' || route === 'not-found' ? (
        <ProjectDetailPage />
      ) : (
        <HomePage />
      )}
    </Layout>
  )
}

export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  )
}

export default App
