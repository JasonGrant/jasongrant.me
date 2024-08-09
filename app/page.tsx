import Image from "next/image";
import { Container, Section, Flex, Text, Box } from '@radix-ui/themes';
import RowHeader from "../ui/RowHeader";
import RowItem from "../ui/RowItem";
import InlineLink from "@/ui/InlineLink";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <div className={styles.summary}> */}
      <Container size="4" px="7" py="7">
        <Flex direction={{ initial: 'column', xs: 'column', sm: 'column', md: 'row', lg: "row" }} justify="between">
          <Box maxWidth="62ch" className={styles.summary}>
            <Text as="p" size="4">
              Currently, Jason oversees design quality, consistency of experiences, and processes across the Klaviyo design team. He is also responsible for international expansion, the design system, various initiatives, and serving as the design representative at PRD reviews.
            </Text>
            <Text as="p" size="4">
              At <InlineLink label="Klaviyo" url="https://www.klaviyo.com/" />, Jason established the design system and content design functions of the design team and orchestrated the creation and implementation of the <InlineLink label="Ascent Design System" url="https://www.ascentdesignsystem.com/" /> (<i><small>React</small></i>). He successfully developed a mature system rapidly while transforming the app simultaneously to include modern patterns, empowering Klaviyo's future.
            </Text>
            <Text as="p" size="4">
              Before Klaviyo, Jason led the design team at <InlineLink label="Vertex Pharmaceuticals" url="https://www.vrtx.com/" />, where he created the VIA Design System (<i><small>Web components</small></i>). This system transformed hundreds of homegrown applications into larger platforms, enabling scientific discovery, analysis, clinical trials, deal tracking, financial management, and other core business needs.
            </Text>
            <Text as="p" size="4">
              At <InlineLink label="Collaborative Consulting" url="https://www.linkedin.com/company/collaborative-consulting/" />, Jason led a team of consultants in delivering digital transformation and exceptional experiences for companies in various industries, including e-commerce, finance, franchising, and insurance. He built an “accelerator” in AngularJS, pre-design systems, to prototype solutions for sales and enhance engineering efficiency on client projects.
            </Text>
            <Text as="p" size="4">
              At <InlineLink label="Dassault Systèmes" url="https://www.3ds.com/industries/architecture-engineering-construction" />, Jason created visions, roadmaps, plans, and products to support architects, engineers, and contractors with 3D software. The first product, <InlineLink label="Integrated Planning" url="https://vimeo.com/156633757" />, was the beginning of twelve envisioned products designed to address complex architecture challenges.
            </Text>
            <Text as="p" size="4">
              Prior to product design, I was a technologist at various architecture firms driving the transformation from 2D plans to 3D Building Information Modeling which enhanced the design and delivery of Architecture, Engineering and Construction. 
            </Text>
            <Text as="p" size="4">
              Connect with Jason to explore how his expertise can elevate your team and business.
            </Text>
            <RowHeader label="Experience" />
            <RowItem startLabel="Klaviyo" url="https://www.klaviyo.com/" endLabel="2021 - Now_" />
            <RowItem startLabel="Vertex" url="https://www.vrtx.com/" endLabel="2017 - 2021" />
            <RowItem startLabel="Collaborative" url="https://www.linkedin.com/company/collaborative-consulting/" endLabel="2014 - 2017" />
            <RowItem startLabel="Dassault" url="https://www.3ds.com/industries/architecture-engineering-construction" endLabel="2011 - 2014" />
            <RowItem startLabel="Technologist" endLabel="1997 - 2011" />
            <RowHeader label="Mentoring, speaking, writing" />
            <RowItem startLabel="ADPList" url="https://adplist.org/mentors/jason-grant" endLabel="2022 - Now_" />
            <RowItem startLabel="Endicott" url="https://www.endicott.edu/" endLabel="2023 - 2024" />
            <RowItem startLabel="Behind the Pixels" url="https://medium.com/klaviyo-design/behind-the-pixels-4a3d145d0e01" endLabel="2022" />
            <RowItem startLabel="Tech Target" url="https://www.techtarget.com/contributor/Jason-Grant" endLabel="2017 - 2018" />
            <RowItem startLabel="Connect.tech" url="https://www.linkedin.com/in/mrjasongrant/overlay/1570193156942/single-media-viewer/?profileId=ACoAAAKByegB73Ip6nImB2lfTJmDi3ILV0JqVnY" endLabel="2018" />
            <RowItem startLabel="UXPA Boston" url="https://www.linkedin.com/in/mrjasongrant/overlay/1480815789234/single-media-viewer/?profileId=ACoAAAKByegB73Ip6nImB2lfTJmDi3ILV0JqVnY" endLabel="2016" />
            <RowHeader label="Contact" />
            <RowItem startLabel="Linkedin" url="https://www.linkedin.com/in/mrjasongrant/" />
          </Box>
          <Box maxWidth="62ch" className={styles.info}>
            <Image src="/underconstruction.jpeg" alt="Under contstruction illustration" width="300" height="300" className={styles.imagezone}/>
            {/* <Image src="/underconstruction.jpeg" alt="Under contstruction illustration" width="300" height="300" className={styles.imagezone}/> */}
            <Text as="p" size="2">
              Jason is currently updating (August 2024).
            </Text>
            <Text as="p" size="2">
              Please check back soon for more information.
            </Text>
          </Box>
        </Flex>
      </Container>
      {/* </div> */}


    </main>
  );
}
