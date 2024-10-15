import { Em, Flex, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './page.module.css';

export default function VertexWorkLoofPage() {

    return (
        <Flex direction="column" gap="4" pb="7">
            <Heading as="h2" size="6">Vertex Informatics Platform</Heading>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Problem</Heading>
                <Text as="p" size="3">
                    To determine why a relatively new application for high-throughput screening 
                    was failing in user adoption and to look at expanding to include informatics
                    around the screening campaigns and compound selection.
                </Text>
                {/* <Image src="/vertex/via/VIA-Ecosystem.png" alt="Diagram showing hundreds of interconnected apps" className={styles.imageresponsive} width={2368} height={1762}/>
                <Text as="p" size="2">
                    <Em>A diagram illustrating the applications utilized by departments to support the drug discovery process.</Em>
                </Text> */}
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Solution</Heading>
                <Text as="p" size="3">
                    After thoroughly analyzing the scientist journey, the 24 applications required for the end-to-end process, and the lack of visibility, it became clear that achieving the vision of simplifying this complex workflow while enabling accurate, automated reporting and enhanced analytics required a strategic solution. We expanded the original framework to consolidate data and processes into a single, unified platform, streamlining operations and improving overall efficiency and insight.
                </Text>
                <Flex direction="column" gap="6">
                    <Image src="/vertex/vip/VIP-HTS-Decks.png" alt="Illustration showing the vision of Lab of Our Future" className={styles.imageresponsive} width={500} height={282}/>
                    <Image src="/vertex/vip/VIP-HTS-Plates.png" alt="Illustration showing the vision of Lab of Our Future" className={styles.imageresponsive} width={500} height={282}/>
                    <Image src="/vertex/vip/VIP-HTS-Plate.png" alt="Illustration showing the vision of Lab of Our Future" className={styles.imageresponsive} width={500} height={282}/>
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