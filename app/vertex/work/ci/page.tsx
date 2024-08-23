import { Em, Flex, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './page.module.css';

export default function VertexWorkCiPage() {

    return (
        <Flex direction="column" gap="4" pb="7">
            <Heading as="h2" size="6">Competitive Intelligence Platform</Heading>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Problem</Heading>
                <Text as="p" size="3">
                    The previous CEO centralized all Competitive Intelligence based on personal knowledge, 
                    relationships, and institutional insights. The new CEO recognized that this approach 
                    led to missed intelligence and redundant efforts, with multiple people independently 
                    uncovering the same information. The request was to establish a transparent process 
                    for the collection and sharing of Competitive Intelligence.
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Vision</Heading>
                <Image src="/vertex/ci/CompetitiveIntelligenceVision.jpg" alt="Vision sketch" className={styles.imageresponsive} width={2368} height={1762}/>
                <Text as="p" size="2">
                    <Em>Vision sketch created by Jason to depict the solution in a single view.</Em>
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Solution</Heading>
                <Text as="p" size="3">
                    After conducting C-level interviews, thematic data summaries, tech assessments, and 
                    workflow analysis, we determined that a custom solution built on SharePoint would 
                    provide the most efficient and rapid path to address the identified needs.
                </Text>
                <Flex direction="column" gap="6">
                    <Image src="/vertex/ci/CompetitiveIntelligenceDashboard.jpg" alt="Competitive Intelligence Design of Dashboard" className={styles.imageresponsive} width={500} height={282}/>
                    <Image src="/vertex/ci/CompetitiveIntelligenceReports.jpg" alt="Competitive Intelligence Design of Reports" className={styles.imageresponsive} width={500} height={282}/>
                </Flex>
                {/* <Text as="p" size="2">
                    <Em>
                        Jason developed this vision sketch in collaboration with company and R&D leadership to 
                        secure organization-wide understanding and support.
                    </Em>
                </Text> */}
            </Flex>
        </Flex>
    );
}