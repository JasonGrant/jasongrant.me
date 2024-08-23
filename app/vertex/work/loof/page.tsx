import { Em, Flex, Heading, Text } from '@radix-ui/themes';
import WorkCard from '@/ui/WorkCard';
import Image from 'next/image';
import styles from './page.module.css';

export default function VertexWorkLoofPage() {

    return (
        <Flex direction="column" gap="4" pb="7">
            <Heading as="h2" size="6">Lab of Our Future</Heading>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Problem</Heading>
                <Text as="p" size="3">
                    The last 30 years of rapid innovation and technology advances has resulted in fragmented
                    data and integration issues. The tech debt is limiting the ability to innovate and drive
                    the future of the drug discovery process.
                </Text>
                <Image src="/vertex/via/VIA-Ecosystem.png" alt="Diagram showing hundreds of interconnected apps" className={styles.imageresponsive} width={2368} height={1762}/>
                <Text as="p" size="2">
                    <Em>A diagram illustrating the applications utilized by departments to support the drug discovery process.</Em>
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Vision</Heading>
                <Text as="p" size="3">
                    Revolutionizing drug discovery through cutting-edge technologies and data-driven approaches. 
                    By streamlining workflows and enhancing collaboration, we’re advancing more efficient drug 
                    development, accelerating the path to breakthrough therapies that improve patient outcomes.
                </Text>
                <Image src="/vertex/loof/Loof-Vision.jpg" alt="Illustration showing the vision of Lab of Our Future" className={styles.imageresponsive} width={500} height={282}/>
                <Text as="p" size="2">
                    <Em>
                        Jason developed this vision sketch in collaboration with company and R&D leadership to 
                        secure organization-wide understanding and support.
                    </Em>
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">One of the initiative projects</Heading>
                <WorkCard
                    imageUrl="/vertex/vip/VIP-HTS-Mockup.jpg"
                    imageAltText="Logo for Behind the Pixels blog"
                    linkUrl='/vertex/work/vip'
                    linkType='internal'
                >
                    <Heading as="h3" size="3">
                        Vertex Informatics Platform
                    </Heading>
                    <Text as="p" size="3">
                        Developed a new platform to streamline the drug discovery process.
                    </Text>
                </WorkCard>
            </Flex>
        </Flex>
    );
}