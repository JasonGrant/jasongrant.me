import { DataList, Flex, Link, Text } from '@radix-ui/themes';

export default function VertexPage() {
    return ( 
        <Flex direction="column" align="start" justify="start" gap="6">
        <Text as="p" size="3">
            Vertex Pharmaceuticals is a global biotechnology company that focuses on 
            discovering, developing, and commercializing innovative medicines for rare 
            diseases. Known primarily for its pioneering work in cystic fibrosis, Vertex 
            has developed a portfolio of treatments that have transformed the lives of 
            patients with this condition. The company continues to expand its research 
            and development efforts into other areas, including pain, sickle cell disease, 
            and beta-thalassemia, with the goal of addressing unmet medical needs and 
            improving patient outcomes globally.
        </Text>
        <DataList.Root>
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
        </DataList.Root>
    </Flex>
    )
}