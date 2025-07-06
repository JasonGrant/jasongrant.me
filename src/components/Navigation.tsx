"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Column,
  Flex,
  Text,
  Button,
  Line,
  Avatar,
  SegmentedControl,
  NavIcon,
} from "@once-ui-system/core";
import { ProfileSection } from './ProfileSection';
import { NavigationItems } from './NavigationItems';
import { SocialLinks } from './SocialLinks';
import { ThemeSwitcher } from './ThemeSwitcher';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'Experience' },
  { href: '/writing', label: 'Writing' },
];

const socialLinks = [
  { href: 'https://github.com/jasongrant', icon: 'github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/mrjasongrant/', icon: 'linkedin', label: 'LinkedIn' },
  { href: 'https://mrjasongrant.substack.com/', icon: 'substack', label: 'Substack' },
  { href: 'https://bsky.app/profile/jasongrant.bsky.social/', icon: 'bluesky', label: 'Bluesky' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <>
      {!isMobile && (
        <>
          {/* Desktop Navigation */}
          <Column
            border="neutral-alpha-weak"
            style={{ 
              width: '340px',
              height: '100vh', 
              borderRight: '1px solid var(--neutral-alpha-medium)',
              flexShrink: 0,
              flexGrow: 1,
            }}
            padding="m"
            gap="xl"
            vertical="space-between"
            className="desktop-nav"
          >

            <ProfileSection
              name="Jason Grant"
              imageSrc="/images/JasonHeadshot2025.jpeg"
              size="l"
              textVariant="heading-strong-l"
              href="/"
            />

            <NavigationItems 
              items={navigationItems}
            />

            <Column gap="m">  
              <SocialLinks 
                links={socialLinks}
                showExternalIcon={false}
              />
              <ThemeSwitcher 
                variant="segmented"
                showLabels={false}
              />
            </Column>
            
          </Column>
        </>
      )}

      {isMobile && (
        <>
          {/* Mobile Header */}
          <Flex
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 900,
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
              borderBottom: '1px solid var(--neutral-alpha-weak)',
              backgroundColor: 'transparent',
              height: '60px'
            }}
            padding="m"
            horizontal="space-between"
            vertical="center"
            className="mobile-header"
          >
            <ProfileSection
              name="Jason Grant"
              imageSrc="/images/JasonHeadshot2025.jpeg"
              size="m"
              textVariant="heading-strong-m"
              href="/"
              align="start"
            />
            
            <NavIcon
              onClick={toggleMobileMenu}
              isActive={isMobileMenuOpen}
            />
          </Flex>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <Column
              background="surface"
              border="neutral-alpha-weak"
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                minWidth: '280px',
                position: 'fixed',
                top: '48px',
                right: '16px',
                zIndex: 999
              }}
              padding="m"
              gap="m"
            >
              {/* Navigation Items */}
              <NavigationItems 
                items={navigationItems}
                showActiveIcon={true}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />

              <Line background="neutral-alpha-weak" />

              {/* Social Links */}
              <SocialLinks 
                links={socialLinks}
                showExternalIcon={false}
              />

              <Line background="neutral-alpha-weak" />

              {/* Theme Switcher */}
              <ThemeSwitcher 
                variant="buttons"
                showLabels={true}
                size="s"
              />
            </Column>
          )}
        </>
      )}
    </>
  );
} 