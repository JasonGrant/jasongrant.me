"use client";

import { useState, useEffect } from 'react';
import {
  Column,
  Text,
  Button,
  Flex,
  SegmentedControl,
} from "@once-ui-system/core";

interface ThemeSwitcherProps {
  showLabels?: boolean;
  variant?: 'segmented' | 'buttons';
  size?: 's' | 'm' | 'l';
  fillWidth?: boolean;
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

export function ThemeSwitcher({ 
  showLabels = true,
  variant = 'segmented',
  size = 's',
  fillWidth = true,
  gap = 'xs'
}: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    // Get current theme from localStorage or document
    const savedTheme = localStorage.getItem('data-theme') as 'light' | 'dark' | 'system';
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    } else {
      // Check if system preference is set
      const root = document.documentElement;
      const themeAttr = root.getAttribute('data-theme');
      if (themeAttr === 'light' || themeAttr === 'dark') {
        setCurrentTheme(themeAttr);
      }
    }
  }, []);

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setCurrentTheme(theme);
    localStorage.setItem('data-theme', theme);
    
    // Apply theme to document
    const root = document.documentElement;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.setAttribute('data-theme', theme);
    }
  };

  if (variant === 'segmented') {
    return (
      <Column gap={gap} fillWidth={fillWidth}>
        {showLabels && (
          <Text variant="label-strong-s" onBackground="neutral-weak" marginBottom="8">
            Theme
          </Text>
        )}
        <SegmentedControl
          selected={currentTheme}
          onToggle={(value) => setTheme(value as 'light' | 'dark' | 'system')}
          buttons={[
            { value: 'light', label: 'Light', prefixIcon: 'sun' },
            { value: 'dark', label: 'Dark', prefixIcon: 'moon' },
            { value: 'system', label: 'System', prefixIcon: 'monitor' },
          ]}
          fillWidth={fillWidth}
        />
      </Column>
    );
  }

  return (
    <Column gap={gap} fillWidth={fillWidth}>
      {showLabels && (
        <Text variant="label-strong-s" onBackground="neutral-weak" marginBottom="8">
          Theme
        </Text>
      )}
      <SegmentedControl
          selected={currentTheme}
          onToggle={(value) => setTheme(value as 'light' | 'dark' | 'system')}
          buttons={[
            { value: 'light', label: 'Light', prefixIcon: 'sun' },
            { value: 'dark', label: 'Dark', prefixIcon: 'moon' },
            { value: 'system', label: 'System', prefixIcon: 'monitor' },
          ]}
          fillWidth={fillWidth}
        />
      {/* <Flex gap={gap} fillWidth={fillWidth}>
        <Button
          variant={currentTheme === 'light' ? 'primary' : 'secondary'}
          size={size}
          prefixIcon="sun"
          onClick={() => setTheme('light')}
          fillWidth={fillWidth}
        >
          Light
        </Button>
        <Button
          variant={currentTheme === 'dark' ? 'primary' : 'secondary'}
          size={size}
          prefixIcon="moon"
          onClick={() => setTheme('dark')}
          fillWidth={fillWidth}
        >
          Dark
        </Button>
        <Button
          variant={currentTheme === 'system' ? 'primary' : 'secondary'}
          size={size}
          prefixIcon="monitor"
          onClick={() => setTheme('system')}
          fillWidth={fillWidth}
        >
          System
        </Button>
      </Flex> */}
    </Column>
  );
} 