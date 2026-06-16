import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Category from './components/sections/Category';
import Problem from './components/sections/Problem';
import Platform from './components/sections/Platform';
import Architecture from './components/sections/Architecture';
import Trends from './components/sections/Trends';
import UseCases from './components/sections/UseCases';
import Matrix from './components/sections/Matrix';
import TrustNetwork from './components/sections/TrustNetwork';
import Vision from './components/sections/Vision';
import SocialProof from './components/sections/SocialProof';
import CTA from './components/sections/CTA';

function App() {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 selection:text-white relative overflow-hidden">
      {/* Global Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      <Navbar />
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <Category />
        <Problem />
        <Platform />
        <Architecture />
        <Trends />
        <UseCases />
        <Matrix />
        <TrustNetwork />
        <Vision />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
