"use client"

import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { usePathname } from 'next/navigation'
import styles from "./PageLayout.module.css";

interface PageLayoutProps {
    leftZone: React.ReactNode;
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ leftZone, children }) => {
    const [activeButton, setActiveButton] = useState('summary');

    const paths = usePathname();

    useEffect(() => {
        // Update the active button based on the current path on route change
        const isCurrentPathRoot = paths === '/';
        const activeButtonNumber = isCurrentPathRoot ? 'summary' : 'details';
        setActiveButton(activeButtonNumber);
    }, [paths]);

    const home = styles.home;
    const about = styles.about;
    const klaviyo = styles.klaviyo;
    const vertex = styles.vertex;
    const collaborative = styles.collaborative;
    const dassault = styles.dassault;

    return (
        <>
            <div className={styles.container}>
                <main className={styles.leftZone} data-active={activeButton === 'summary' && (true)}>
                    {leftZone}
                </main>
                <aside 
                    data-active={activeButton === 'details' && (true)}
                    className={`
                        ${styles.rightZone} 
                        ${paths.length == 1 ? styles.home : ''}
                        ${paths.startsWith('/about') ? styles.about : ''}  
                        ${paths.startsWith('/klaviyo') ? styles.klaviyo : ''} 
                        ${paths.startsWith('/vertex') ? styles.vertex : ''}
                        ${paths.startsWith('/collaborative') ? styles.collaborative : ''}
                        ${paths.startsWith('/dassault') ? styles.dassault : ''}
                    `}
                >
                    {children}
                </aside>
                <div className={styles.switcher}>
                    <Navigation />
                </div>
            </div>
        </>
    );
};

export default PageLayout;