
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded bg-primary shadow-[0_0_15px_rgba(0,229,255,0.5)] flex items-center justify-center">
          <div className="w-3 h-3 bg-background rounded-sm" />
        </div>
        <span className="text-xl font-bold tracking-wider text-white">VENZIQ</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted">
        <a href="#platform" className="hover:text-white transition-colors">Platform</a>
        <a href="#use-cases" className="hover:text-white transition-colors">Solutions</a>
        <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
        <a href="#company" className="hover:text-white transition-colors">Company</a>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        <button className="px-4 py-2 text-sm font-medium text-white hover:text-primary transition-colors">
          Sign In
        </button>
        <button className="px-5 py-2.5 text-sm font-medium text-background bg-primary hover:bg-primary/90 rounded-md shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all">
          Book Demo
        </button>
      </div>
      
      <button className="md:hidden text-muted hover:text-white">
        <Menu size={24} />
      </button>
    </nav>
  );
}
