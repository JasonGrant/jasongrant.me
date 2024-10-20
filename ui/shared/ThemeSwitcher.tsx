
"use client"

import { useState } from 'react';
import { Button, Heading } from '@radix-ui/themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const [isLightMode, setIsLightMode] = useState(true);

  const handleModeSwitch = () => {
    setIsLightMode(!isLightMode);
    document.documentElement.classList.toggle('light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button variant="ghost" size="4" onClick={handleModeSwitch} className={styles.iconTrigger}>
        {isLightMode ? (<MoonIcon />) : (<SunIcon />)}
    </Button>
  );
};

export default ThemeSwitcher;