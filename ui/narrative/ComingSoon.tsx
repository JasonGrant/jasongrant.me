import Image from 'next/image';
import { Flex, Heading, Text } from '@radix-ui/themes';

const ComingSoon = () => {
    return (
        <Flex direction="column" gap="4">
            <Heading as='h1' size="6">Coming Soon</Heading>
            <Text as='p' size="3">This site is actively being constructed. Last update was August 18, 2024.</Text>
            <Image src="/ComingSoon.png" alt="Coming Soon" width={500} height={300} />
        </Flex>
    );
};

export default ComingSoon;