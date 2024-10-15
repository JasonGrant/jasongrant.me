"use client"

import React from 'react';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation'
import styles from './Navigation.module.css';

interface NavigationProps {
    icononly?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ icononly }) => {
    const router = useRouter();

    const handleClick = (url: string) => {
        router.push(url);
    };

    return (
        <DropdownMenu.Root>
            {icononly ? (
                <DropdownMenu.Trigger className={styles.triggericon}>
                    <Button variant="ghost" size="4">
                        <HamburgerMenuIcon />
                    </Button>
                </DropdownMenu.Trigger>
            ) : (
                <DropdownMenu.Trigger className={styles.trigger}>
                    <Button color="gray" highContrast>
                        Menu
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
            )}
            <DropdownMenu.Content color="gray" highContrast>
                <DropdownMenu.Item 
                    shortcut="" 
                    className={`
                        ${icononly ? styles.icononlyitem : styles.item}
                    `}
                    onClick={() => handleClick('/')}
                >
                    Back to Home
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="Jason Grant" 
                    className={`
                        ${icononly ? styles.icononlyitem : styles.item}
                    `}
                    onClick={() => handleClick('/narrative/about')}
                >
                    About
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="2021 - Now" 
                    className={`
                        ${icononly ? styles.icononlyitem : styles.item}
                    `}
                    onClick={() => handleClick('/narrative/klaviyo')}
                >
                    Klaviyo
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="2017 - 2021"
                    className={`
                        ${icononly ? styles.icononlyitem : styles.item}
                    `}
                    onClick={() => handleClick('/narrative/vertex')}
                >
                    Vertex
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="2014 - 2017" 
                    className={`
                        ${icononly ? styles.icononlyitem : styles.item}
                    `}
                    onClick={() => handleClick('/narrative/collaborative')}
                >
                    Collaborative
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="2011 - 2014" 
                    className={`
                        ${icononly ? styles.icononlyitem : styles.item}
                    `}
                    onClick={() => handleClick('/narrative/dassault')}
                >
                    Dassault
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    className={`
                        ${icononly ? styles.icononlyitem : styles.item}
                    `}
                    onClick={() => handleClick('/narrative/contact')}
                >
                    Connect with Jason
                </DropdownMenu.Item>
                {icononly ? ('') : (
                    <>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item 
                            shortcut="Summary"
                            className={`
                                ${icononly ? styles.icononlyitem : styles.item}
                            `}
                            onClick={() => handleClick('/')}
                        >
                            Home
                        </DropdownMenu.Item>
                    </>
                )}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
};

export default Navigation;

