import React from 'react';
import { Container, DataList, Flex, Grid, Heading, Link, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from "./page.module.css";

const Ci: React.FC = () => {
    return (
        <>
            {/* <Container 
                size="4"
                style={{ 
                    marginBottom: "var(--space-4)", 
                    padding: "var(--space-6)",
                }}
            >
                <Heading 
                    as="h1" 
                    size="8"
                    style={{ marginBottom: "var(--space-4)" }}
                >
                    Ascent Design System
                </Heading>
                <Heading 
                    as="h2" 
                    size="6"
                    style={{ marginBottom: "var(--space-2)" }}
                >
                    Problem
                </Heading>
                <Text size="4">
                    Previous CEO was the center of all Competitive Intelligence based on 
                    personal knowledge, relationships, and institutional knowledge.  New 
                    CEO realized that intelligence was being missed or multiple people 
                    were spending time discovering the same information. Request was to 
                    create a process so there was transparency in the collection of 
                    competitive intelligence.
                </Text>
            </Container>
            <Container 
                size="4"
                style={{ 
                    backgroundColor: "var(--gray-4)", 
                    marginBottom: "var(--space-4)",
                    padding: "var(--space-6)",
                }}
            >
                <Heading 
                    as="h2" 
                    size="6"
                    style={{ 
                        marginBottom: "var(--space-4)" 
                    }}
                >
                    General overview
                </Heading>
                <Grid 
                    columns={{ initial: "1", md: "3" }}
                    gap="5" 
                    width="auto"
                >
                    <Flex gap="3" direction="column">
                        <Heading 
                            as="h3" 
                            size="4"
                        >
                            Role
                        </Heading>
                        <DataList.Root>
                            <DataList.Item>
                                <DataList.Label className={styles.dataListItemLabel}>
                                    Research
                                </DataList.Label>
                                <DataList.Value>
                                    (9) C-suite interviews, (5) Disease Area Executive interviews
                                    and thematic analysis of evidence based findings.
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item align="center">
                                <DataList.Label className={styles.dataListItemLabel}>
                                    Team
                                </DataList.Label>
                                <DataList.Value>
                                    1 UX Designer
                                </DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Challenges</Heading>
                        <Text size="3">
                            <b>Unknown expectations</b> - New CEO wanted a solution similar  to Amgen, desired to know the opinions of other c-suite members, but also was the final decision maker.
                        </Text>
                        <Text size="3">
                            <b>Time</b> - Rapid development of solution with POC in 3 days and MVP being delivered in one month.
                        </Text>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Impact</Heading>
                        <Text size="3">
                            Simplified surfacing of critical insights
                        </Text>
                        <Text size="3">
                            Added transparency to the process
                        </Text>
                        <Text size="3">
                            Removed inefficient email process
                        </Text>
                        <Text size="3">
                            Automated data pull from APIs and scraping data rather than manual search or emails.
                        </Text>
                        <Text size="3">
                            Decreased time from article publish, to summary, and getting into the hands of c-suite.
                        </Text>
                    </Flex>
                </Grid>
            </Container> */}
            <Container 
                size="4"
                style={{ 
                    marginBottom: "var(--space-4)",
                    padding: "var(--space-6)",
                }}
                className={styles.iframeContainer}
            >
                <Heading 
                    as="h1" 
                    size="8"
                    style={{ marginBottom: "var(--space-6)" }}
                >
                    Integrated Planning
                </Heading>
                <iframe 
                    src="https://player.vimeo.com/video/156633757?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                    title="Integrated Planning">
                </iframe>
            </Container>
        </>
    );
};

export default Ci;