import { Em, Flex, Heading, Text, Link } from '@radix-ui/themes';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import styles from './page.module.css';

export default function KlaviyoWorkAscentPage() {

    return (
        <Flex direction="column" gap="4" pb="7">
            <Heading as="h2" size="6">Ascent Design System</Heading>
            <Flex direction="column" gap="1">
                <Text as="p" size="3">
                    Empowering designers and engineers to build high quality and 
                    cohesive experiences while accelerating the pace of creation 
                    and innovation.
                </Text>
                <Link href="https://www.ascentdesignsystem.com/" target="_blank">Ascent Design System Site <ExternalLinkIcon /></Link>
                <Image src="/klaviyo/Ascent-Components.png" alt="Screenshot of the marketing app in French" className={styles.imageresponsive} width={2368} height={1762}/>
            </Flex>
            {/* <Flex direction="column" gap="1">
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
            </Flex> */}
            
        </Flex>
    );
}