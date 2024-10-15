import { DataList, Flex, Link, Text } from '@radix-ui/themes';

export default function VertexPage() {
    return ( 
        <Flex direction="column" align="start" justify="start" gap="6">
        <Text as="p" size="3">
            Collaborative Consulting, now part of CGI, specialized in designing 
            and implementing strategic, technology-driven solutions to tackle 
            complex business and IT challenges. As a privately held, 
            employee-based company, Collaborative Consulting focused on delivering 
            measurable results with a flexible engagement model that combined 
            onsite expertise with cost-effective US-based service delivery. Known 
            for its integrity and commitment to client success, the company enjoyed 
            a loyal customer base, a high percentage of repeat business, and 
            recognition as a top workplace, consistently achieving growth and 
            industry accolades like the “IT Applications Partner of the Year” 
            award from Analog Devices.
        </Text>
        <DataList.Root>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Website
                </DataList.Label>
                <DataList.Value>
                    <Link href="https://www.linkedin.com/company/collaborative-consulting/" target="_blank">
                        Collaborative Consulting Linkedin Page
                    </Link>
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Title
                </DataList.Label>
                <DataList.Value>
                    UX Manager
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Tenure
                </DataList.Label>
                <DataList.Value>
                    2014 to 2017
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Team size
                </DataList.Label>
                <DataList.Value>
                    4 to 6
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Clients
                </DataList.Label>
                <DataList.Value>
                Dunkin' Brands, Beaver Visitec, Wellington Management, J.Jill, TJX Companies, Massachusetts Department of Career Services (DCS) Foreign Labor Certification (FLC), Massachusetts Department of Unemployment Assistance (DUA), Rue La La
                </DataList.Value>
            </DataList.Item>
        </DataList.Root>
    </Flex>
    )
}
