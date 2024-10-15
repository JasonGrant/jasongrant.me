import { Em, Flex, Heading, Text, ScrollArea } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './page.module.css';

export default function VertexWorkViaPage() {

    return (
        <ScrollArea type="auto" scrollbars="vertical" size="2" radius="full" style={{ height: `100%` }}>
            <Flex direction="column" gap="4" overflow="scroll" pr="6" pb="9">
                <Flex direction="column" gap="2">
                    <Heading as="h2" size="4">
                        VIA Design System
                    </Heading>
                    <Text as="p" size="3">
                        Vertex's internal global design system, VIA, was created to enhance consistency, speed 
                        of delivery, and quality of employee experience. VIA was a comprehensive design system 
                        that included design principles, components, patterns, and guidelines for both business 
                        and scientific applications.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Framework agnostic</Heading>
                <Text as="p" size="3">
                        Allows for flexibility in the future and since many apps already utilized multiple frameworks. 
                        The flexibility allowed for reduction in rework with the application transitions. 
                    </Text>
                    <Image src="/vertex/via/VIA-Frameworks.png" alt="Diagram shows web componens being used in Angular, Vue and React" className={styles.imageresponsive} width={500} height={282}/>
                    {/* <Text as="p" size="2">
                        <Em>
                            Jason developed this vision sketch in collaboration with company and R&D leadership to 
                            secure organization-wide understanding and support.
                        </Em>
                    </Text> */}
                </Flex>
                <Flex direction="column" gap="4">
                    <Heading as="h2" size="4">Sampling of documentation</Heading>
                    <Image src="/vertex/via/Button-Examples.png" alt="Diagram shows web componens being used in Angular, Vue and React" className={styles.imageresponsive} width={500} height={282}/>
                    <Image src="/vertex/via/Button-Props.png" alt="Diagram shows web componens being used in Angular, Vue and React" className={styles.imageresponsive} width={500} height={282}/>
                    <Image src="/vertex/via/VIA-Guidelines-Buttons.jpg" alt="Diagram shows web componens being used in Angular, Vue and React" className={styles.imageresponsive} width={500} height={282}/>
                </Flex>
                <Flex direction="column" gap="4">
                    <Heading as="h2" size="4">Sampling of projects</Heading>
                    <Image src="/vertex/via/Titer.png" alt="Diagram shows web componens being used in Angular, Vue and React" className={styles.imageresponsive} width={500} height={282}/>
                    <Image src="/vertex/vip/VIP-HTS-Plates.png" alt="Diagram shows web componens being used in Angular, Vue and React" className={styles.imageresponsive} width={500} height={282}/>
                </Flex>
            </Flex>
        </ScrollArea>
    );
}