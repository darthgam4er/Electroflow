import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { WashingMachine, Blend, Fan, HeartPulse, Wind, Tv, AudioLines, Monitor, Smartphone, CookingPot, Gamepad2 } from "lucide-react"

const categories = [
    { name: 'Gros electroménager', href: '/category/appliances', icon: <WashingMachine className="h-6 w-6" /> },
    { name: 'Petit electroménager', href: '/category/small-appliances', icon: <Blend className="h-6 w-6" /> },
    { name: 'Entretien de la maison', href: '/category/home-care', icon: <Fan className="h-6 w-6" /> },
    { name: 'Santé - beauté - bébé', href: '/category/health-beauty', icon: <HeartPulse className="h-6 w-6" /> },
    { name: 'Confort de la maison', href: '/category/home-comfort', icon: <Wind className="h-6 w-6" /> },
    { name: 'Tv - photo - video', href: '/category/electronics', icon: <Tv className="h-6 w-6" /> },
    { name: 'Audio - hifi', href: '/category/audio', icon: <AudioLines className="h-6 w-6" /> },
    { name: 'Informatique', href: '/category/computing', icon: <Monitor className="h-6 w-6" /> },
    { name: 'Smartphone - tablette - gps', href: '/category/mobile', icon: <Smartphone className="h-6 w-6" /> },
    { name: 'Articles cuisines', href: '/category/kitchen', icon: <CookingPot className="h-6 w-6" /> },
    { name: 'Jeux & consoles', href: '/category/gaming', icon: <Gamepad2 className="h-6 w-6" /> },
]

export function CategoriesMenu({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="bottom" align="start" sideOffset={18}>
        <div className="grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex items-center gap-4 p-3 hover:bg-accent transition-colors"
            >
              {category.icon}
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
