import React from 'react';
import Link from 'next/link'
import { Code } from '@radix-ui/themes';
import styles from './InlineLink.module.css';

interface InlineLinkProps {
    label: string;
    url: string;
}

const InlineLink: React.FC<InlineLinkProps> = ({ label, url }) => {
    return (
        <Code>
            <Link href={url} className={styles.linkreset}>{label}</Link>
        </Code>
    );
};

export default InlineLink;