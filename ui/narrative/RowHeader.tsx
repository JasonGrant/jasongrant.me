import React from 'react';
import { Flex, Text, Button, Box, Link, Card, Inset, Strong } from '@radix-ui/themes';
import styles from './RowHeader.module.css';

interface RowHeaderProps {
    label: string;
}

const RowHeader: React.FC<RowHeaderProps> = ({ label }) => {
    return (
        <Flex direction="row" mb="1" mt="4">
            <Text as="span" size="2" weight="light" color="gray">{label}</Text>
        </Flex>
    );
};

export default RowHeader;