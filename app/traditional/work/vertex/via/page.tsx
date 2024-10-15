import React from 'react';
import { Box, Container, DataList, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from "./page.module.css";

const Via: React.FC = () => {
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
                    VIA Design System
                </Heading>
                <Heading 
                    as="h2" 
                    size="6"
                    style={{ marginBottom: "var(--space-2)" }}
                >
                    Problem
                </Heading>
                <Text size="4">
                    Until recently, every app at Vertex was created by a single developer, 
                    without common design elements or patterns and utilizing a variety of 
                    front-end component systems. This created hundreds of unique interfaces 
                    which made it difficult on users and adds cognitive load onto their 
                    cross-app tasks.
                </Text>
                <Image 
                    src="/vertex/via/Problem-App-Snowflakess.png" 
                    alt="Description of how every app is like a snowflake and teams are always reinventing the wheel" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={2500} 
                    height={1405}
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
                            <DataList.Item align="center">
                                <DataList.Label className={styles.dataListItemLabel}>
                                    Strategy
                                </DataList.Label>
                                <DataList.Value>
                                    I pitched, planned, and managed the creation of the VIA Design System.
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item align="center">
                                <DataList.Label className={styles.dataListItemLabel}>
                                    Team
                                </DataList.Label>
                                <DataList.Value>
                                    2 UX Designers, 3 Front-End Engineers
                                </DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Challenges</Heading>
                        <Text size="3">
                            Despite this project being extremely important for the business, there were only 
                            a handful of designers and developers working on VIA part-time through the alpha 
                            and early beta.
                        </Text>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Impact</Heading>
                        <Text size="3">
                            Having just implemented the system, we are working on gathering metrics but initially 
                            engineers have mentioned they <i>“like using VIA more than Google Material Design”</i>
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
                        marginBottom: "var(--space-6)" 
                    }}
                >
                    History
                </Heading>
                <Grid 
                    columns={{ initial: "1", md: "2" }}
                    gap="8" 
                    width="auto"
                    style={{ 
                        marginBottom: "var(--space-6)" 
                    }}
                >
                    <Flex gap="3" direction="column">
                        <Flex gap="3" direction="column">
                            <Heading as="h3" size="4">Early Work before 2017</Heading>
                            <Text size="3">
                                Many legacy apps exist that were created in Cold Fusion, Sencha extjs, and Bootstrap.
                            </Text>
                        </Flex>
                        <Image 
                            src="/vertex/via/Early+Work.png" 
                            alt="Screenshots of early work before 2017" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1150}
                        />
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Flex gap="3" direction="column">
                            <Heading as="h3" size="4">Work since 2017</Heading>
                            <Text size="3">
                                Utilized Google Material Design but was too flexible, not flexible enough, was subject to 
                                updates outside our control, and did not meet the needs of scientific solutions.
                            </Text>
                        </Flex>
                        <Image 
                            src="/vertex/via/Past+Projects.png" 
                            alt="Screenshots of apps since 2017" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1334}
                        />
                    </Flex>
                </Grid>
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
                    VIA Principles
                </Heading>
                <Grid 
                    columns={{ initial: "1", md: "3" }}
                    gap="5" 
                    width="auto"
                >
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Modularity & Flexibility</Heading>
                        <Text size="3">
                            The system’s modularity ensures maximum flexibility in execution. Its components 
                            are designed to work seamlessly with each other, in whichever combination suits 
                            the needs of the user’s process and workflow.
                        </Text>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Focused on User Outcomes</Heading>
                        <Text size="3">
                            Keep focused on user outcomes, not features because users are the stars of the 
                            show and working to solve users' problems are the first priority. Users for VIA 
                            include designers, engineers, and of course the end users executing on our core 
                            business needs.
                        </Text>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Heading as="h3" size="4">Performance & Consistency</Heading>
                        <Text size="3">
                            Every element and component of VIA was designed from the ground up to work 
                            elegantly together to ensure consistency, accessibility, increase the performance 
                            of Vertex employees and provide cohesive user experiences. By fostering familiarity, 
                            VIA increases confidence and trust with both new and repeat users.
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
                    Framework Agnostic
                </Heading>
                <Text size="4">
                    I decided to utilize web components to create the design system components since they are 
                    not tied to a specific front-end framework. 
                </Text>
                <Image 
                    src="/vertex/via/VIA-Frameworks.png" 
                    alt="Diagram of how web components are framework agnostic" 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={2500} 
                    height={1253}
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
                    Documentation Site for VIA
                </Heading>
                <Text 
                    size="4"
                >
                    ~50% of the documentation is automated based on component props
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
                        <Image 
                            src="/vertex/via/Elements.png" 
                            alt="Diagram of how web components are framework agnostic" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1335}
                        />
                        <Text size="2">
                            Landing Pages have tiles describing each component.
                        </Text>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Image 
                            src="/vertex/via/Button-Examples.png" 
                            alt="Diagram of how web components are framework agnostic" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1333}
                        />
                        <Text size="2">
                            Each component shows each state and the relevant code examples.
                        </Text>
                    </Flex>
                    <Flex gap="3" direction="column">
                        <Image 
                            src="/vertex/via/Button-Props.png" 
                            alt="Diagram of how web components are framework agnostic" 
                            className={styles.imageresponsive} 
                            layout="responsive" 
                            width={2500} 
                            height={1333}
                        />
                        <Text size="2">
                            All of the properties can be referenced for engineers.
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
                    Governance
                </Heading>
                <Text size="4">
                    To gain traction for VIA, we needed a mechanism for contribution. We added forms 
                    to request new features and report bugs.
                </Text>
                <Image 
                    src="/vertex/via/VIA+Governance+-+New+Feature+Request.jpg" 
                    alt="Diagram of the request process." 
                    className={styles.imageresponsive} 
                    layout="responsive" 
                    width={2500} 
                    height={2104}
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
                    Design guidelines
                </Heading>
                <Grid 
                    columns={{ initial: "1", md: "3" }}
                    gap="5" 
                    width="auto"
                    style={{ 
                        marginTop: "var(--space-4)",
                    }}
                >
                    <Image 
                        src="/vertex/via/VIA-Guidelines-Capitalization.jpg" 
                        alt="Guidelines for capitalization" 
                        className={styles.imageresponsive} 
                        layout="responsive" 
                        width={990} 
                        height={4088}
                    />
                    <Image 
                        src="/vertex/via/Guidelines-Colors.jpg" 
                        alt="Guidelines for colors" 
                        className={styles.imageresponsive} 
                        layout="responsive" 
                        width={990} 
                        height={4088}
                    />
                    <Image 
                        src="/vertex/via/Guidelines-Buttons.jpg" 
                        alt="Guidelines for buttons" 
                        className={styles.imageresponsive} 
                        layout="responsive" 
                        width={990} 
                        height={4088}
                    />
                </Grid>
            </Container>
        </>
    );
};

export default Via;