'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import { Link } from '@nextui-org/link';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';

import Social from '@/components/Social';
import ThemeSwitch from '@/components/ThemeSwitch';

import {
  ContactIcon,
  GalleryIcon,
  HomeIcon,
  ProjectsIcon,
  ThoughtsIcon,
} from './ui/Icons';

export default function NavBar() {
  const MenuItems = [
    {
      icon: <ThoughtsIcon />,
      title: 'Thoughts',
      href: '/thoughts',
    },
    {
      icon: <ProjectsIcon />,
      title: 'Projects',
      href: '/projects',
    },
    {
      icon: <GalleryIcon />,
      title: 'Gallery',
      href: '/gallery',
    },
    {
      icon: <ContactIcon />,
      title: 'Contact',
      href: '/contact',
    },
  ];

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      maxWidth="full"
      classNames={{
        item: ['flex', 'relative', 'h-full', 'items-center'],
      }}
    >
      <NavbarContent justify="start">
        <NavbarItem>
          <Link
            href="/"
            onPress={() => setIsMenuOpen(false)}
            color="foreground"
          >
            <HomeIcon />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden md:flex" justify="center">
        {MenuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname.includes(item.href)}
          >
            <Link href={item.href} color="foreground" className="gap-1">
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Social />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarMenuToggle
          className="md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarMenu>
        {MenuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              href={item.href}
              onPress={() => setIsMenuOpen(false)}
              color="foreground"
              className="gap-1"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
