export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 rounded bg-primary" />
            <span className="text-lg font-bold tracking-wider text-white">VENZIQ</span>
          </div>
          <p className="text-sm text-muted">
            The foundational platform that enables enterprises to deploy AI systems securely, privately, compliantly, and with verifiable trust.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#" className="hover:text-primary transition-colors">AI Security</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">AI Agents</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Identity</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Zero Knowledge</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blockchain Trust</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} Venziq Inc. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
