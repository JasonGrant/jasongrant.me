"use client"

import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import RowItem from './RowItem';
import Navigation from './Navigation';
import { usePathname } from 'next/navigation'
import styles from "./PageLayout.module.css";

interface PageLayoutProps {
    leftZone: React.ReactNode;
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ leftZone, children }) => {
    const [activeButton, setActiveButton] = useState('summary');
//     const [activeSegment, setActiveSegment] = useState('details');
//     // const router = useRouter();
    const paths = usePathname();

//     const handleButtonClick = (buttonNumber: string) => {
//         setActiveButton(buttonNumber);
//     };

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
                    {/* <Flex
                        direction='row'
                        justify='between'
                        align='center'
                        px="7"
                        pt="4"
                    >
                        <RowItem startLabel="Jason Grant" url="/" />
                    </Flex> */}
                    {leftZone}
                </main>
                <aside 
                    data-active={activeButton === 'details' && (true)}
                    className={`
                        ${styles.rightZone} 
                        ${paths.length == 1 ? home : ''}
                        ${paths.startsWith('/about') ? about : ''}  
                        ${paths.startsWith('/klaviyo') ? klaviyo : ''} 
                        ${paths.startsWith('/vertex') ? vertex : ''}
                        ${paths.startsWith('/collaborative') ? collaborative : ''}
                        ${paths.startsWith('/dassault') ? dassault : ''}
                    `}
                >
                    {children}
                </aside>
                <div className={styles.switcher}>
                    {/* <SegmentedControl.Root defaultValue={activeSegment} size="3">
                        <SegmentedControl.Item value='summary' onClick={() => handleButtonClick('summary')}>
                            Summary
                        </SegmentedControl.Item>
                        <SegmentedControl.Item value="details" onClick={() => handleButtonClick('details')}>
                            Details
                        </SegmentedControl.Item>
                    </SegmentedControl.Root> */}
                    <Navigation />

                    {/* <button
                        className={`button ${activeButton === summary ? 'active' : ''}`}
                        onClick={() => handleButtonClick(summary)}
                    >
                        Button summary
                    </button>
                    <button
                        className={`button ${activeButton === details ? 'active' : ''}`}
                        onClick={() => handleButtonClick(details)}
                    >
                        Button details
                    </button> */}
                </div>
            </div>
        </>
    );
};

// activeButton === summary && (`${data-columns="3"}`)

export default PageLayout;