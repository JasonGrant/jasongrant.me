import { Heading, Text } from '@radix-ui/themes';
import Header from '@/ui/shared/Header';
import NavCard from '@/ui/landing/NavCard';
import styles from "./page.module.css";

interface Item {
    image: string;
    title: string;
    description: string;
    link: string;
    button: string;
}

const items: Item[] = [
    {
        image: '/Portfolio_Writing.jpg',
        title: 'Writing',
        description: 'Designing Forward is a collection of articles that explore the intersection of design, technology, and leadership.',
        link: '/writing',
        button: 'Browse articles',
    },
    {
        image: '/Portfolio_Traditional.jpg',
        title: 'Traditional Portfolio',
        description: 'Typical portfolio layout with a focus on showcasing projects and case studies.',
        link: '/traditional',
        button: 'Review work',
    },
    {
        image: '/Portfolio_Experimental.jpg',
        title: 'Experimental Portfolio',
        description: 'Experimenting with a new way to navigate and structure a portfolio, providing a more narrative experience.',
        link: '/narrative/about',
        button: 'Explore',
    },
    {
        image: '/Publishing_Site.jpg',
        title: 'Changelog',
        description: 'Explore the latest updates and changes to the site.',
        link: '/changelog',
        button: 'View updates',
    },
    // {
    //     image: '/writing/2024-10-08-ClarityThoughtExecution.webp',
    //     title: 'About',
    //     description: 'Learn more about Jason',
    //     link: '/narrative',
    //     button: 'Learn more',
    // },
];

const ItemList: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <Header 
                title='Jason Grant'
                back={false}
            />
            <Text 
                as="p" 
                size="3" 
                wrap="balance"
                align="center"
                className={styles.pageDescription}
            >
                Design leader, people manager of 10+ years, front-end engineer and product thinker 
                with a track record of growing and developing high-performing, customer focused teams. 
                I expertly lead diverse teams through the entire product lifecycle, from initial 
                discovery and strategic vision to detailed execution and successful delivery. My 
                leadership approach is rooted in a commitment to experimentation, driven by curiosity, 
                and focused on fostering collaborative, innovative environments that drive impactful 
                design solutions.
            </Text>
            <div className={styles.itemsContainer}>
                {items.map((item, index) => (
                    <NavCard
                        key={index}
                        imageUrl={item.image}
                        title={item.title}
                        description={item.description}
                        route={item.link}
                        button={item.button}
                    />
                ))}
            </div>
        </div>
    );
};

export default ItemList;