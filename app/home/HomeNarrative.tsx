import { Flex, Section, Text } from '@radix-ui/themes';
import InlineLink from "@/ui/InlineLink";

export default function HomeNarrative() {
    return (
        <Section py="4">
            <Flex direction="column" gap="4">
                <Text as="p" size="3">
                    Currently, Jason oversees design quality, consistency of experiences, and processes across the Klaviyo design team. 
                    He is also responsible for international expansion, the design system, core business initiatives to drive adoption 
                    and growth, and serving as the design representative at PRD reviews.
                </Text>
                <Text as="p" size="3">
                    At <InlineLink label="Klaviyo" url="/klaviyo" />, Jason established the design system and content design functions 
                    of the design team and orchestrated the creation and implementation of the 
                    Ascent Design System (<i><small>React</small></i>). He 
                    successfully developed a mature system rapidly while transforming the app simultaneously to include modern patterns, 
                    empowering Klaviyo's future.
                </Text>
                <Text as="p" size="3">
                    Before Klaviyo, Jason led the design team at <InlineLink label="Vertex Pharmaceuticals" url="/vertex" />, 
                    where he created the VIA Design System (<i><small>Web components</small></i>). This system transformed hundreds of homegrown 
                    applications into larger platforms, enabling scientific discovery, analysis, clinical trials, deal tracking, financial management, 
                    and other core business needs.
                </Text>
                <Text as="p" size="3">
                    At <InlineLink label="Collaborative Consulting" url="/collaborative" />, Jason 
                    led a team of consultants in delivering digital transformation and exceptional experiences for companies in various industries, 
                    including e-commerce, finance, franchising, and insurance. He built an “accelerator” in AngularJS, pre-design systems, to 
                    prototype solutions for sales and enhance engineering efficiency on client projects.
                </Text>
                <Text as="p" size="3">
                    At <InlineLink label="Dassault Systèmes" url="/dassault" />, Jason 
                    created roadmaps, plans, designs, GTM support, and a multi-product strategy to support the vision to empower architects, engineers, 
                    and contractors with a data first 3D solution. The first product, <InlineLink label="Integrated Planning" url="/dassault/work" />, 
                    was the beginning of twelve envisioned products designed to address complex architecture challenges.
                </Text>
                <Text as="p" size="3">
                    Prior to product design, I was a technologist at various architecture firms driving the transformation from 2D plans to 3D 
                    Building Information Modeling which enhanced the design and delivery of Architecture, Engineering and Construction. 
                </Text>
                <Text as="p" size="3">
                    Connect with Jason to explore how his expertise can elevate your team and business.
                </Text>
            </Flex>
        </Section>
    )
}

