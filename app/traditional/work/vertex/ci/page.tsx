import React from 'react';
import { Blockquote, Container, DataList, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from "./page.module.css";

const Ci: React.FC = () => {
    return (
        <>
            <Container 
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
                    Competitive Intelligence
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
                <Image 
                    src="/vertex/ci/CompetitiveIntelligenceVision.jpg" 
                    alt="Competitive Intelligence Vision Sketch" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={2500} 
                    height={1406}
                />
                <Text size="2">
                    <i>Vision sketch created by Jason Grant to depict the solution in a single view.</i>
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
            </Container>
            <Container 
                size="4"
                style={{ 
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
                    Research results
                </Heading>
                <Grid 
                    columns={{ initial: "1", md: "3" }}
                    gap="5" 
                    width="auto"
                    style={{ 
                        marginTop: "var(--space-4)",
                    }}
                >
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Thematic Analysis</Heading>
                        <Text size="2">
                            Identified the main themes uncovered by interviews.
                        </Text>
                        <Image 
                            src="/vertex/ci/ThematicAnalysis.png" 
                            alt="Thematic Analysis of Competitive Intelligence" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1233}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Theme Details</Heading>
                        <Text size="2">
                            Theme findings, Concerns and backed by evidence.
                        </Text>
                        <Image 
                            src="/vertex/ci/ThemeFindingsEvidence.png" 
                            alt="Theme Findings and Evidence" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1407}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Workflows</Heading>
                        <Text size="2">
                            Define process and decisions across system and departments.
                        </Text>
                        <Image 
                            src="/vertex/ci/CI-Workflows.jpg" 
                            alt="Competitive Intelligence Workflows" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1904}
                        />
                    </Flex>
                </Grid>
            </Container>
            <Container 
                size="4"
                style={{ 
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
                    Solution
                </Heading>
                <Grid 
                    columns={{ initial: "1", md: "2" }}
                    gap="5" 
                    width="auto"
                    style={{ 
                        marginTop: "var(--space-4)",
                    }}
                >
                    <Flex gap="3" direction="column">
                        <Image 
                            src="/vertex/ci/CompetitiveIntelligenceDashboard.jpg" 
                            alt="Competitive Intelligence Dashboard" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={1367} 
                            height={1698}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Image 
                            src="/vertex/ci/CompetitiveIntelligenceReports.jpg" 
                            alt="Competitive Intelligence Reports" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={1367} 
                            height={1496}
                        />
                    </Flex>
                </Grid>
            </Container>
        </>
    );
};

export default Ci;