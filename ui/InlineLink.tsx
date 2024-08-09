import React from 'react';
import { Link } from '@radix-ui/themes';
import styles from './InlineLink.module.css';

interface InlineLinkProps {
    label: string;
    url: string;
}

const InlineLink: React.FC<InlineLinkProps> = ({ label, url }) => {
    return (
        <Link href={url} target="_blank" size="3" weight="bold">
            <code>{label}</code>
        </Link>
    );
};

export default InlineLink;