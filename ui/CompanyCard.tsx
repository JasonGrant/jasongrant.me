"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Box, Card, Container, Flex, Heading, ScrollArea, SegmentedControl } from '@radix-ui/themes';
import styles from './CompanyCard.module.css';

interface CompanyCardProps {
    // company: string;
    logo: React.ReactNode;
    aboutUrl: string;
    impactUrl: string;
    workUrl: string;
    children: React.ReactNode
}

const CompanyCard: React.FC<CompanyCardProps> = ({ logo, aboutUrl, impactUrl, workUrl, children }) => {
    const router = useRouter();

    const aboutValue = aboutUrl.substring(aboutUrl.lastIndexOf('/') + 1);
    
    const paths = usePathname();
    const pathName = paths.substring(paths.lastIndexOf('/') + 1);

    const [htmlClass, setHtmlClass] = useState('');

    useEffect(() => {
      // Ensure the code only runs on the client side
        if (typeof window !== 'undefined') {
            const htmlElement = document.documentElement; // Get the <html> element

            // Function to update the state when the class changes
            const updateClass = () => {
                const currentClass = htmlElement.className;
                setHtmlClass(currentClass);
            };

            // Set the initial class
            updateClass();

            // Create a MutationObserver to watch for class changes
            const observer = new MutationObserver(updateClass);

            observer.observe(htmlElement, {
                attributes: true, // Monitor attributes
                attributeFilter: ['class'], // Specifically watch for changes to the 'class' attribute
            });

            // Cleanup the observer on component unmount
            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return (
        <Container 
            height="100%" 
            size="2" 
            px={{initial: '3', md: '7'}} 
            pt={{initial: '3', md: '7'}} 
            pb={{initial: '9', md: '7'}} 
            className={styles.cardcontainer}
            data-theme={htmlClass}

        >
            <Card 
                size="4" 
                className={styles.companycard}
            >
                <Flex 
                    direction={{initial: 'column', sm: 'row'}} 
                    justify={{initial: 'center', sm: 'between'}}
                    gap={{initial: '4', sm: '0'}}  
                    align="center" 
                    overflow="hidden" 
                >
                    <Flex
                        className={styles.logocontainer}
                        data-theme={htmlClass}
                    >
                        {logo}
                    </Flex>
                    <SegmentedControl.Root 
                        defaultValue={pathName} 
                        radius="full" 
                        className={styles.companyinfoswitch}
                    >
                        <SegmentedControl.Item 
                            value={aboutValue} 
                            onClick={() => router.push(aboutUrl)}
                        >
                            About
                        </SegmentedControl.Item>
                        <SegmentedControl.Item 
                            value="impact" 
                            onClick={() => router.push(impactUrl)}
                        >
                            Impact
                        </SegmentedControl.Item>
                        <SegmentedControl.Item 
                            value="work" 
                            onClick={() => router.push(workUrl)}
                        >
                            Work
                        </SegmentedControl.Item>
                    </SegmentedControl.Root>
                </Flex>
                <ScrollArea 
                    type="auto" 
                    scrollbars="vertical" 
                    size="2" 
                    radius="full" 
                    className={styles.scrollarea}
                >
                    {children}
                </ScrollArea>
            </Card>
        </Container>
    );
}

export default CompanyCard;