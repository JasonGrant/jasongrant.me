import { Column, Flex } from "@once-ui-system/core";
import { Navigation } from '@/components/Navigation';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Desktop Layout: Side-by-side navigation and content */}
      <Flex 
        fillWidth 
        style={{ 
          height: '100vh',
          overflow: 'hidden'
        }}
        className="desktop-layout"
      >
        <Navigation />
        <Column 
          fillWidth 
          style={{ 
            overflowY: 'auto',
            height: '100vh',
          }}
        >
          {children}
        </Column>
      </Flex>

      {/* Mobile Layout: Navigation over content */}
      <Column 
        fillWidth 
        style={{ 
          height: '100vh',
          overflow: 'hidden'
        }}
        className="mobile-layout"
      >
        <Navigation />
        <Column 
          fillWidth 
          style={{ 
            overflowY: 'auto',
            height: '100vh',
            paddingTop: '80px'
          }}
        >
          {children}
        </Column>
      </Column>
    </>
  );
}
