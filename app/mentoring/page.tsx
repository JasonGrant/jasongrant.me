import React from 'react';
import { Container, DataList, Flex, Heading } from '@radix-ui/themes';
import styles from "./page.module.css";

const MentoringPage: React.FC = () => {
    return (
        <Container size="4" className={styles.pageContainer}>
            <div className={styles.pageLayout}>
                <Flex direction="column" gap="4" pt="4" className={styles.informationZone}>
                    {/* <Heading size="5">Jason Grant</Heading> */}
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
                {/* <section style={{ padding: '16px', height: '100%', overflow: 'hidden', width: '100%', maxWidth: '650px' }}>
                    <iframe
                        src="https://adplist.org/widgets/reviews?src=jason-grant"
                        title="All Reviews"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ border: '0px' }}
                    ></iframe>
                </section> */}
            </div>
        </Container>
    );
};

export default MentoringPage;