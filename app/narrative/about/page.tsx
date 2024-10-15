import React from 'react';
import { AlertDialog, Avatar, Button, Container, Card, DataList, Inset, Em, Heading, HoverCard, Flex, Link, Text, ScrollArea, SegmentedControl, Grid } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <Container 
            height="100%" 
            size="2" 
            px={{initial: '3', md: '7'}} 
            pt={{initial: '3', md: '7'}} 
            pb={{initial: '9', md: '7'}} 
            className={styles.cardcontainer}
        >
            <Card size="4" className={styles.companycard}>
                <div className={styles.gridcontainer}>
                    <Flex direction="row" justify="between" align="center" overflow="hidden" flexShrink="1">
                        <Flex direction="row" justify="start" align="center" gap="4">
                            <Avatar
                                src="/JasonHeadshot.jpg"
                                fallback="JG"
                                size="5"
                            />
                            <Heading as="h2" wrap="wrap">About Jason</Heading>
                        </Flex>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button color="gray" highContrast size="2">Behind the site</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Site details</AlertDialog.Title>
                                <AlertDialog.Description size="3">
                                    Portfolio was built entirely from scratch with custom code, avoiding traditional website builders. 
                                    This approach gave me complete control over design, functionality, and user experience. Rather than 
                                    using conventional navigation, I opted for a narrative-driven structure that guides users through 
                                    a storytelling experience, allowing them to drill down into detailed content naturally. This 
                                    showcases my skills and reflects my passion for crafting unique, user-centered digital experiences.
                                </AlertDialog.Description>
                                <Flex mt="6" justify="start">
                                    <DataList.Root>
                                        <DataList.Item align="center">
                                            <DataList.Label minWidth="88px">
                                                Code repo
                                            </DataList.Label>
                                            <DataList.Value>
                                                <Link href="https://github.com/jasongrant" target="_blank">
                                                    Github
                                                </Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item align="center">
                                            <DataList.Label minWidth="88px">
                                                Framework
                                            </DataList.Label>
                                            <DataList.Value>
                                                <Link href="https://nextjs.org/" target="_blank">
                                                    Next.js
                                                </Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item align="center">
                                            <DataList.Label minWidth="88px">
                                                Theming and components
                                            </DataList.Label>
                                            <DataList.Value>
                                                <Link href="https://www.radix-ui.com/" target="_blank">
                                                    Radix
                                                </Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item align="center">
                                            <DataList.Label minWidth="88px">
                                                Build and hosting
                                            </DataList.Label>
                                            <DataList.Value>
                                                <Link href="https://vercel.com/" target="_blank">
                                                    Vercel
                                                </Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                    </DataList.Root>
                                </Flex>
                                <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                    Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Flex>
                    <ScrollArea type="auto" scrollbars="vertical" size="2" radius="full" className={styles.scrollarea}>
                        <Flex direction="column" align="start" justify="start" gap="4" pt="6">
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
                            <Text as="p" size="3">
                                I’ve had the privilege of contributing to projects at the following companies:
                            </Text>
                        </Flex>
                        <Grid 
                            columns={{initial: '2', sm: '5'}}  
                            gap="7" 
                            rows="repeat(2, 3rem)" 
                            justify="center" 
                            pt="4" 
                            pb="7"
                        >
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/Klaviyoflaglogo.svg" alt="Klaviyo company logo" width={36} height={36} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.klaviyo.com/' target="_blank">Klaviyo</Link>
                                        <Text size="3">Leading marketing automation platform that empowers businesses to create personalized customer experiences through email and SMS campaigns.</Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/vertexlogo.svg" alt="Vertex pharmaceiticals company logo" width={56} height={56} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.vrtx.com/' target="_blank">Vertex</Link>
                                        <Text size="3">Global biotechnology company focused on discovering and developing innovative therapies for rare diseases, particularly in cystic fibrosis.</Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/dunkinbrandslogo.svg" alt="Dunkin Brands company logo" width={56} height={56} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.dunkinbrands.com/' target="_blank">Dunkin Brands</Link>
                                        <Text size="3">Global leader in the quick-service restaurant industry, known for its iconic Dunkin’ and Baskin-Robbins brands, offering coffee, baked goods, and ice cream.</Text>
                                        <Text size="2"><Em>Project completed in partnership with Collaborative Consulting</Em></Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/ruelala_logo.svg" alt="Rue La La company logo" width={56} height={56} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.ruelala.com' target="_blank">Rue La La</Link>
                                        <Text size="3">Online luxury retailer offering curated, limited-time sales on premium fashion, home, and lifestyle brands.</Text>
                                        <Text size="2"><Em>Project completed in partnership with Collaborative Consulting</Em></Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/Dassaultlogosquare.svg" alt="Dassault Systemes company logo" width={36} height={36} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.3ds.com/industries/architecture-engineering-construction' target="_blank">Dassault Systèmes</Link>
                                        <Text size="3">Global leader in 3D design software and product lifecycle management solutions, providing advanced tools for innovation and collaboration in the Architecture, Engineering, and Construction (AEC) industry.</Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/tjxlogo.svg" alt="Rue La La company logo" width={56} height={56} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.tjx.com/' target="_blank">TJX Companies</Link>
                                        <Text size="3">Leading off-price retailer, offering a wide range of brand-name apparel, home goods, and accessories at discounted prices across its global store network.</Text>
                                        <Text size="2"><Em>Project completed in partnership with Collaborative Consulting</Em></Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/beavervisiteclogo.svg" alt="Beaver Visitec company logo" width={56} height={56} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.bvimedical.com/' target="_blank">Beaver Visitec</Link>
                                        <Text size="3">Leading provider of surgical solutions and devices for ophthalmic and other microsurgical specialties, known for precision and innovation.</Text>
                                        <Text size="2"><Em>Project completed in partnership with Collaborative Consulting</Em></Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/Wellingtonlogo.svg" alt="Wellington management company logo" width={64} height={64} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.wellington.com/' target="_blank">Wellington Management</Link>
                                        <Text size="3">Global investment management firm providing expertise across a broad range of asset classes to institutional and individual investors.</Text>
                                        <Text size="2"><Em>Project completed in partnership with Collaborative Consulting</Em></Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/stateofma.svg" alt="State of Massachusetts logo" width={56} height={56} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.mass.gov/' target="_blank">State of Massachusetts</Link>
                                        <Text size="3">The Massachusetts Department of Career Services (DCS) Foreign Labor Certification (FLC) and the Massachusetts Department of Unemployment Assistance (DUA) are state agencies that manage labor certifications for foreign workers and provide unemployment benefits and services to residents, respectively.</Text>
                                        <Text size="2"><Em>Projects completed in partnership with Collaborative Consulting</Em></Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Flex direction="row" align="center" justify="center" width="100%" height="100%">
                                        <Image src="/logos/jjill.svg" alt="J.Jill company logo" width={56} height={56} />
                                    </Flex>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex direction="column" gap="2">
                                        <Link size="4" href='https://www.jjill.com/' target="_blank">J.Jill</Link>
                                        <Text size="3">Women’s apparel brand offering stylish, comfortable, and versatile clothing designed for modern, easy living.</Text>
                                        <Text size="2"><Em>Project completed in partnership with Collaborative Consulting</Em></Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </Grid>
                        {/* ADPList Reviews */}
                        {/* <section style="padding: 16px; height: 496px; box-shadow: rgba(142, 151, 158, 0.15) 0px 4px 19px 0px; border-radius: 16px; overflow: hidden; width: 100%; max-width: 650px;"><iframe src="https://adplist.org/widgets/reviews?src=jason-grant" title="All Reviews" width="100%" height="100%" loading="lazy" style="border: 0px;"></iframe></section> */}
                    </ScrollArea>
                </div>
            </Card>
        </Container> 
    )
}