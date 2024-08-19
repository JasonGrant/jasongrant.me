import { DataList, Flex, Link, Text } from '@radix-ui/themes';

export default function KlaviyoPage() {
    return ( 
        <Flex direction="column" align="start" justify="start" gap="6">
            <Text as="p" size="3">
                Klaviyo is a leading marketing automation platform that helps businesses 
                grow by leveraging customer data to create personalized email and SMS 
                campaigns. Designed for e-commerce and online brands, Klaviyo enables 
                companies to segment their audience, automate marketing workflows, and 
                deliver targeted communications that drive customer engagement and revenue. 
                With its user-friendly interface and powerful integration capabilities, 
                Klaviyo is widely recognized for empowering businesses to build stronger 
                relationships with their customers and achieve sustainable growth.
            </Text>
            <DataList.Root>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Website
                    </DataList.Label>
                    <DataList.Value>
                        <Link href="https://www.klaviyo.com" target="_blank">
                            klaviyo.com
                        </Link>
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Title
                    </DataList.Label>
                    <DataList.Value>
                        Director of Product Design
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Tenure
                    </DataList.Label>
                    <DataList.Value>
                        2021 to present
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Teams
                    </DataList.Label>
                    <DataList.Value>
                        Design Systems, International, and Content Design (Previous)
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Team size
                    </DataList.Label>
                    <DataList.Value>
                        10 to 14
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Design org
                    </DataList.Label>
                    <DataList.Value>
                        ~80 Designers, Researchers, Content Designers, Product Documentation, 
                        Behavioral Designer, Motion Designer, and UX Engineers
                    </DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Flex>
    )
}