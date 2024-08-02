'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

import { GlowingText } from './ui';
import {
  ContactIcon,
  GalleryIcon,
  HomeIcon,
  ProjectsIcon,
  ThoughtsIcon,
} from './ui/';

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
      href: '/gallery/Japan',
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
            prefetch
            onClick={() => setIsMenuOpen(false)}
            color="foreground"
          >
            <GlowingText>
              <HomeIcon />
            </GlowingText>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden md:flex" justify="center">
        {MenuItems.map(({ icon, title, href }, index) => (
          <NavbarItem key={index} isActive={pathname.includes(href)}>
            <Link
              href={href}
              prefetch
              onClick={() => setIsMenuOpen(false)}
              color="foreground"
            >
              <GlowingText isActive={pathname.includes(href)}>
                {icon}
                <span className="">{title}</span>
              </GlowingText>
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
        {MenuItems.map(({ icon, title, href }, index) => (
          <NavbarMenuItem key={index}>
            <Link
              href={href}
              prefetch
              onClick={() => setIsMenuOpen(false)}
              color="foreground"
              className="gap-1 flex"
            >
              {icon}
              <span>{title}</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
