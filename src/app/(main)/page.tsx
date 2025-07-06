"use client";

import { Text } from "@once-ui-system/core";
import { PageLayout } from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout
      title=" Systemic thinker. Strategic builder. Design-driven leader."
      description="Systems-minded design executive focused on building high-impact teams, shaping product strategy, and delivering design work that moves the business forward."
    >
      {/* <Button
        id="docs"
        href="https://docs.once-ui.com/once-ui/quick-start"
        data-border="rounded"
        weight="default"
        prefixIcon="copy"
        arrowIcon
      >
        Explore docs
      </Button> */}
      <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
        My path has taken me through agencies, startups, and public companies. I've built global design systems, led orgs through hypergrowth, and transformed how design collaborates across product and engineering. Whether I'm mentoring new leaders or working through edge cases in production code, I care deeply about doing the work and making it work.
      </Text>
      <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
        I currently lead product design at Hi Marley, where I'm embedding design into the company's future. This site is where I share my work, thinking, and approach to design leadership — clear thinking, high-impact teams, and design that drives results. If you're here to learn more about my work, thinking, or how I approach design leadership — you're in the right place.
      </Text>
    </PageLayout>
  );
}
