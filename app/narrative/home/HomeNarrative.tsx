import { Flex, Heading, Link, Section, Text } from '@radix-ui/themes';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import InlineLink from "@/ui/narrative/InlineLink";

export default function HomeNarrative() {
    return (
        <Section py="4">
            <Flex direction="column" gap="5">
                <Flex direction="column" gap="1">
                    <Heading as="h2" size="4">Optimizing design, elevating systems and processes</Heading>
                    {/* <Text as="p" size="3">
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
                    </Text> */}
                    <Text as="p" size="3">
                        Jason has played a pivotal role in driving <InlineLink label="Klaviyo's" url="/narrative/klaviyo" /> 8x revenue growth and its 
                        successful IPO. He oversees design quality, consistency of experiences, and processes across the design team while also ensuring 
                        that our design system meets the highest standards and aligns with the best in the industry. His responsibilities extend 
                        to <InlineLink label="International" url="/narrative/klaviyo/work/internationalization" /> expansion, core business initiatives to drive 
                        adoption and growth, and serving as the design representative at PRD reviews. Jason established the design system 
                        and content design functions, leading the creation and implementation of the <InlineLink label="Ascent Design System" url="/narrative/klaviyo/work/ascentdesignsystem" />
                        (<i><small>React</small></i>), which rapidly matured and transformed the app to include modern patterns, positioning Klaviyo for continued success.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h2" size="4">Educating tomorrow’s designers, nurturing today’s</Heading>
                    <Text as="p" size="3">
                        Jason served as an Adjunct Professor at <Link href='https://www.endicott.edu/' target="_blank">Endicott College <ExternalLinkIcon /></Link>, 
                        where he taught sophomores and juniors the principles of user experience design for web and mobile platforms. In addition to his teaching role, 
                        he actively mentors on <Link href='https://adplist.org/mentors/jason-grant' target="_blank">ADPList <ExternalLinkIcon /></Link>, conducting 
                        64 sessions (<i><small>1,920 minutes</small></i>) focused on career guidance, portfolio reviews, design system feedback, and various other 
                        design-related topics. Jason was also a freelance for <Link href='https://www.techtarget.com/contributor/Jason-Grant' target="_blank">TechTarget <ExternalLinkIcon /></Link> &nbsp;
                        on topics surrounding UX and technology.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h2" size="4">Establishing a design practice, building platforms</Heading>
                    <Text as="p" size="3">
                        Before Klaviyo, Jason established the design team at <InlineLink label="Vertex Pharmaceuticals" url="/narrative/vertex" />,
                        where he created the <InlineLink label="VIA Design System" url="/narrative/vertex/work/via" /> (Web components). This system 
                        transformed hundreds of homegrown applications into larger platforms, enabling scientific discovery, analysis, 
                        clinical trials, deal tracking, financial management, and other core business needs. He also spearheaded the 
                        <InlineLink label="Lab of Our Future" url="/narrative/vertex/work/loof" /> initiative and the 
                        <InlineLink label="Vertex Informatics Platform" url="/narrative/vertex/work/vip" />, both of which utilized the 
                        VIA Design System to drive innovation and streamline processes.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h2" size="4">Driving business transformation, accelerating delivery</Heading>
                    <Text as="p" size="3">
                        At <InlineLink label="Collaborative Consulting" url="/narrative/collaborative" />, Jason 
                        led teams of consultants in delivering digital transformation and exceptional experiences for companies in various industries, 
                        including e-commerce, finance, franchising, and insurance. He built an “accelerator” in AngularJS, pre-design systems, to 
                        prototype solutions for sales and enhance engineering efficiency on client projects.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h2" size="4">Breaking into industry, crafting distinctive advantages</Heading>
                    <Text as="p" size="3">
                        At <InlineLink label="Dassault Systèmes" url="/narrative/dassault" />, Jason 
                        created roadmaps, plans, designs, GTM support, and a multi-product strategy to support the vision to empower architects, engineers, 
                        and contractors with a data first 3D solution. The first product, <InlineLink label="Integrated Planning" url="/narrative/dassault/work" />, 
                        was the beginning of twelve envisioned products designed to address complex architecture, engineering, and construction challenges.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h2" size="4">Transforming processes, enabling precision collaboration </Heading>
                    <Text as="p" size="3">
                        Prior to product design, I was a technologist at various architecture firms driving the transformation from 2D plans to 3D 
                        Building Information Modeling which enhanced the design and delivery of Architecture, Engineering and Construction projects. 
                    </Text>
                </Flex>
                <Text as="p" size="3">
                    <InlineLink label="Connect with Jason" url="/narrative/contact" /> to explore how his expertise can elevate your team and business.
                </Text>
            </Flex>
        </Section>
    )
}

