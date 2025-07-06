import { Column, Text, Button, Heading } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column 
      fillWidth 
      center 
      padding="l" 
      style={{ 
        minHeight: "100vh",
        textAlign: 'center'
      }}
    >
      <Column 
        fillHeight 
        vertical="center" 
        horizontal="center" 
        gap="m" 
        align="center" 
        style={{ 
          maxWidth: '600px' 
        }}
      >
        {/* Animated 404 Digits */}
        <Column 
          gap="xs" 
          align="center"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          {['4', '0', '4'].map((digit, index) => (
            <Text
              key={digit}
              variant="display-strong-xl"
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                animation: 'bounce 2s infinite',
                animationDelay: `${index * 0.2}s`
              }}
            >
              {digit}
            </Text>
          ))}
        </Column>
        
        <Heading variant="display-strong-l">
          Oops! This Design is Missing
        </Heading>
        
        <Text
          variant="heading-default-xl"
          onBackground="neutral-weak"
          wrap="balance"
        >
          Looks like this page went off-brand.
        </Text>
        
        <Text 
          variant="body-default-l" 
          onBackground="neutral-weak" 
          wrap="balance"
          style={{ maxWidth: '500px' }}
        >
          Even the best designs have their edge cases. 
          This page seems to have lost its visual hierarchy and wandered off the grid. 
          Let's get you back to the main canvas.
        </Text>
        
        <Button
          id="not-found-button"
          href="/"
          variant="primary"
          weight="strong"
          size="l"
          prefixIcon="arrow-left"
          arrowIcon
        >
          Back to the Homepage
        </Button>
      </Column>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `
      }} />
    </Column>
  );
} 