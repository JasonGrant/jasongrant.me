"use client"

import { useRouter } from 'next/navigation'
import WorkCard from '@/ui/WorkCard';
import { Em, Flex, Text, Heading, ScrollArea } from '@radix-ui/themes';

export default function VertexWorkPage() {
    const router = useRouter();

    return (
        <ScrollArea type="auto" scrollbars="vertical" size="2" radius="full" style={{ height: `100%` }}>
            <Flex direction="column" gap="4" overflow="scroll" pr="6" pb="9">
                <Heading as="h2" size="6">Projects</Heading>
                <WorkCard
                    imageUrl="/vertex/loof/Loof-Vision.jpg"
                    imageAltText="Image representing the vision for Lab of Our Future"
                    linkUrl='/vertex/work/loof'
                    linkType='internal'
                >
                    <Heading as="h3" size="3">
                        Lab of Our Future
                    </Heading>
                    <Text as="p" size="3">
                        Revolutionizing drug discovery through cutting-edge technologies and data-driven approaches. 
                        By streamlining workflows and enhancing collaboration, we’re advancing more efficient drug 
                        development, accelerating the path to breakthrough therapies that improve patient outcomes.
                    </Text>
                </WorkCard>
                <WorkCard
                    imageUrl="/vertex/via/VIA-Design-Ssystem-Mockup-Cropped.jpg"
                    imageAltText="Image representing the VIA Design System"
                    linkUrl='/vertex/work/via'
                    linkType='internal'
                >
                    <Heading as="h3" size="3">
                        VIA Design System
                    </Heading>
                    <Text as="p" size="3">
                        Created to enhance consistency, speed of delivery, and quality of employee experience. 
                        VIA was a comprehensive design system that included design principles, components, patterns, 
                        and guidelines for both business and scientific applications.
                    </Text>
                </WorkCard>
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
                        Developed a new platform to streamline the drug discovery process, integrating high throughput 
                        screening and informatics analysis for enhanced efficiency and precision.
                    </Text>
                </WorkCard>
                <WorkCard
                    imageUrl="/vertex/ci/CompetitiveIntelligenceVision.jpg"
                    imageAltText="Vision sketch for Competitive Intelligence Platform"
                    linkUrl='/vertex/work/ci'
                    linkType='internal'
                >
                    <Heading as="h3" size="3">
                        Competitive Intelligence Platform
                    </Heading>
                    <Text as="p" size="3">
                        Created a transparent and efficient process for gathering and sharing critical market insights, 
                        replacing a previously siloed approach. By developing a custom SharePoint solution, we ensured 
                        streamlined access to up-to-date intelligence, reducing redundancies and enhancing strategic 
                        decision-making.
                    </Text>
                </WorkCard>
                <Flex direction="column" gap="1">
                    <Heading as="h2" size="6">Outside interests</Heading>
                    <Text as="p" size="2">
                        <Em>Activities during Jason's time at Vertex</Em>
                    </Text>
                </Flex>
                <WorkCard
                    imageUrl="/aaron-burden-y02jEX_B0O0-unsplash.jpg"
                    imageAltText="Vision sketch for Competitive Intelligence Platform"
                    linkUrl='https://www.techtarget.com/contributor/Jason-Grant'
                    linkType='external'
                >
                    <Heading as="h3" size="3">
                        TechTarget (Freelance Author)
                    </Heading>
                    <Text as="p" size="3">
                        Leading provider of specialized online content and marketing services, connecting technology 
                        buyers with in-depth insights and resources to guide informed purchasing decisions.
                    </Text>
                </WorkCard>
                <WorkCard
                    imageUrl="/kane-reinholdtsen-LETdkk7wHQk-unsplash.jpg"
                    imageAltText="Vision sketch for Competitive Intelligence Platform"
                    linkUrl='https://www.linkedin.com/in/mrjasongrant/overlay/1570193156942/single-media-viewer/?profileId=ACoAAAKByegB73Ip6nImB2lfTJmDi3ILV0JqVnY'
                    linkType='external'
                >
                    <Heading as="h3" size="3">
                        Connect.tech Conference (Speaker)
                    </Heading>
                    <Text as="p" size="3">
                        Talk focuses on demystifying UX for engineers by providing them with foundational knowledge of 
                        UX design, empowering them to collaborate more effectively and contribute to creating intuitive, 
                        user-friendly products.
                    </Text>
                </WorkCard>
            </Flex>
        </ScrollArea>
    );
}