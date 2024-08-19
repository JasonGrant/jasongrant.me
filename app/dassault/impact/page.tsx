import { Flex, ScrollArea, Heading, Text, Strong } from '@radix-ui/themes';

export default function CollaborativeImpactPage() {
    return (
        <ScrollArea type="auto" scrollbars="vertical" size="2" radius="full" style={{ height: `100%` }}>
            <Flex direction="column" gap="4" overflow="scroll" pr="6" pb="9">
                <Flex direction="column" gap="1">
                    <Text as="p" size="3">
                        Jason created and managed a multi-year, multi-product line development roadmap, 
                        providing strategic direction to cross-functional teams to align with the vision. 
                        He identified opportunities and gaps through client interviews, prioritized 
                        technical requirements, and conducted analyses to ensure successful POCs, MVPs, 
                        and reduced time to market. Jason also fostered a user-centric design environment 
                        for cloud and desktop applications, led marketing efforts for product releases, 
                        and engaged with customers and industry leaders to evangelize strategy and expand 
                        relationships.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h3" size="3">Key responsibilities</Heading>
                    <ul>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Strategy</Strong> - Created and managed a multi-year, multi-product 
                                line development roadmap with high-level planning, execution strategy, and 
                                overlapping release cycles. Provided strategic direction to a cross-functional 
                                team to align with the vision.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Product Management</Strong> - Identified opportunities, deficiencies, and 
                                gaps through client interviews. Prioritized technical requirements and features to 
                                ensure successful Proof of Concept (POC) and Minimum Viable Product (MVP). Conducted 
                                qualitative and quantitative analysis to determine product feasibility, ROI, and 
                                reduced time to market.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Design</Strong> - Facilitated a user-centric product design and development 
                                environment for cloud and desktop applications. Worked both independently and 
                                collaboratively to design and validate solutions with user input and feedback.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Marketing</Strong> - Performed release readiness activities across all 
                                organizational levels. Created product summary flyers, wrote video scripts, and 
                                produced release videos.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                <Strong>User Engagement</Strong> - Facilitated customer councils and executive briefings 
                                to evangelize strategy and roadmap. Attended industry conferences and events to develop 
                                and expand industry relationships.
                            </Text>
                        </li>
                    </ul>
                </Flex>
            </Flex>
        </ScrollArea>
    );
}