import { Em, Flex, Heading, Text, Link } from '@radix-ui/themes';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import styles from './page.module.css';

export default function KlaviyoWorkInternationalizationPage() {

    return (
        <Flex direction="column" gap="4" pb="7">
            <Heading as="h2" size="6">Internationalization Initiative</Heading>
            <Flex direction="column" gap="1">
                <Text as="p" size="3">
                    Led the transformation of the platform from an English US-centric product to a 
                    globally accessible app, successfully localizing it into multiple languages and 
                    expanding its reach to a diverse international audience. First to market was
                    launching the platform in French in 2024.
                </Text>
                <Link href="https://www.ascentdesignsystem.com/38f371b04/p/351b40-internationalization" target="_blank">Ascent i18n and l10n guidelines <ExternalLinkIcon /></Link>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Product localized</Heading>
                <Image src="/klaviyo/Klaviyo-Home-French.png" alt="Screenshot of the marketing app in French" className={styles.imageresponsive} width={2368} height={1762}/>
            </Flex>
            <Flex direction="column" gap="1">
                <Heading as="h2" size="4">Marketing site localized</Heading>
                <Image src="/klaviyo/klaviyo-marketing-french.png" alt="Screenshot of the marketing app in French" className={styles.imageresponsive} width={2368} height={1762}/>
            </Flex>
            <Flex direction="column" gap="4">
                <Heading as="h2" size="4">i18n and l10n documentation</Heading>
                <Image src="/klaviyo/klaviyo-text-expansion.png" alt="Screenshot of the marketing app in French" className={styles.imageresponsive} width={2368} height={1762}/>
                <Image src="/klaviyo/klaviyo-number-formatting.png" alt="Screenshot of the marketing app in French" className={styles.imageresponsive} width={2368} height={1762}/>
                <Image src="/klaviyo/klaviyo-text-expansion-words.png" alt="Screenshot of the marketing app in French" className={styles.imageresponsive} width={2368} height={1762}/>
            </Flex>
            
        </Flex>
    );
}