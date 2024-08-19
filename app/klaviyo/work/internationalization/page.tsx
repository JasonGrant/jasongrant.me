"use client"

import { useRouter } from 'next/navigation'
import { Box, Text, Strong } from '@radix-ui/themes';

export default function KlaviyoWorkPage() {
    const router = useRouter();

    return (
        <Box width="100%">
            <Text as="p" size="3">
                <Strong>Internationalization</Strong> ...
            </Text>
        </Box>
    );
}