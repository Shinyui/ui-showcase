import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ComponentsShowcase } from '@/pages/ComponentsShowcase'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ComponentsShowcase />
      </main>
      <Footer />
    </div>
  )
}

export default App
