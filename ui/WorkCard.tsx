"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, Flex } from '@radix-ui/themes';
import Styles from './WorkCard.module.css';

interface CompanyCardProps {
    imageUrl: string;
    imageAltText: string;
    linkType: 'internal' | 'external';
    linkUrl: string;
    children: React.ReactNode
}

const WorkCard: React.FC<CompanyCardProps> = ({ imageUrl, imageAltText, linkType, linkUrl, children }) => {
    const router = useRouter();

    const handleClick = () => {
        if (linkType === 'internal') {
            router.push(linkUrl);
        } else if (linkType === 'external') {
            window.open(linkUrl, '_blank');
        }
    };

    return (
        <Card 
            size="2" 
            style={{padding: 0}}
            onClick={handleClick}
            className={Styles.cardhover}
        >
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1rem" }}>
                <div style={{ width: "120px" }}>
                    <img
                        src={imageUrl}
                        alt={imageAltText}
                        style={{
                            objectFit: 'cover',
                            width: 120,
                            height: '100%',
                        }}
                    />
                </div>
                <Flex direction="column" gap="2" py="4" pr="2">
                    {children}
                </Flex>
            </div>
        </Card>
    );
}

export default WorkCard;