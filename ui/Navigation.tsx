"use client"

import React from 'react';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { useRouter } from 'next/navigation'
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
    const router = useRouter();

    const handleClick = (url: string) => {
        router.push(url);
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className={styles.trigger}>
                <Button color="gray" highContrast>
                    Menu
                    <DropdownMenu.TriggerIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content color="gray" highContrast>
                <DropdownMenu.Item 
                    shortcut="Jason Grant" 
                    className={styles.item}
                    onClick={() => handleClick('/about')}
                >
                    About
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="2021 - Now" 
                    className={styles.item}
                    onClick={() => handleClick('/klaviyo')}
                >
                    Klaviyo
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="2017 - 2021"
                    className={styles.item}
                    onClick={() => handleClick('/vertex')}
                >
                    Vertex
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="2014 - 2017" 
                    className={styles.item}
                    onClick={() => handleClick('/collaborative')}
                >
                    Collaborative
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                    shortcut="2011 - 2014" 
                    className={styles.item}
                    onClick={() => handleClick('/dassault')}
                >
                    Dassault
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item 
                    shortcut="Summary"
                    onClick={() => handleClick('/')}
                >
                    Home
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
};

export default Navigation;

