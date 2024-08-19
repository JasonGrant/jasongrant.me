import { DataList, Flex, Link, Text } from '@radix-ui/themes';

export default function VertexPage() {
    return ( 
        <Flex direction="column" align="start" justify="start" gap="6">
        <Text as="p" size="3">
            Dassault Systèmes is a global leader in 3D design, engineering, and 
            product lifecycle management software, known for its innovative 
            solutions that empower businesses across various industries. Within 
            the Architecture, Engineering, and Construction (AEC) sector, 
            Dassault Systèmes focuses on providing advanced tools that enhance 
            collaboration, streamline project workflows, and improve the overall 
            efficiency of design and construction processes. By leveraging their 
            3DEXPERIENCE platform, the company enables AEC professionals to create 
            sustainable, high-performance buildings and infrastructure projects 
            through integrated modeling, simulation, and data management, fostering 
            innovation and improving project outcomes.
        </Text>
        <DataList.Root>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Website
                </DataList.Label>
                <DataList.Value>
                    <Link href="https://www.3ds.com/industries/architecture-engineering-construction" target="_blank">
                        Dassault Systèmes
                    </Link>
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Title
                </DataList.Label>
                <DataList.Value>
                    Solutions Experience Manager
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Tenure
                </DataList.Label>
                <DataList.Value>
                    2011 to 2014
                </DataList.Value>
            </DataList.Item>
        </DataList.Root>
    </Flex>
    )
}
