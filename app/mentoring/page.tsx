import React from 'react';
import { Container, Flex, Heading, Link } from '@radix-ui/themes';
import styles from "./page.module.css";

const MentoringPage: React.FC = () => {
    return (
        <Container size="4" className={styles.pageContainer}>
            <div className={styles.pageLayout}>
                <Flex direction="column" gap="4" pt="5" className={styles.informationZone}>
                    <Heading size="5">Jason Grant</Heading>
                    <Link href="https://adplist.org/mentors/jason-grant" target="_blank" rel="noopener noreferrer">View profile</Link>
                    <iframe src="https://adplist.org/widgets/impact?src=jason-grant" title="Impact" width="100%" height="100%" loading="lazy" style={{ border: '0px' }}></iframe>
                </Flex>
                <Flex direction="column" gap="4" className={styles.reviewsZone}>
                    <iframe
                        src="https://adplist.org/widgets/reviews?src=jason-grant"
                        title="All Reviews"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ border: '0px' }}
                    ></iframe>
                </Flex>
            </div>
        </Container>
    );
};

export default MentoringPage;