import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import WorkSection from './components/sections/WorkSection'
import AboutSection from './components/sections/AboutSection'
import LensSection from './components/sections/LensSection'

function App() {
  return (
    <div className="relative min-h-screen bg-[var(--color-primary)] text-[var(--color-ink)]">
      <Navbar />

      {/* Main content with rounded bottom that reveals footer behind */}
      <div className="relative z-10 mb-[470px] min-[810px]:mb-[440px] min-[1200px]:mb-[430px]">
        <main className="overflow-x-hidden rounded-b-[40px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          <HeroSection />
          <WorkSection />
          <AboutSection />
          <LensSection />
        </main>
      </div>

      {/* Footer sits fixed behind the main content */}
      <div className="fixed inset-x-0 bottom-0 z-0 h-[470px] min-[810px]:h-[440px] min-[1200px]:h-[430px]">
        <Footer />
      </div>
    </div>
  )
}

export default App
