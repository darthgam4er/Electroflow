
'use client';

import Link from 'next/link';
import { Search, Heart, User, ShoppingCart, Menu, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';
import { CategoriesMenu } from './CategoriesMenu';

const navLinks = [
    { href: '#', label: 'Back to school', special: true, highlighted: false },
    { href: '#', label: 'Offres Web', special: true, highlighted: true },
    { href: '#', label: 'Promos' },
    { href: '#', label: 'Nos marques' },
    { href: '#', label: 'Nos services' },
];

export default function Header() {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isScrolled ? 'shadow-lg' : 'shadow-sm')}>
      {/* Top Bar */}
      <div className={cn("transition-all duration-300", isScrolled ? "bg-card text-card-foreground" : "bg-primary text-primary-foreground")}>
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-6">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm bg-card text-card-foreground p-0">
                 <div className="flex h-full flex-col">
                    <div className="p-6">
                      <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8" onClick={() => setMobileMenuOpen(false)}>
                           <svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="100" cy="100" r="100" fill="#E30613"/>
                              <path d="M100 25C113.807 25 125 36.1929 125 50V62.5C125 76.3071 113.807 87.5 100 87.5C86.1929 87.5 75 76.3071 75 62.5V50C75 36.1929 86.1929 25 100 25Z" fill="white"/>
                              <path d="M100 112.5C113.807 112.5 125 123.693 125 137.5V150C125 163.807 113.807 175 100 175C86.1929 175 75 163.807 75 150V137.5C75 123.693 86.1929 112.5 100 112.5Z" fill="white"/>
                              <rect x="37.5" y="87.5" width="125" height="25" fill="white"/>
                          </svg>
                          <span className="text-primary">Electroplanet</span>
                      </Link>
                    </div>
                    <div className="px-6 mb-4">
                        <CategoriesMenu>
                            <Button variant="outline" className="w-full justify-start text-base font-bold gap-2">
                                <Menu className="h-5 w-5"/>
                                Toutes les catégories
                            </Button>
                        </CategoriesMenu>
                    </div>
                    <nav className="flex flex-col gap-1 px-6">
                        {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                            'text-lg font-medium transition-colors hover:text-primary p-2 rounded-md',
                            link.special && 'font-bold',
                            link.highlighted ? 'text-primary' : 'text-foreground'
                            )}
                        >
                            {link.label}
                        </Link>
                        ))}
                    </nav>
                     <div className="mt-auto p-6 border-t">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <MapPin className="h-5 w-5" />
                            Nos magasins
                        </Button>
                     </div>
                 </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block">
                  <circle cx="100" cy="100" r="100" fill={isScrolled ? "#E30613" : "white"}/>
                  <path d="M100 25C113.807 25 125 36.1929 125 50V62.5C125 76.3071 113.807 87.5 100 87.5C86.1929 87.5 75 76.3071 75 62.5V50C75 36.1929 86.1929 25 100 25Z" fill={isScrolled ? "white" : "#E30613"}/>
                  <path d="M100 112.5C113.807 112.5 125 123.693 125 137.5V150C125 163.807 113.807 175 100 175C86.1929 175 75 163.807 75 150V137.5C75 123.693 86.1929 112.5 100 112.5Z" fill={isScrolled ? "white" : "#E30613"}/>
                  <rect x="37.5" y="87.5" width="125" height="25" fill={isScrolled ? "white" : "#E30613"}/>
              </svg>
              <span className={cn(isScrolled ? 'text-primary' : 'text-primary-foreground')}>Electroplanet</span>
            </Link>
            {isScrolled && (
              <CategoriesMenu>
                <Button variant="ghost" className="hidden lg:flex text-base font-bold gap-2 text-primary">
                    <Menu className="h-5 w-5"/>
                    Catégories
                </Button>
              </CategoriesMenu>
            )}
          </div>

          <div className="hidden lg:flex flex-grow max-w-xl mx-8">
              <div className="relative w-full">
                  <Input
                      type="search"
                      placeholder="Tapez ici un produit ou une catégorie de produit"
                      className={cn("w-full bg-white text-foreground pl-4 pr-12 h-11", isScrolled && "border-primary focus-visible:ring-primary")}
                  />
                  <Button size="icon" className={cn("absolute right-0 top-0 h-11 w-11", isScrolled ? "bg-primary hover:bg-primary/90" : "bg-background text-primary hover:bg-background/90" )}>
                    <Search className="h-5 w-5" />
                  </Button>
              </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className={cn("rounded-full h-10 w-10 sm:h-11 sm:w-11", isScrolled && "border border-muted-foreground")}>
                  <User className={cn("h-5 w-5 sm:h-6 sm:w-6", isScrolled && "text-muted-foreground")} />
                  <span className="sr-only">Compte</span>
              </Button>
              <Button variant="ghost" size="icon" className={cn("rounded-full h-10 w-10 sm:h-11 sm:w-11", isScrolled && "border border-muted-foreground")}>
                  <Heart className={cn("h-5 w-5 sm:h-6 sm:w-6", isScrolled && "text-muted-foreground")} />
                  <span className="sr-only">Favoris</span>
              </Button>
              <Button asChild variant="ghost" size="icon" className={cn("rounded-full h-10 w-10 sm:h-11 sm:w-11", isScrolled && "border border-muted-foreground")}>
                <Link href="/cart" className="relative">
                    <ShoppingCart className={cn("h-5 w-5 sm:h-6 sm:w-6", isScrolled && "text-muted-foreground")} />
                    <span className="sr-only">Panier</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {cartCount}
                        </span>
                      )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

       {/* Bottom Bar */}
      <div className={cn("bg-card text-card-foreground shadow-md transition-all duration-300", isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-14')}>
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
            <nav className="flex items-center gap-6 text-sm font-semibold">
                <CategoriesMenu>
                    <Button variant="ghost" className="text-base font-bold gap-2 hidden lg:flex">
                        <Menu className="h-5 w-5"/>
                        Catégories
                    </Button>
                </CategoriesMenu>
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                         <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                'transition-colors hover:text-primary',
                                {
                                    'bg-accent text-accent-foreground px-3 py-1 rounded-full': link.special && !link.highlighted,
                                    'text-primary border-2 border-primary px-3 py-1 rounded-full': link.highlighted,
                                }
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
            <div className="hidden md:flex">
                 <Button variant="ghost" className="gap-2">
                    <MapPin className="h-5 w-5" />
                    Nos magasins
                </Button>
            </div>
        </div>
      </div>
       <div className="lg:hidden p-2 bg-card border-b">
         <div className="relative w-full">
             <Input
                 type="search"
                 placeholder="Rechercher un produit..."
                 className={cn("w-full bg-muted text-foreground pl-4 pr-12 h-11", isScrolled && "border-primary focus-visible:ring-primary")}
             />
             <Button size="icon" className="absolute right-0 top-0 h-11 w-11 bg-transparent text-muted-foreground hover:bg-transparent">
               <Search className="h-5 w-5" />
             </Button>
         </div>
       </div>
    </header>
  );
}

    