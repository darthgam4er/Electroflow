
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Brush, LayoutTemplate, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Brush },
    { href: '/admin/homepage', label: 'Homepage', icon: LayoutTemplate },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
               <svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="100" fill="white"/>
                  <path d="M100 25C113.807 25 125 36.1929 125 50V62.5C125 76.3071 113.807 87.5 100 87.5C86.1929 87.5 75 76.3071 75 62.5V50C75 36.1929 86.1929 25 100 25Z" fill="#E30613"/>
                  <path d="M100 112.5C113.807 112.5 125 123.693 125 137.5V150C125 163.807 113.807 175 100 175C86.1929 175 75 163.807 75 150V137.5C75 123.693 86.1929 112.5 100 112.5Z" fill="#E30613"/>
                  <rect x="37.5" y="87.5" width="125" height="25" fill="#E30613"/>
              </svg>
              <span className="text-sidebar-primary">Admin</span>
            </Link>
          </SidebarHeader>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarFooter>
             <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Back to Site">
                        <Link href="/">
                            <LogOut />
                            <span>Back to Site</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4 md:p-6">{children}</SidebarInset>
    </SidebarProvider>
  );
}
