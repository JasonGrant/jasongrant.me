import { Flex, ScrollArea, Heading, Text } from '@radix-ui/themes';

export default function KlaviyoImpactPage() {
    return (
        <Flex direction="column" gap="4" overflow="scroll" pr="6" pb="9">
            <Text as="p" size="3">
                As the Director of Product Design at Klaviyo, a newly public IPO company, 
                I spearheaded numerous strategic initiatives and operational enhancements to 
                elevate our product design to world-class standards. My primary 
                responsibilities and achievements included:
            </Text>
            <Flex direction="column" gap="1">
                <Heading as="h3" size="3">Internationalization Initiative</Heading>
                <Text as="p" size="3">
                    Led the successful global expansion of our product by overseeing its localization 
                    in multiple markets. This involved coordinating with cross-functional teams to 
                    ensure cultural and linguistic appropriateness, enhancing user experience for 
                    diverse audiences.
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h3" size="3">Design System Management</Heading>
                <Text as="p" size="3">
                    Established and maintained a comprehensive design system that streamlined design 
                    processes, ensured consistency across products, built accessibility into the core, 
                    and facilitated efficient scaling of our design efforts.
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h3" size="3">Operationalizing Team Processes</Heading>
                <ul>
                    <li>
                        <Text as="p" size="3">
                            Career Framework - Collaborated with leadership and team members to write and refine 
                            multiple iterations of the career framework, providing clear growth paths and 
                            development opportunities for the design team.
                        </Text>
                    </li>
                    <li>
                        <Text as="p" size="3">
                            Design Checklist - Developed a "What Great Looks Like" checklist, setting high 
                            standards for design excellence and ensuring consistent quality across all projects.
                        </Text>
                    </li>
                    <li>
                        <Text as="p" size="3">
                            Design Reviews - Implemented structured design review processes, from early experience 
                            checks to final design handoff, ensuring alignment with end-to-end user experience goals.
                        </Text>
                    </li>
                </ul>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h3" size="3">Process Automation - Introduced and integrated automation tools to:</Heading>
                <ul>
                    <li>
                        <Text as="p" size="3">
                            Track and manage design work efficiently.
                        </Text>
                    </li>
                    <li>
                        <Text as="p" size="3">
                            Notify responsible individuals of their tasks and deadlines.
                        </Text>
                    </li>
                    <li>
                        <Text as="p" size="3">
                            Increase transparency and accountability across the design team, fostering a collaborative and proactive work environment.
                        </Text>
                    </li>
                </ul>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h3" size="3">Accessibility Compliance</Heading>
                <Text as="p" size="3">
                    Regularly reviewed and tested the live product for accessibility, making recommendations and adjustments to align with WCAG standards.
                </Text>
            </Flex>
        </Flex>
    );
}