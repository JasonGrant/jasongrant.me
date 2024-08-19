import { Container, Heading, Flex, ScrollArea } from '@radix-ui/themes';
import InlineLink from '@/ui/InlineLink';
import HomeNarrative from './HomeNarrative';
import HomeTimeline from './HomeTimeline';
import styles from "./Home.module.css";

export default function Home() {
  return (
      <Container height="100%" size="2" px="7" pb="7" className={styles.main}>
        <Flex direction="row" gap="4" justify="between" pt="7" py="4" className={styles.title}>
          <InlineLink label="Jason Grant" url="/" />
          {/* <Button 
                  color="gray"
                  variant="soft"
                  size="3"
              >
                  <SunIcon />
              </Button> */}
        </Flex>
        <Heading as="h2">Optimizing Design, Elevating Systems</Heading>
        <HomeNarrative />
        <HomeTimeline />
      </Container>
  );
}
