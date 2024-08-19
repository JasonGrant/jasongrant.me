import { Flex, Section } from '@radix-ui/themes';
import RowHeader from "../../ui/RowHeader";
import RowItem from "../../ui/RowItem";

export default function HomeTimeline() {
    return (
        <Section py="4">
            <Flex direction="column">
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
            </Flex>
        </Section>
    )
}

