'use client'

import React from 'react';
import styles from './TraditionalHeader.module.css';
import { usePathname } from 'next/navigation'
import { Heading, IconButton, Button, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import ThemeSwitcher from '@/ui/shared/ThemeSwitcher';

interface TraditionalHeaderProps {
    title: string;
    menu?: React.ReactNode;
}

const TraditionalHeader: React.FC<TraditionalHeaderProps> = ({ title, menu }) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )

    return (
        <header className={styles.containerOuter}>
            <div className={styles.containerInner}>
                <div className={styles.start}>
                    {paths.length <= 13 ? (
                        <Link href="/">
                            <Button variant="ghost" size="3" className={styles.backLink}>
                                <ArrowLeftIcon width="18" height="18"/> Back to Home
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/traditional">
                            <Button variant="ghost" size="3" className={styles.backLink}>
                                <ArrowLeftIcon width="18" height="18"/> All Work
                            </Button>
                        </Link>
                    )}
                    {menu}
                </div>
                <div className={styles.center}>
                    <Heading 
                        size={{ initial: "4", md: "7" }}
                        className={styles.title}
                    >
                        {title}
                    </Heading>
                </div>
                <div className={styles.end}>
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
};

export default TraditionalHeader;