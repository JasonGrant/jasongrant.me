import React from 'react';
import { Flex, Text, Box, Link } from '@radix-ui/themes';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import styles from './RowItem.module.css';

interface RowItemProps {
    startLabel: string;
    endLabel?: string;
    url?: string;
    external?: boolean | undefined;
}

const RowItem: React.FC<RowItemProps> = ({ startLabel, endLabel, url, external }) => {
    return (
        <Flex direction="row" gap="3" mb="1">
            {url ? (
                <Link href={url} size="3" weight="bold" style={{ color: 'var(--gray-11)'}} target={external ? '_blank' : undefined}>
                    {startLabel}
                    {external && <ExternalLinkIcon />}
                </Link>
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