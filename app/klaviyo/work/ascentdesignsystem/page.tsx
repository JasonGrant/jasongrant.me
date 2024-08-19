import { Flex, Link } from '@radix-ui/themes';
import ComingSoon from '@/ui/ComingSoon';

export default function AscentPage() {

    return (
        <Flex direction="column" gap="4">
            <Link href="https://www.ascentdesignsystem.com/">Ascent Design System</Link>
            <ComingSoon />
        </Flex>
    );
}