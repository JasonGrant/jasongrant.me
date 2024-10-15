import React from 'react';
import { Container, DataList, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from "./page.module.css";

const Loof: React.FC = () => {
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
                    Lab of our Future
                </Heading>
                <Heading 
                    as="h2" 
                    size="6"
                    style={{ marginBottom: "var(--space-2)" }}
                >
                    Problem
                </Heading>
                <Text size="4">
                    The last 30 years of rapid innovation in science and technology has resulted in fragmented data 
                    and integration issues with applications. The tech debt is limiting our ability to continue to 
                    innovate and drive the future of the drug discovery process.
                </Text>
                <Image 
                    src="/vertex/loof/Loof-Vision.jpg" 
                    alt="Sketch of the Lab of our Future vision" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={2500} 
                    height={1414}
                />
                <Text size="2">
                    <i>Vision Sketch created by Jason Grant to describe biology side of the initiative in a single page</i>
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
                                    Strategy
                                </DataList.Label>
                                <DataList.Value>
                                    Key member of Strategy team. Envisioned future opportunities, 
                                    evaluated solutions, and reported to executive leadership.
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item align="center">
                                <DataList.Label className={styles.dataListItemLabel}>
                                    Team
                                </DataList.Label>
                                <DataList.Value>
                                    2 UX Researchers, 1 UX Designer
                                </DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Challenges</Heading>
                        <Text size="3">
                            Balance research needed for holistic understanding with the need to show progress to executives.
                        </Text>
                        <Text size="3">
                            Simplify process without loosing abilities and flexibility.
                        </Text>
                        <Text size="3">
                            Planning how to change the engines from prop to jet while the 30 year old plane is in the air.
                        </Text>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Impact</Heading>
                        <Text size="3">
                            If successful, it has potential to:
                        </Text>
                        <Text size="3">
                            Provide scientists with access to data  which was previously impossible or time consuming.
                        </Text>
                        <Text size="3">
                            Reduce manual work through automation and ML/AI recommendations.
                        </Text>
                        <Text size="3">
                            Reduce tech debt to enable future innovation
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
                    Storyboard
                </Heading>
                <Text size="4">
                    Day in the life of a team of biologists 
                </Text>
                <Image 
                    src="/vertex/loof/LoOF-Storyboard.jpg" 
                    alt="Storyboard of a day in the life of a team of biologists" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={2500} 
                    height={1439}
                />
                <Text size="2">
                    <i>Storyboard created by Jason Grant to describe aspects of the vision and how it affects everyday life of a biologist.</i>
                </Text>
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
                        src="/vertex/loof/Ecosystem.png" 
                        alt="Digram of apps and the complex spiderweb of connections" 
                        className={styles.imageresponsive} 
                        layout="responsive" 
                        width={2500} 
                        height={1150}
                    />
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Complex ecosystem of apps</Heading>
                        <Text size="3">
                            Hundreds of apps made it difficult for onboarding, discovery, and training.
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
                    Workflows for every process and app
                </Heading>
                <Text size="4">
                    Every process and app had a workflow diagram to help understand the process and opportunities for improvement.
                </Text>
                <Image 
                    src="/vertex/loof/workflows.png" 
                    alt="Storyboard of a day in the life of a team of biologists" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={2500} 
                    height={859}
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
                    Research data
                </Heading>
                <Text 
                    size="4"
                >
                    Data shared with product owners and engineers to help them understand the current state of the system.
                </Text>
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
                            Sharepoint Research Data Landing Page
                        </Text>
                        <Image 
                            src="/vertex/loof/SharepointDataCapture.png" 
                            alt="Showing the research dara in sharepoint" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1245}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            User atlas (personas)
                        </Text>
                        <Image 
                            src="/vertex/loof/UserAtlas.png" 
                            alt="Showing the research dara in sharepoint" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1060}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Tech atlas - Analysis of ecosystem
                        </Text>
                        <Image 
                            src="/vertex/loof/TechAtlas.jpg" 
                            alt="Showing the research dara in sharepoint" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1060}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Research tasks on 2 week sprints
                        </Text>
                        <Image 
                            src="/vertex/loof/JiraSprint.png" 
                            alt="Tasks in Jira" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1513}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Interviews are transcribed and tagged in Dovetail
                        </Text>
                        <Image 
                            src="/vertex/loof/Dovetail+Interviews.png" 
                            alt="Interviews in Dovetail" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1196}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Review highlights and connect to insights
                        </Text>
                        <Image 
                            src="/vertex/loof/Dovetail+Highlights.png" 
                            alt="Interviews in Dovetail" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1198}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Review insight highlights and use to write up findings
                        </Text>
                        <Image 
                            src="/vertex/loof/Dovetail+Insights.png" 
                            alt="Research insights in Dovetail" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1197}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Look at all research tags by category
                        </Text>
                        <Image 
                            src="/vertex/loof/Dovetail+Tags+Pie.png" 
                            alt="Research tags in Dovetail" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1196}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Text size="2">
                            Look at all research tags by most used
                        </Text>
                        <Image 
                            src="/vertex/loof/Dovetail+Tags+Bar.png" 
                            alt="Research tags in Dovetail" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1196}
                        />
                    </Flex>
                </Grid>
            </Container>
        </>
    );
};

export default Loof;