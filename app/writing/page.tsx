"use client"

import React from 'react';
import { Heading, Text } from '@radix-ui/themes';
import styles from "./page.module.css";

interface Article {
    image: string;
    title: string;
    description: string;
    date: string;
    link: string;
}

const articles: Article[] = [
    {
        image: '/writing/2024-10-08-ClarityThoughtExecution.webp',
        title: 'Clarity of Thought and Clarity of Execution',
        description: 'The Path to Successful Outcomes is Think Before you Do',
        date: 'Oct 08, 2024',
        link: 'https://mrjasongrant.substack.com/p/clarity-of-thought-and-clarity-of',
    },
    {
        image: '/writing/2024-10-02-FutureProofComponentLibrary.webp',
        title: 'Building Future Proof Component Libraries',
        description: 'Why investing in flexibility today can lead to scalable success tomorrow',
        date: 'Oct 02, 2024',
        link: 'https://mrjasongrant.substack.com/p/building-future-proof-component-libraries',
    },
    {
        image: '/writing/2024-9-26-UnlockingSecret.webp',
        title: 'Unlocking the Secret to Becoming an Expert in Product Design and Beyond',
        description: 'Mastering more than design tools fosters empathy, boosts collaboration, and accelerates your career growth.',
        date: 'Sep 26, 2024',
        link: 'https://mrjasongrant.substack.com/p/unlocking-the-secret-to-becoming',
    },
    {
        image: '/writing/2024-9-23-SilentSaboteur.webp',
        title: 'The Silent Saboteur: How Avoiding Critical Feedback Hurts',
        description: 'Exploring the dangers of mixed messages and how managers can foster trust through clear, constructive feedback.',
        date: 'Sep 23, 2024',
        link: 'https://mrjasongrant.substack.com/p/the-silent-saboteur-how-avoiding',
    },
    {
        image: '/writing/2024-9-17-VelocityDropping.webp',
        title: 'Your Velocity Is Dropping—Here’s Why',
        description: 'How tech and design debt are hurting your product and brand, and how to fix it.',
        date: 'Sep 17, 2024',
        link: 'https://mrjasongrant.substack.com/p/your-velocity-is-droppingheres-why',
    },
];

const ArticleList: React.FC = () => {
    return (
        <div className={styles.articlesContainer}>
            {articles.map((article, index) => (
                <div key={index} className={styles.articleContainer} onClick={() => window.open(article.link, '_blank')}>
                    <div className={styles.articleImageContainer}>
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className={styles.articleImage}
                        />
                    </div>
                    <div className={styles.articleContent}>
                        <Text 
                            as="p" 
                            size="1"
                            className={styles.articleDate}
                        >
                            {article.date}
                        </Text>
                        <Heading 
                            as="h3" 
                            size="3"
                            className={styles.articleTitle}
                        >
                            {article.title}
                        </Heading>
                        <Text 
                            as="p" 
                            size="3"
                            className={styles.articleDescription}
                        >
                            {article.description}
                        </Text>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticleList;