"use client"

import { useRouter } from 'next/navigation'
import WorkCard from '@/ui/WorkCard';
import { Flex, Text, Heading } from '@radix-ui/themes';

export default function KlaviyoWorkPage() {
    const router = useRouter();

    return (
        <Flex direction="column" gap="4">
            <WorkCard
                imageUrl="/logos/AscentLogo.jpg"
                imageAltText="Image representing a design system"
                linkUrl='/klaviyo/work/ascentdesignsystem'
                linkType='internal'
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
                imageUrl="/logos/Translation.jpg"
                imageAltText="Image representing a design system"
                linkUrl='/klaviyo/work/internationalization'
                linkType='internal'
            >
                <Heading as="h3" size="3">
                    Internationalization and Localization
                </Heading>
                <Text as="p" size="3">
                    Led the transformation of the platform from an English US-centric product to a globally accessible app, 
                    successfully localizing it into multiple languages and expanding its reach to a diverse international audience.
                </Text>
            </WorkCard>
            <WorkCard
                imageUrl="/klaviyo/datasciencepodcast.png"
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
                imageUrl="/klaviyo/BehindThePixels.jpg"
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