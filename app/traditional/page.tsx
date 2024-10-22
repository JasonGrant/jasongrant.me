import React from 'react';
import { Button, Container, DataList, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link'
import styles from "./page.module.css";

const Home: React.FC = () => {
    return (
        <>
            <Container 
                size="4"
                style={{ 
                    marginBottom: "var(--space-4)",
                    padding: "var(--space-6)",
                }}
                className={styles.linkOverride}
            >
                <Grid 
                    columns={{ initial: "1", md: "2" }}
                    gapX="5"
                    gapY="8" 
                    width="auto"
                    style={{ 
                        marginTop: "var(--space-4)",
                    }}
                >
                    <Link 
                        href="/traditional/work/klaviyo/ascent"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/klaviyo/Ascent-ComponentsPage.png" 
                                alt="Ascent Design System site screenshot" 
                                className={`${styles.imageOverrides} ${styles.whiteImageContainer}`} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                                className={styles.textOverrides} 
                            >
                                Ascent Design System
                            </Heading>
                            <Text size="2" >
                                Klaviyo
                            </Text>
                            <Text size="3" >
                                The Ascent Design System empowers teams to deliver consistent and scalable 
                                user experiences across Klaviyo’s platform by providing reusable components, 
                                design patterns, and guidelines. It streamlines development, improves 
                                collaboration between designers and engineers, and supports rapid iteration 
                                while maintaining high standards for accessibility and performance.
                            </Text>
                        </Flex>
                    </Link>
                    <Link 
                        href="/traditional/work/klaviyo/i18n"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/klaviyo/klaviyo-marketing-french.png" 
                                alt="Vision image of Lab of Our Future"
                                className={`${styles.imageOverrides} ${styles.whiteImageContainer}`} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                            >
                                Internationalization (i18n) Initiative
                            </Heading>
                            <Text size="2">
                                Klaviyo
                            </Text>
                            <Text size="3">
                                Focuses on expanding Klaviyo’s platform to support global markets by enabling 
                                multi-language functionality, localization (l10n) of content, and region-specific 
                                user experiences. This initiative enhances the platform’s accessibility and 
                                usability for international users, allowing for seamless adaptation to diverse 
                                cultural and linguistic needs while maintaining consistency across regions.
                            </Text>
                        </Flex>
                    </Link>
                    <Link 
                        href="/traditional/work/klaviyo/requests"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/klaviyo/Ascent-Portal-Backlog-ProductBoard.png" 
                                alt="Dashboard of Ascent Design System requests"
                                className={`${styles.imageOverrides} ${styles.whiteImageContainer}`} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                            >
                                Ascent Request Process
                            </Heading>
                            <Text size="2">
                                Klaviyo
                            </Text>
                            <Text size="3">
                                The Ascent Design System request process evolved from unstructured Slack messages and 
                                manual spreadsheets to a fully automated workflow using Google Forms, Zapier, and Jira 
                                for efficient tracking and prioritization. This transformation streamlined collaboration, 
                                increased transparency, and aligned with company-wide planning tools for better long-term 
                                planning and execution.
                            </Text>
                        </Flex>
                    </Link>
                    <Link 
                        href="/traditional/work/klaviyo/f2p"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/klaviyo/F2P.png" 
                                alt="Image of the free to paid experiment"
                                className={`${styles.imageOverrides} ${styles.whiteImageContainer}`} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                            >
                                Optimizing Conversions
                            </Heading>
                            <Text size="2">
                                Klaviyo
                            </Text>
                            <Text size="3">
                                This project aimed to boost free-to-paid conversions through experiments on value 
                                propositions and plan usage visibility. The value proposition test significantly 
                                increased conversions and was moved to General Availability, while the usage-based 
                                experiment negatively impacted conversions and was ended early. These findings help 
                                refine future upgrade strategies.
                            </Text>
                        </Flex>
                    </Link>
                    <Link 
                        href="/traditional/work/vertex/via"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/vertex/via/VIA-Design-Ssystem-Mockup.jpg" 
                                alt="Mockup of VIA Design System" 
                                className={styles.imageOverrides} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                                className={styles.textOverrides} 
                            >
                                VIA Design System
                            </Heading>
                            <Text size="2" >
                                Vertex Pharmaceuticals
                            </Text>
                            <Text size="3" >
                                Enables Vertex to create consistent, efficient user experiences by 
                                unifying hundreds of unique interfaces into a framework-agnostic 
                                system. This reduces cognitive load for users working across multiple 
                                apps and streamlines development for designers and engineers, 
                                fostering flexibility, consistency, and improved performance across 
                                scientific, clinical trial, and business solutions.
                            </Text>
                        </Flex>
                    </Link>
                    <Link 
                        href="/traditional/work/vertex/loof"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/vertex/loof/LoOF-Overview-Rev2.jpg" 
                                alt="Vision image of Lab of Our Future"
                                className={`${styles.imageOverrides} ${styles.whiteImageContainer}`} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                            >
                                Lab of Our Future
                            </Heading>
                            <Text size="2">
                                Vertex Pharmaceuticals
                            </Text>
                            <Text size="3">
                                Enables scientists to access previously fragmented data, reducing manual 
                                work through automation and machine learning, while addressing tech debt 
                                that limits innovation. By streamlining hundreds of applications and 
                                simplifying workflows, this initiative supports future advancements in 
                                drug discovery and improves data integration across complex systems.
                            </Text>
                        </Flex>
                    </Link>
                    <Link 
                        href="/traditional/work/vertex/ci"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/vertex/ci/CI+Vision+V5.jpg" 
                                alt="Vision image of Competitive Intelligence" 
                                className={`${styles.imageOverrides} ${styles.whiteImageContainer}`}  
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                            >
                                Competitive Intelligence
                            </Heading>
                            <Text size="2">
                                Vertex Pharmaceuticals
                            </Text>
                            <Text size="3">
                                Goal was to replace an inefficient, manual process for gathering 
                                and sharing insights with an automated system. Through rapid 
                                development, including C-suite interviews and thematic analysis, 
                                the solution streamlined the collection and dissemination of 
                                competitive intelligence, improved transparency, and significantly 
                                reduced the time needed to deliver critical insights to 
                                decision-makers.
                            </Text>
                        </Flex>
                    </Link>
                    <Link 
                        href="/traditional/work/vertex/vip"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/vertex/vip/VIP-HTS-Mockup.jpg" 
                                alt="Integrated Planning Desktop App" 
                                className={styles.imageOverrides} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                            >
                                Vertex Informatics Platform
                            </Heading>
                            <Text size="2">
                                Vertex Pharmaceuticals
                            </Text>
                            <Text size="3">
                                A platform that enables scientists to explore and analyze data, 
                                and to collaborate on research projects. Addressed low user 
                                adoption of a high-throughput screening app and expanded its 
                                capabilities. Through research and user feedback, the team 
                                reduced app complexity, regained user trust, and streamlined 
                                processes, cutting the number of required applications and 
                                enhancing decision-making for over 700,000 compounds.
                            </Text>
                        </Flex>
                    </Link>
                </Grid>
            </Container>
            <Container 
                size="4"
                style={{ 
                    marginBottom: "var(--space-4)",
                    padding: "var(--space-6)",
                }}
                className={styles.linkOverride}
            >
                <Grid 
                    columns={{ initial: "1", md: "3" }}
                    // gapX="5"
                    gapY="4" 
                    width="auto"
                    style={{ 
                        marginTop: "var(--space-4)",
                    }}
                >
                    <Link 
                        href="/traditional/work/dassault/integratedplanning"
                    >
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.caseStudyContainer}
                        >
                            <Image 
                                src="/dassault/DS_University-Mockup-Cropped.jpeg" 
                                alt="Integrated Planning Desktop App" 
                                className={styles.imageOverrides} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                            >
                                Integrated Planning App
                            </Heading>
                            <Text size="2">
                                Dassault Systèmes
                            </Text>
                            <Text size="3">
                                Empowers Architects to quickly conceptualize the shape of a building’s envelope and plan the interior spaces to accommodate the client requirements.
                            </Text>
                        </Flex>
                    </Link>
                        <Flex 
                            gap="3" 
                            direction="column" 
                            className={styles.projectContainer}
                        >
                            <Image 
                                src="/collaborative/accelerator/eiep-mockup02.jpg" 
                                alt="M3 Accelerator" 
                                className={styles.imageOverrides} 
                                layout="responsive" 
                                width={600} 
                                height={450}
                            />
                            <Heading 
                                as="h3" 
                                size="4"
                            >
                                M3 Design System
                            </Heading>
                            <Text size="2">
                                Collaborative Consulting | Internal Tooling
                            </Text>
                            <Text size="3">
                                Before design systems were coined, I designed and launched the M3 accelerator with User Experience (UX), User Interface (UI), and best practices built into the code and templates. It increased customer satisfaction, reduced risks and reduced development time.
                            </Text>
                        </Flex>
                    <Flex 
                        gap="3" 
                        direction="column" 
                        className={styles.projectContainer}
                    >
                        <Image 
                            src="/collaborative/portal/C2-Mockup02.jpg" 
                            alt="Business Acceleration Portal" 
                            className={styles.imageOverrides} 
                            layout="responsive" 
                            width={600} 
                            height={450}
                        />
                        <Heading 
                            as="h3" 
                            size="4"
                        >
                            Business Acceleration Portal
                        </Heading>
                        <Text size="2">
                            Collaborative Consulting | Internal Tooling
                        </Text>
                        <Text size="3">
                            C2 is a portal to centralize and drive business and digital solutions by providing accelerators, methodologies and toolkits.
                        </Text>
                    </Flex>
                    <Flex 
                        gap="3" 
                        direction="column" 
                        className={styles.projectContainer}
                    >
                        <Image 
                            src="/collaborative/accelerator/fapro-Mockup.jpg" 
                            alt="Integrated Planning Space Planner iPad app" 
                            className={styles.imageOverrides} 
                            layout="responsive" 
                            width={600} 
                            height={450}
                        />
                        <Heading 
                            as="h3" 
                            size="4"
                        >
                            Sales Demos with coded prototypes
                        </Heading>
                        <Text size="2">
                            Collaborative Consulting | Sales Demos
                        </Text>
                        <Text size="3">
                            Utilized the UI accelerator to create dynamic sales demos, which helped secure significantly more projects by showcasing fast, customizable solutions to potential clients.
                        </Text>
                    </Flex>
                    <Flex 
                        gap="3" 
                        direction="column" 
                        className={styles.projectContainer}
                    >
                        <Image 
                            src="/collaborative/ruelala/RueLaLa-Mockup01.jpg" 
                            alt="Mockup" 
                            className={styles.imageOverrides} 
                            layout="responsive" 
                            width={600} 
                            height={450}
                        />
                        <Heading 
                            as="h3" 
                            size="4"
                        >
                            Catalog Acquisition, Fulfillment, & Payment System
                        </Heading>
                        <Text size="2">
                            Collaborative Consulting | Client Project
                        </Text>
                        <Text size="3">
                            Designed a system to scrape catalogs from all high-end fashion companies, normalize the data, break orders into multiple fragments by company, utilize a mechanical turk for ordering, and temporary credit cards for each order.
                        </Text>
                    </Flex>
                    <Flex 
                        gap="3" 
                        direction="column" 
                        className={styles.projectContainer}
                    >
                        <Image 
                            src="/collaborative/MAFLC-Cropped.jpg" 
                            alt="H2A/H2B Visa Processing Mockup" 
                            className={styles.imageOverrides} 
                            layout="responsive" 
                            width={600} 
                            height={450}
                        />
                        <Heading 
                            as="h3" 
                            size="4"
                        >
                            H2A/H2B Visa Processing
                        </Heading>
                        <Text size="2">
                            Collaborative Consulting | Client Project
                        </Text>
                        <Text size="3">
                            Foreign Labor Certification for State of Massachusetts H2A and H2B Visas. I digitalized what was historically a fully paper process for businesses to request foreign workers, state review/inspections, and for all to visualize the process of evaluation.
                        </Text>
                    </Flex>
                    <Flex 
                        gap="3" 
                        direction="column" 
                        className={styles.projectContainer}
                    >
                        <Image 
                            src="/collaborative/wellington/PartnerPortal-Mockup02.jpg" 
                            alt="Mockup" 
                            className={styles.imageOverrides} 
                            layout="responsive" 
                            width={600} 
                            height={450}
                        />
                        <Heading 
                            as="h3" 
                            size="4"
                        >
                            Partner Portal
                        </Heading>
                        <Text size="2">
                            Collaborative Consulting | Client Project
                        </Text>
                        <Text size="3">
                            Wealth management firm partner portal for partners to manage their accounts, investments, company financials and reports.
                        </Text>
                    </Flex>
                    <Flex 
                        gap="3" 
                        direction="column" 
                        className={styles.projectContainer}
                    >
                        <Image 
                            src="/dassault/SpacePlanner-Mockup.jpg" 
                            alt="Integrated Planning Space Planner iPad app" 
                            className={styles.imageOverrides} 
                            layout="responsive" 
                            width={600} 
                            height={450}
                        />
                        <Heading 
                            as="h3" 
                            size="4"
                        >
                            Integrated Planning iPad App
                        </Heading>
                        <Text size="2">
                            Dassault Systèmes
                        </Text>
                        <Text size="3">
                            An iPad app that helps architects collaborate with clients to define space planning requirements, feeding into the full Integrated Planning app.
                        </Text>
                    </Flex>
                    <Flex 
                        gap="3" 
                        direction="column" 
                        className={styles.projectContainer}
                    >
                        <Image 
                            src="/collaborative/dunkin/FranchisePortal-Mockup01.jpg" 
                            alt="Mockup" 
                            className={styles.imageOverrides} 
                            layout="responsive" 
                            width={600} 
                            height={450}
                        />
                        <Heading 
                            as="h3" 
                            size="4"
                        >
                            Franchise Portal
                        </Heading>
                        <Text size="2">
                            Collaborative Consulting | Client Project
                        </Text>
                        <Text size="3">
                            Dunkin Donuts franchise portal for franchisees to manage their stores, special deals, equipment, and inventory.
                        </Text>
                    </Flex>
                </Grid>
            </Container>
        </>
    );
};

export default Home;