'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Link } from '@nextui-org/link';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';

import {
  PencilSquareIcon,
  FolderOpenIcon,
  CameraIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/solid';
import { HomeIcon } from '@heroicons/react/24/solid';

import Social from '@/components/Social';
import ThemeSwitch from '@/components/ThemeSwitch';

export default function NavBar() {
  const size = 24;
  const MenuItems = [
    {
      icon: <PencilSquareIcon width={size} height={size} />,
      title: 'Thoughts',
      href: '/thoughts',
    },
    {
      icon: <FolderOpenIcon width={size} height={size} />,
      title: 'Projects',
      href: '/projects',
    },
    {
      icon: <CameraIcon width={size} height={size} />,
      title: 'Gallery',
      href: '/gallery',
    },
    {
      icon: <ChatBubbleLeftEllipsisIcon width={size} height={size} />,
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
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          // 'data-[active=true]:bg-gradient-to-r',
          // 'data-[active=true]:from-primary',
          // 'data-[active=true]:via-green-500',
          // 'data-[active=true]:to-secondary',
          // 'data-[active=true]:text-transparent',
          // 'data-[active=true]:bg-clip-text',
          // 'data-[active=true]:after:absolute',
          // "data-[active=true]:after:content-['']",
          // 'data-[active=true]:after:absolute',
          // 'data-[active=true]:after:bottom-0',
          // 'data-[active=true]:after:left-0',
          // 'data-[active=true]:after:right-0',
          // 'data-[active=true]:after:h-[2px]',
          // 'data-[active=true]:after:rounded-[2px]',
          // 'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarContent justify="start">
        <NavbarItem>
          <Link
            href="/"
            color="foreground"
            onPress={() => setIsMenuOpen(false)}
          >
            <HomeIcon width={size} height={size} />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden md:flex" justify="center">
        {MenuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname === item.href}
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
          <NavbarMenuItem key={`${item}-${index}`}>
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
