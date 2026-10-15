import { Layout } from '@/components'
import { HomePage, NotFoundPage, ProjectDetailPage } from '@/pages'
import { RouterProvider, useRouter } from '@/router'

function AppContent() {
  const { route } = useRouter()

  return (
    <Layout>
      {route === 'project-detail' ? (
        <ProjectDetailPage />
      ) : route === 'not-found' ? (
        <NotFoundPage />
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
