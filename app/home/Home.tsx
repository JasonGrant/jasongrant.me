import { Container, Heading, Flex, ScrollArea, Theme } from '@radix-ui/themes';
import InlineLink from '@/ui/InlineLink';
import HomeNarrative from './HomeNarrative';
import HomeTimeline from './HomeTimeline';
import Navigation from '@/ui/Navigation';
import ThemeSwitcher from '@/ui/ThemeSwitcher';
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <Container size="2" px="7" pb="7">
        <Flex direction="row" gap="4" justify="between" pt="7" py="4" className={styles.title}>
          <Flex direction="row" gap="4" align="center">
            <Navigation icononly />
            <InlineLink label="Jason Grant" url="/" />
          </Flex>
          <ThemeSwitcher />
        </Flex>
      </Container>
      <ScrollArea type="always" scrollbars="vertical" size="2" radius="full" className={styles.scrollarea}>
        <Container size="2" px="7" pb="7">
          <HomeNarrative />
          <HomeTimeline />
        </Container>
      </ScrollArea>
      <div></div>
    </div>
  );
}
