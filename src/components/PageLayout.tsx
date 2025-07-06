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