import { DataList, Flex, Heading, Text, Link } from '@radix-ui/themes';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import styles from './page.module.css';

export default function KlaviyoWorkAscentPage() {

    return (
        <Flex direction="column" gap="4" pb="7" pr="6">
            <Heading as="h2" size="6">Ascent Design System</Heading>
            <Flex direction="column" gap="1">
                <Text as="p" size="3">
                    Empowering designers and engineers to build high quality and 
                    cohesive experiences while accelerating the pace of creation 
                    and innovation.
                </Text>
            </Flex>
            <DataList.Root>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Documentation site
                    </DataList.Label>
                    <DataList.Value>
                        <Link href="https://www.ascentdesignsystem.com/" target="_blank">
                            ascentdesignsystem.com
                        </Link>
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Team size
                    </DataList.Label>
                    <DataList.Value>
                        7 Designers and 4 Engineers
                    </DataList.Value>
                </DataList.Item>
            </DataList.Root>
            {/* <Link href="https://www.ascentdesignsystem.com/" target="_blank">Ascent Design System Site <ExternalLinkIcon /></Link> */}
            <Image src="/klaviyo/Ascent-Components.png" alt="Screenshot of the marketing app in French" className={styles.imageresponsive} width={2368} height={1762}/>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Background and context</Heading>
                <Text as="p" size="3">
                    Klaviyo is a rapidly growing company that offers a marketing automation platform, empowering businesses 
                    to grow through email and SMS marketing. When I joined Klaviyo, the design and development ecosystem was 
                    both vast and fragmented. The existing component library had been built over a decade, resulting in a 
                    collection of React components developed by different engineers with varying standards and approaches. 
                    This inconsistency led to a user experience that felt outdated and disjointed. Additionally, the Figma 
                    library was more aspirational than practical, lacking alignment with the actual component library used 
                    in production. The guidelines provided were more of a loose design specification rather than actionable 
                    usage rules, further contributing to the inconsistencies across the application.
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Problem statement</Heading>
                <Text as="p" size="3">
                    The core problem was clear: Klaviyo’s design system was non-existent and inefficient, making it difficult 
                    to scale and innovate. The application’s interface reflected its age, and the mismatched Figma and 
                    component libraries led to friction between designers and developers. This dissonance affected not only 
                    the end-user experience but also the efficiency and morale of the internal teams. The challenge was not 
                    just to modernize the design but to create a system that could support Klaviyo’s rapid growth, evolving 
                    product suite, and a rebrand.
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Goals and objectives</Heading>
                <Text as="p" size="3">
                    The primary goal of the Ascent Design System was to create a unified, scalable, and modern design system that would:
                    <ul>
                        <li>Empower designers and engineers to build high-quality and cohesive experiences</li>
                        <li>Accelerate the pace of creation and innovation</li>
                        <li>Provide a single source of truth for design and development</li>
                        <li>Improve the efficiency and morale of the internal teams</li>
                    </ul>
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Challenges and constraints</Heading>
                <Text as="p" size="3">
                    One of the most significant challenges was implementing the design system into a monorepo environment, 
                    where every decision was live immediately. This meant that any changes made to the design system were 
                    instantly reflected across the entire application, leaving little room for error and requiring 
                    meticulous planning and execution.
                    <br /><br />
                    Other challenges included:
                    <ul>
                        <li><b>Technical debt</b> - Addressing the existing technical debt while building the new system.</li>
                        <li><b>Stakeholder alignment</b> - Ensuring buy-in from all stakeholders, including designers, engineers, and product managers, especially given the scale of the changes.</li>
                        <li><b>Balancing speed and quality</b> - Releasing the system quickly to meet business needs while maintaining a high standard of quality.</li>
                    </ul>
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Process</Heading>
                <Text as="p" size="3">
                    The process of developing the Ascent Design System was as complex as it was ambitious. It involved 
                    building a specialized team while simultaneously constructing the system and redesigning the 
                    application that was further complicated by a company-wide rebrand.
                    <br /><br />
                    This process included:
                    <ul>
                        <li><b>Team building</b> - I assembled a team of specialists who could also function as generalists. This team included experts in components, patterns, visual design, data visualization, motion design, content design, accessibility, and tooling for designers and engineers. Their diverse expertise was crucial in ensuring the system’s success.</li>
                        <li><b>Design Tokens and core components</b> - We began by establishing design tokens and form components as the foundation of the system. These elements were critical in creating a unified visual language and ensuring consistency across the app.</li>
                        <li><b>Systematic legacy updates</b> - We then systematically updated the legacy components, aligning them with the future design vision for the Klaviyo app. This was done carefully to avoid breaking changes in the live monorepo environment.</li>
                        <li><b>Governance and documentation</b> - We developed comprehensive guidelines and documentation to ensure that the system could be easily adopted and maintained. This included clear usage rules, component documentation, and best practices for both designers and developers.</li>
                        <li><b>Iterative implementation</b> - Given the live nature of the monorepo, we adopted an iterative approach, releasing the system in phases. This allowed us to gather feedback, address issues in real-time, and refine the system based on actual usage.</li>
                        <li><b>Managing design debt</b> - Throughout the process, we made strategic decisions to prioritize speed over perfection. While this allowed us to release V1 of the system within a year, it also introduced some design debt, which we are now addressing through ongoing updates and refinements.</li>
                    </ul>
                </Text>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Lessons learned and next steps</Heading>
                <Text as="p" size="3">
                    The development and implementation of the Ascent Design System provided valuable insights:
                    <ul>
                        <li><b>Iterative development</b> - In a live environment, iterative development is crucial. It allows for real-time feedback and adjustments, which is especially important when changes are immediately visible to users.</li>
                        <li><b>Balancing speed and quality</b> - While prioritizing speed was necessary, it’s important to allocate time for addressing design debt and refining the system post-launch.</li>
                        <li><b>Ongoing governance</b> - A design system is never truly finished. Ongoing governance and updates are necessary to keep the system aligned with evolving product needs and user expectations.</li>
                    </ul>
                </Text>
            </Flex>
        </Flex>
    );
}