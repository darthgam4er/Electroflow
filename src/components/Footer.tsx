import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
             <svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="100" fill="#E30613"/>
                <path d="M100 25C113.807 25 125 36.1929 125 50V62.5C125 76.3071 113.807 87.5 100 87.5C86.1929 87.5 75 76.3071 75 62.5V50C75 36.1929 86.1929 25 100 25Z" fill="white"/>
                <path d="M100 112.5C113.807 112.5 125 123.693 125 137.5V150C125 163.807 113.807 175 100 175C86.1929 175 75 163.807 75 150V137.5C75 123.693 86.1929 112.5 100 112.5Z" fill="white"/>
                <rect x="37.5" y="87.5" width="125" height="25" fill="white"/>
            </svg>
            <span className="text-primary">Electroplanet</span>
          </Link>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Electroplanet. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
