import Image from 'next/image';
import Link from 'next/link';
import {
  Column,
  Text,
  Flex,
} from "@once-ui-system/core";

interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  url?: string;
  type?: 'route' | 'external';
}

interface TimelineProps {
  items: TimelineItem[];
  dateFormat?: 'month-year' | 'full-date';
  dateWidth?: string;
  clickable?: boolean;
}

export function Timeline({ 
  items, 
  dateFormat = 'month-year',
  dateWidth = '120px',
  clickable = false,
}: TimelineProps) {
  return (
    <Column gap="0" fillWidth>
      {items.map((item, index) => {
        const isClickable = clickable && item.url;
        const content = (
          <Flex 
            key={index} 
            gap="m" 
            fillWidth 
            align="start"
            className={isClickable ? "timeline-item" : undefined}
            style={{ 
              padding: '8px', 
              borderRadius: '8px', 
              transition: 'background-color 0.2s ease',
              cursor: isClickable ? 'pointer' : 'default'
            }}
          >
          {/* Date Field */}
          <Text 
            variant="label-strong-s" 
            onBackground="neutral-weak"
            style={{ 
              width: dateWidth, 
              flexShrink: 0,
              textAlign: 'right',
              paddingRight: '8px',
              paddingTop: '4px',
              lineHeight: '1.2'
            }}
          >
            {item.date}
          </Text>
          
          {/* Timeline Line and Dot */}
          <Column align="center" style={{ flexShrink: 0, width: '16px', paddingTop: '8px' }}>
            {/* Top Line (if not first item) */}
            {/* {index > 0 && (
              <div style={{
                width: '2px',
                height: '100%',
                backgroundColor: 'var(--neutral-alpha-medium)',
                marginBottom: '8px',
              }} />
            )} */}
            
            {/* Dot */}
            <div 
              className="timeline-dot"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--neutral-alpha-strong)',
                marginBottom: '8px',
                marginLeft: '-3px',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }} 
            />
            
            {/* Bottom Line (if not last item) */}
            {index < items.length - 1 && (
              <div style={{
                width: '2px',
                height: '100%',
                backgroundColor: 'var(--neutral-alpha-medium)',
                marginBottom: '-8px'
              }} />
            )}
          </Column>
          
            {/* Content */}
            <Flex gap="m" align="start" fillWidth>
              {item.image && (
                <div style={{ flexShrink: 0 }}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width || 120}
                    height={item.image.height || 120}
                    style={{
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
              <Column gap="xs" fillWidth style={{ paddingBottom: '36px' }}>
                <Text variant="heading-strong-s">
                  {item.title}
                </Text>
                {item.description && (
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                )}
                {item.content && (
                  <div style={{ marginTop: '8px' }}>
                    {item.content}
                  </div>
                )}
              </Column>
            </Flex>
          </Flex>
        );

        if (isClickable && item.url) {
          if (item.type === 'external') {
            return (
              <Link 
                key={index}
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'none' }}
              >
                {content}
              </Link>
            );
          } else {
            return (
              <Link 
                key={index}
                href={item.url} 
                style={{ textDecoration: 'none' }}
              >
                {content}
              </Link>
            );
          }
        }

        return content;
      })}
    </Column>
  );
} 