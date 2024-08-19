import { Flex, ScrollArea, Heading, Text } from '@radix-ui/themes';

export default function VertexImpactPage() {
    return (
        <ScrollArea type="auto" scrollbars="vertical" size="2" radius="full" style={{ height: `100%` }}>
            <Flex direction="column" gap="4" overflow="scroll" pr="6" pb="9">
                <Flex direction="column" gap="1">
                    <Text as="p" size="3">
                        Jason was the first user experience hire at Vertex Pharmaceuticals, where he built 
                        and led the Vertex Experience Design team. He focused on scaling creativity through 
                        design operations, culture, and capabilities, while managing the internal global 
                        design system to enhance consistency, speed of delivery, and customer experience 
                        quality. Jason directed Design Operations (DesOps) across the digital organization, 
                        supervised design services for multiple divisions, recruited and mentored designers, 
                        and fostered collaboration with Innovation and Design Thinking divisions. He also 
                        managed Human-centered Design educational events, established the design practice, 
                        and successfully delivered over 100 projects.
                    </Text>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h3" size="3">Key responsibilities</Heading>
                    <ul>
                        <li>
                            <Text as="p" size="3">
                                Led the Vertex Experience Design team, focusing on scaling creativity through design operations, culture, and capabilities.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Managed the internal global design system to enhance consistency, speed of delivery, and quality of customer experience.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Directed Design Operations (DesOps) across the digital organization.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Oversaw the Design System to support internal product, engineering, and business needs.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Supervised design services for R&D, Commercial, Clinical, and Enterprise divisions.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Recruited and mentored experience designers and researchers.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Fostered partnerships and collaboration with Innovation and Design Thinking divisions.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Managed monthly Human-centered Design educational events for the Vertex community.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Handled Design Program Management and stakeholder relations.
                            </Text>
                        </li>
                    </ul>
                </Flex>
                <Flex direction="column" gap="1">
                    <Heading as="h3" size="3">Key achievements</Heading>
                    <ul>
                        <li>
                            <Text as="p" size="3">
                                Established an experience design practice for the organization from the ground up.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Enhanced the visibility and understanding of the design process through design value evangelization.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Planned, executed, and delivered an internal design system.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Created and rolled out shared design libraries and tools.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Empowered greater design thinking in the organization with user-friendly playbooks and templates.
                            </Text>
                        </li>
                        <li>
                            <Text as="p" size="3">
                                Successfully delivered over 100 projects.
                            </Text>
                        </li>
                    </ul>
                </Flex>
            </Flex>
        </ScrollArea>
    );
}