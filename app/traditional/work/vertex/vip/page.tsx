import React from 'react';
import { Blockquote, Container, DataList, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from "./page.module.css";

const Vip: React.FC = () => {
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
                    Vertex Informatics Platform
                </Heading>
                <Heading 
                    as="h2" 
                    size="6"
                    style={{ marginBottom: "var(--space-2)" }}
                >
                    Problem
                </Heading>
                <Text size="4">
                    The experience team was approached to determine why a relatively new 
                    application for high-throughput screening was failing in user adoption 
                    and to look at expanding to include informatics around the screening 
                    campaigns and compound selection.
                </Text>
                <Heading 
                    as="h3" 
                    size="4"
                    style={{ marginTop: "var(--space-4)" }}
                >
                    What users said their process includes
                </Heading>
                <Image 
                    src="/vertex/vip/UserDefinedProcess.png" 
                    alt="Sketch of the Lab of our Future vision" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={1818} 
                    height={246}
                />
                <Heading as="h3" size="4">What shadowing reveals as their process</Heading>
                <Image 
                    src="/vertex/vip/03+Screening+Process+Flow+Diagram+-+Research+Added+Data+Review.jpg" 
                    alt="Sketch of the Lab of our Future vision" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={2500} 
                    height={1350}
                />
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
                                    My tasks
                                </DataList.Label>
                                <DataList.Value>
                                    Shadowed the high-throughput screening team for a week, conducted 
                                    20 interviews across three research sites, and shared results, 
                                    recommendations, and prototypes with users and stakeholders.
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item align="center">
                                <DataList.Label className={styles.dataListItemLabel}>
                                    Team
                                </DataList.Label>
                                <DataList.Value>
                                    1 UX Researcher, 1 UX Designer
                                </DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Challenges</Heading>
                        <Text size="3">
                            Project was a much larger scope than initially discussed.
                        </Text>
                        <Text size="3">
                            Results of research included recommendation to completely replace a 2 year old app and needed to be carefully communicated for political reasons.
                        </Text>
                        <Text size="3">
                            Regaining the trust and confidence of users after the previous app failure required frequent checkins throughout design process to ensure solution would meet their needs.
                        </Text>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Impact</Heading>
                        <Text size="3">
                            Gained back the trust and confidence of the users.
                        </Text>
                        <Text size="3">
                            Provides visibility into the complete history of each of the 700,000+ compounds with decision information captured at each stage.
                        </Text>
                        <Text size="3">
                            Reduces the apps required for the process from 24 to 14 with a plan to continue to integrate additional apps.
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
                    style={{ marginBottom: "var(--space-2)" }}
                >
                    Vision statement
                </Heading>
                <Blockquote>
                    Simplify the complexity of the process while providing accurate automated reporting of progress, statistics and support for better analytics. 
                </Blockquote>
            </Container>
            <Container 
                size="4"
                style={{  
                    marginBottom: "var(--space-4)",
                    padding: "var(--space-6)",
                }}
            >
                <Grid 
                    columns={{ initial: "1", md: "2" }}
                    gap="8" 
                    width="auto"
                    style={{ 
                        marginBottom: "var(--space-6)" 
                    }}
                >
                    <Image 
                        src="/vertex/vip/VIP-BusinessGoals.png" 
                        alt="Digram of apps and the complex spiderweb of connections" 
                        className={styles.imageresponsive} 
                        layout="responsive" 
                        width={2486} 
                        height={1200}
                    />
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Business Goals based on research</Heading>
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
                    style={{ marginBottom: "var(--space-2)" }}
                >
                    Journey Map
                </Heading>
                <Text size="4">
                    While this describes that the later phases of a project are where frustration 
                    grows, the cause is on the beginning stages where the data is not captured 
                    effectively and cannot be used to make decisions or report results.
                </Text>
                <Image 
                    src="/vertex/vip/VIP-HTS-Journeymap.png" 
                    alt="Journey map of the high-throughput screening process" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={1438} 
                    height={693}
                />
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
                    style={{ marginBottom: "var(--space-2)" }}
                >
                    Number of applications used at each stage
                </Heading>
                <Text size="4">
                    The more apps a user needs to use to complete their work, the more complexity 
                    that is added to the process. In addition to the number of apps, every app is 
                    unique and what a user learns in one app does not help them in using another 
                    app. Reducing the number of apps is crucial for success.
                </Text>
                <Image 
                    src="/vertex/vip/VIP-HTS-AppsAtStages.png" 
                    alt="Apps used at each stage of the high-throughput screening process" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={1441} 
                    height={696}
                />
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
                    style={{ marginBottom: "var(--space-2)" }}
                >
                    Summarize findings into themes
                </Heading>
                <Image 
                    src="/vertex/vip/VIP-HTS-Themes.png" 
                    alt="Themes from the high-throughput screening process research" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={1407} 
                    height={749}
                />
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
                    Each theme is backed by evidence
                </Heading>
                <Grid 
                    columns={{ initial: "1", md: "2" }}
                    gap="5" 
                    width="auto"
                    style={{ 
                        marginTop: "var(--space-4)",
                    }}
                >
                    <Image 
                        src="/vertex/vip/VIP-HTS-Theme-ReducingApps.png" 
                        alt="Reducing the number of apps used in the high-throughput screening process" 
                        className={styles.imageresponsive} 
                        layout="responsive" 
                        width={1422} 
                        height={762}
                    />
                    <Image 
                        src="/vertex/vip/VIP-HTS-Theme-BeanCounting.png" 
                        alt="Bean counting in the high-throughput screening process" 
                        className={styles.imageresponsive} 
                        layout="responsive" 
                        width={1414} 
                        height={770}
                    />
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
                    columns={{ initial: "1", md: "3" }}
                    gap="5" 
                    width="auto"
                    style={{ 
                        marginTop: "var(--space-4)",
                    }}
                >
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Percentage of screening decks completed in campaign
                        </Text>
                        <Image 
                            src="/vertex/vip/VIP-HTS-Decks.png" 
                            alt="Percentage of screening decks completed in campaign" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1401}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Plate thumbnails from a screening run
                        </Text>
                        <Image 
                            src="/vertex/vip/VIP-HTS-Plates.png" 
                            alt="High throughput screening plates" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1445}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Details of plate results from a screening run
                        </Text>
                        <Image 
                            src="/vertex/vip/VIP-HTS-Plate.png" 
                            alt="Details of plate results from a screening run" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1445}
                        />
                    </Flex>
                </Grid>
            </Container>
        </>
    );
};

export default Vip;