"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heading, Text, Button } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './NavCard.module.css';

interface NavCardProps {
    imageUrl: string;
    title: string;
    description: string;
    route: string;
    button: string;
}

const NavCard: React.FC<NavCardProps> = ({ imageUrl, title, description, route, button }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(route);
    };

    return (
        <div className={styles.cardContainer} onClick={handleClick}>
            <Image 
                className={styles.cardImage} 
                src={imageUrl} 
                alt={title} 
                width={260}
                height={260}
                style={{objectFit: "contain"}}
            />
            <Heading 
                as="h3" 
                size="4" 
                wrap="balance"
                align="center"
                className={styles.cardTitle}
            >
                {title}
            </Heading>
            <Text 
                as="p" 
                size="2"
                wrap="balance" 
                align="center"
                className={styles.cardDescription}
            >
                {description}
            </Text>
            <Button
                size="3"
                highContrast
                className={styles.cardButton}
            >
                {button}
            </Button>
        </div>
    );
};

export default NavCard;