'use client';

import Link from 'next/link';
import { Search, Heart, User, ShoppingCart, Menu, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '#', label: 'Back to school', special: true },
    { href: '#', label: 'Offres Web', special: true, highlighted: true },
    { href: '#', label: 'Promos' },
    { href: '#', label: 'Nos marques' },
    { href: '#', label: 'Nos services' },
];

export default function Header() {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-sm text-primary-foreground">
      {/* Top Bar */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
             <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="100" fill="white"/>
                <path d="M100 25C113.807 25 125 36.1929 125 50V62.5C125 76.3071 113.807 87.5 100 87.5C86.1929 87.5 75 76.3071 75 62.5V50C75 36.1929 86.1929 25 100 25Z" fill="#E30613"/>
                <path d="M100 112.5C113.807 112.5 125 123.693 125 137.5V150C125 163.807 113.807 175 100 175C86.1929 175 75 163.807 75 150V137.5C75 123.693 86.1929 112.5 100 112.5Z" fill="#E30613"/>
                <rect x="37.5" y="87.5" width="125" height="25" fill="#E30613"/>
            </svg>
            <span>Electroplanet</span>
          </Link>
        </div>

        <div className="hidden lg:flex flex-grow max-w-xl mx-8">
            <div className="relative w-full">
                <Input
                    type="search"
                    placeholder="Tapez ici un produit ou une catégorie de produit"
                    className="w-full bg-white text-foreground pl-4 pr-10"
                />
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
            </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <Link href="#" className="flex flex-col items-center gap-1 text-xs">
                <User />
                <span>Compte</span>
            </Link>
             <Link href="#" className="flex flex-col items-center gap-1 text-xs">
                <Heart />
                <span>Favoris</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center gap-1 text-xs relative">
                <ShoppingCart />
                <span>Panier</span>
                 {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                      {cartCount}
                    </span>
                  )}
            </Link>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm bg-card text-card-foreground">
               <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setMobileMenuOpen(false)}>
                         <svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="100" fill="#E30613"/>
                            <path d="M100 25C113.807 25 125 36.1929 125 50V62.5C125 76.3071 113.807 87.5 100 87.5C86.1929 87.5 75 76.3071 75 62.5V50C75 36.1929 86.1929 25 100 25Z" fill="white"/>
                            <path d="M100 112.5C113.807 112.5 125 123.693 125 137.5V150C125 163.807 113.807 175 100 175C86.1929 175 75 163.807 75 150V137.5C75 123.693 86.1929 112.5 100 112.5Z" fill="white"/>
                            <rect x="37.5" y="87.5" width="125" height="25" fill="white"/>
                        </svg>
                        <span className="text-primary">Electroplanet</span>
                    </Link>
                </div>
                <div className="relative mb-8">
                    <Input type="search" placeholder="Rechercher..." className="pl-10" />
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        link.special && 'font-bold',
                        link.highlighted ? 'text-primary' : 'text-foreground'
                        )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

       {/* Bottom Bar */}
      <div className="bg-card text-card-foreground shadow-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
            <nav className="flex items-center gap-6 text-sm font-semibold">
                <Button variant="ghost" className="text-base font-bold gap-2">
                    <Menu className="h-5 w-5"/>
                    Catégories
                </Button>
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
    </header>
  );
}
