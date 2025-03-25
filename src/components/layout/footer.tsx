
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-12 mt-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-full bg-solana p-1.5">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
              <span className="font-bold text-xl">SolanaGamers</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Discover the best games and projects on the Solana blockchain.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><FooterLink to="/projects">Games & Projects</FooterLink></li>
              <li><FooterLink to="/tokens">Tokens</FooterLink></li>
              <li><FooterLink to="/analytics">Analytics</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Community</h4>
            <ul className="space-y-2">
              <li><FooterLink href="https://twitter.com" external>Twitter</FooterLink></li>
              <li><FooterLink href="https://discord.com" external>Discord</FooterLink></li>
              <li><FooterLink href="https://telegram.org" external>Telegram</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Ecosystem</h4>
            <ul className="space-y-2">
              <li><FooterLink href="https://solana.com" external>Solana</FooterLink></li>
              <li><FooterLink href="https://magic-eden.io" external>Magic Eden</FooterLink></li>
              <li><FooterLink href="https://jup.ag" external>Jupiter</FooterLink></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} SolanaGamers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
}

function FooterLink({ children, to, href, external }: FooterLinkProps) {
  if (to) {
    return (
      <Link to={to} className="text-muted-foreground hover:text-foreground transition-colors">
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a 
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  
  return <span className="text-muted-foreground">{children}</span>;
}
