import React from 'react';
import { Flex, Text, Box, Link } from '@radix-ui/themes';
import styles from './RowItem.module.css';

interface RowItemProps {
    startLabel: string;
    endLabel?: string;
    url?: string;
}

const RowItem: React.FC<RowItemProps> = ({ startLabel, endLabel, url }) => {
    return (
        <Flex direction="row" gap="3" mb="1">
            {url ? (
                <Link href={url} size="3" weight="bold" target="_blank" style={{ color: 'var(--gray-11)'}}>{startLabel}</Link>
            ) : (
                <Text as="span" size="3" weight="bold" style={{ color: 'var(--gray-11)'}}>{startLabel}</Text>
            )}
            {endLabel && (
                <>
                    <Box flexGrow="1" mb="1" className={styles.dottedline} />
                    <Text as="span" size="2" mt="1"><code>{endLabel}</code></Text>
                </>
            )}
        </Flex>
    );
};

export default RowItem;