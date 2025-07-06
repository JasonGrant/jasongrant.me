import {
  Heading,
  Text,
  Column,
  Badge,
  Logo,
  Line,
  LetterFx,
} from "@once-ui-system/core";

interface PageLayoutProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageLayout({ 
  title, 
  description, 
  children 
}: PageLayoutProps) {
  return (
    <Column fillWidth center padding="l" style={{ minHeight: "100vh" }}>
      <Column fillHeight vertical="start" horizontal="start" gap="l" align="start" style={{ maxWidth: '900px' }}>
        {/* <Badge
          textVariant="code-default-s"
          border="neutral-alpha-medium"
          onBackground="neutral-medium"
          vertical="center"
          gap="16"
        >
          <Logo dark icon="/trademarks/wordmark-dark.svg" href="https://once-ui.com" size="xs" />
          <Logo light icon="/trademarks/wordmark-light.svg" href="https://once-ui.com" size="xs" />
          <Line vert background="neutral-alpha-strong" />
          <Text marginX="4">
            <LetterFx trigger="instant">{tagline}</LetterFx>
          </Text>
        </Badge> */}
        
        <Heading variant="display-strong-l">
          {title}
        </Heading>
        
        <Text
          variant="heading-default-xl"
          onBackground="neutral-weak"
          wrap="balance"
          marginBottom="16"
        >
          {description}
        </Text>
        
        {children}
      </Column>
    </Column>
  );
} 