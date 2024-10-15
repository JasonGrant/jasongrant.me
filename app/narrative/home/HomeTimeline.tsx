import { Flex, Section } from '@radix-ui/themes';
import RowHeader from "../../../ui/narrative/RowHeader";
import RowItem from "../../../ui/narrative/RowItem";

export default function HomeTimeline() {
    return (
        <Section py="4">
            <Flex direction="column">
                <RowHeader label="Experience" />
                <RowItem startLabel="Klaviyo" url="/narrative/klaviyo" endLabel="2021 - Now_" />
                <RowItem startLabel="Vertex" url="/narrative/vertex" endLabel="2017 - 2021" />
                <RowItem startLabel="Collaborative" url="/narrative/collaborative" endLabel="2014 - 2017" />
                <RowItem startLabel="Dassault" url="/narrative/dassault" endLabel="2011 - 2014" />
                <RowItem startLabel="Technologist" endLabel="1997 - 2011" />
                <RowHeader label="Mentoring, speaking, writing" />
                <RowItem startLabel="Designing Forward with Jason Grant" external url="https://mrjasongrant.substack.com/" endLabel="2024 - Now_" />
                <RowItem startLabel="ADPList" external url="https://adplist.org/mentors/jason-grant" endLabel="2022 - Now_" />
                <RowItem startLabel="Endicott" external url="https://www.endicott.edu/" endLabel="2023 - 2024" />
                <RowItem startLabel="Behind the Pixels" external url="https://medium.com/klaviyo-design/behind-the-pixels-4a3d145d0e01" endLabel="2022" />
                <RowItem startLabel="Tech Target" external url="https://www.techtarget.com/contributor/Jason-Grant" endLabel="2017 - 2018" />
                <RowItem startLabel="Connect.tech" external url="https://www.linkedin.com/in/mrjasongrant/overlay/1570193156942/single-media-viewer/?profileId=ACoAAAKByegB73Ip6nImB2lfTJmDi3ILV0JqVnY" endLabel="2018" />
                <RowItem startLabel="UXPA Boston" external url="https://www.linkedin.com/in/mrjasongrant/overlay/1480815789234/single-media-viewer/?profileId=ACoAAAKByegB73Ip6nImB2lfTJmDi3ILV0JqVnY" endLabel="2016" />
                <RowHeader label="Contact" />
                <RowItem startLabel="Linkedin" external url="https://www.linkedin.com/in/mrjasongrant/" />
            </Flex>
        </Section>
    )
}

