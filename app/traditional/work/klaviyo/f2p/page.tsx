import React from 'react';
import { Container, DataList, Flex, Grid, Heading, Text, Link } from '@radix-ui/themes';
import Image from 'next/image';
import styles from "./page.module.css";

const F2p: React.FC = () => {
    return (
        <Container 
            size="4"
            style={{ 
                marginBottom: "var(--space-4)",
                padding: "var(--space-6)",
            }}
            className={styles.iframeContainer}
        >
            <Heading 
                as="h1" 
                size="8"
                style={{ marginBottom: "var(--space-6)" }}
            >
                Optimizing user conversion from free to paid
            </Heading>
            <Text 
                size="3"
            >
                If you are unable to view the embedded Figma file, please <Link href="https://www.figma.com/deck/YX3DCwz9ep49chSLIIbZ8r/Case-Study---Upgrade-experiment?node-id=1-532&node-type=slide&viewport=81%2C9%2C0.46&t=gbxlY8HeydIOOHsI-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1" target="_blank">click this link</Link>.
            </Text>
            <iframe src="https://embed.figma.com/deck/YX3DCwz9ep49chSLIIbZ8r/Case-Study---Upgrade-experiment?node-id=1-532&node-type=slide&viewport=81%2C9%2C0.46&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share" allowFullScreen></iframe>
        </Container>
    );
};

export default F2p;