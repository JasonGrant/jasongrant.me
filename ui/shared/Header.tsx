import React from 'react';
import styles from './Header.module.css';
import { Link, Heading, Text } from '@radix-ui/themes';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
    title: string;
    back: boolean;
    menu?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, back, menu }) => {
    return (
        <header className={styles.containerOuter}>
            <div className={styles.containerInner}>
                <div className={styles.start}>
                    {back && (
                        <Link href="/">
                            <Heading size="3" className={styles.back}>
                                <ArrowLeftIcon /> Back to Home
                            </Heading>
                        </Link>
                    )}
                    {menu}
                </div>
                <div className={styles.center}>
                    <Heading 
                        size={{ initial: "4", sm: "6", md: "7" }} 
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

export default Header;