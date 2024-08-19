import React from 'react';
import { Avatar, Box, Container, Card, DataList, Heading, Flex, Link, Text, SegmentedControl } from '@radix-ui/themes';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <Container height="100%" size="2" px={{initial: '3', md: '7'}} pt={{initial: '3', md: '7'}} pb={{initial: '9', md: '7'}} className={styles.cardcontainer}>
            <Card size="4" className={styles.companycard}>
                <Flex direction="row" justify="between" align="center" overflow="hidden" wrap="wrap">
                    {/* {logo} */}
                    <Flex direction="row" justify="start" align="center" gap="4">
                        <Avatar
                            src="/JasonHeadshot.jpg"
                            fallback="JG"
                            size="5"
                        />
                        <Heading as="h2">About Jason</Heading>
                    </Flex>
                    {/* <SegmentedControl.Root defaultValue={pathName} radius="full" className={styles.companyinfoswitch}>
                        <SegmentedControl.Item value={aboutValue} onClick={() => router.push(aboutUrl)}>
                            About
                        </SegmentedControl.Item>
                        <SegmentedControl.Item value="impact" onClick={() => router.push(impactUrl)}>
                            Impact
                        </SegmentedControl.Item>
                        <SegmentedControl.Item value="work" onClick={() => router.push(workUrl)}>
                            Work
                        </SegmentedControl.Item>
                    </SegmentedControl.Root> */}
                </Flex>
                <Box py="6" overflow="scroll" height="100%">
                <Flex direction="column" align="start" justify="start" gap="4">
                    <Text as="p" size="3">
                        From crafting intricate floor plans at a young age to coding my first game on a Commodore 64, 
                        my journey has always been about merging creativity with technology. This passion has evolved 
                        into a career where I’ve seamlessly blended design and development, pushing the boundaries of 
                        what’s possible in product design across diverse industries. Today, I am a design leader with 
                        a deep commitment to nurturing talent and fostering a culture of innovation, diversity, and 
                        inclusivity.
                    </Text>
                    <Text as="p" size="3">
                        As a hybrid designer-developer, my experience spans multiple domains, from designing user-centric 
                        solutions to leading high-impact teams. I am dedicated to recruiting and mentoring top talent, 
                        empowering them to grow and succeed in an ever-changing landscape. My leadership philosophy 
                        centers around continuous learning, open communication, and creating environments where 
                        collaboration thrives and creativity flourishes. I believe in the power of design to drive 
                        business success and transform user experiences.
                    </Text>
                    <Text as="p" size="3">
                        Beyond the screen, I am a hands-on creator who finds joy in exploring the world, restoring old 
                        homes, and perfecting the art of slow-smoked BBQ. These hobbies, much like my professional pursuits, 
                        are driven by a desire to build, improve, and bring visions to life. Whether leading a team or 
                        crafting something tangible, my approach is always rooted in passion, precision, and a relentless 
                        pursuit of excellence.
                    </Text>
        {/* <DataList.Root>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Website
                </DataList.Label>
                <DataList.Value>
                    <Link href="https://www.vrtx.com" target="_blank">
                        vrtx.com
                    </Link>
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Title
                </DataList.Label>
                <DataList.Value>
                    Associate Director of UX
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Tenure
                </DataList.Label>
                <DataList.Value>
                    2017 to 2021
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Focus areas
                </DataList.Label>
                <DataList.Value>
                    Scientific Discovery for Chemistry and Biology, Regulatory Affairs, Clinical Development, Financial, Deal Tracking and consulting on Commercial Operations.
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Team size
                </DataList.Label>
                <DataList.Value>
                    6 to 8
                </DataList.Value>
            </DataList.Item>
        </DataList.Root> */}
    </Flex>
                </Box>
            </Card>
        </Container> 
    )
}