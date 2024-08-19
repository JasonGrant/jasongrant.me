import { Flex, ScrollArea, Heading, Text, Strong } from '@radix-ui/themes';

export default function CollaborativeImpactPage() {
    return (
        <ScrollArea type="auto" scrollbars="vertical" size="2" radius="full" style={{ height: `100%` }}>
            <Flex direction="column" gap="4" overflow="scroll" pr="6" pb="9">
                <Flex direction="column" gap="1">
                    <Text as="p" size="3">
                        Jason led strategic design thinking to create intuitive user experiences, adhering 
                        to best practices and accessibility standards, while guiding high-quality visual 
                        designs and front-end development. He managed and inspired his team, mentoring 
                        them to expand their skills and tackle challenging problems. Jason designed 
                        digital solutions for clients across various industries, conducting user research 
                        and refining designs based on feedback. He also improved design processes by 
                        creating accelerator assets and played a key role in developing the User Experience 
                        service offering, contributing to $4M in revenue within the first 18 months.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h3" size="3">Key responsibilities</Heading>
                    <ul>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Design Leadership</Strong> - Led strategic thinking to ensure simple 
                                and intuitive user experiences adhering to best practice standards and accessibility. Guided high-quality visual designs and front-end development. Collaborated with product managers, design, and development leads to solve user and business goals using user-centered design principles.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Team Management</Strong> - Inspired and led staff to develop and expand 
                                their skills, resulting in higher utilization. Mentored team members to tackle and 
                                succeed at challenging problems outside their experience.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Client Work</Strong> - Designed digital solutions and user interfaces for 
                                clients in various industries, including e-commerce, retail, government, biotech, 
                                and financial sectors. Conducted user research, defined personas, scenarios, and 
                                key workflows to drive design, prototyping, and refinement based on user feedback.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Process Improvement</Strong> - Continuously updated and improved processes, 
                                resulting in a more streamlined and efficient design process through the creation 
                                of accelerator assets.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                <Strong>Sales</Strong> - Created and presented front-end accelerator assets that 
                                transformed the sales process approach. Played a key role in developing the User 
                                Experience service offering, driving $4M in revenue in the first 18 months.
                            </Text>
                        </li>
                    </ul>
                </Flex>
            </Flex>
        </ScrollArea>
    );
}