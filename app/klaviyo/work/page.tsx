"use client"

import { useRouter } from 'next/navigation'
import WorkCard from '@/ui/WorkCard';
import { Flex, Text, Heading } from '@radix-ui/themes';

export default function KlaviyoWorkPage() {
    const router = useRouter();

    return (
        <Flex direction="column" gap="4">
            <WorkCard
                imageUrl="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                imageAltText="Image representing a design system"
                linkUrl='https://www.ascentdesignsystem.com/'
                linkType='external'
            >
                <Heading as="h3" size="3">
                    Ascent Design System
                </Heading>
                <Text as="p" size="3">
                    Empowering designers and engineers to build high quality and 
                    cohesive experiences while accelerating the pace of creation 
                    and innovation.
                </Text>
            </WorkCard>
            <WorkCard
                imageUrl="/datasciencepodcast.png"
                imageAltText="Logo for the Data Science Podcast"
                linkUrl='https://medium.com/klaviyo-data-science/klaviyo-data-science-podcast-ep-38-are-you-going-to-science-fair-345b498508ff'
                linkType='external'
            >
                <Heading as="h3" size="3">
                    Klaviyo Science Fair
                </Heading>
                <Text as="p" size="3">
                    Presenting technical work is not something you automatically 
                    learn how to do, it has to be learned and practiced, and 
                    opportunities to practice it can be hard to find.
                </Text>
            </WorkCard>
            <WorkCard
                imageUrl="/BehindThePixels.jpg"
                imageAltText="Logo for Behind the Pixels blog"
                linkUrl='https://medium.com/klaviyo-design/behind-the-pixels-4a3d145d0e01'
                linkType='external'
            >
                <Heading as="h3" size="3">
                    Building the Design System
                </Heading>
                <Text as="p" size="3">
                    Behind the Pixels is a conversational blog series that aims to give a glimpse into the work & life of being a designer at Klaviyo
                </Text>
            </WorkCard>
        </Flex>
    );
}