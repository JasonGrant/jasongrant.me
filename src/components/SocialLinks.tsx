import Link from 'next/link';
import {
  Column,
  Text,
  Button,
} from "@once-ui-system/core";

interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  showLabels?: boolean;
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl';
  fillWidth?: boolean;
  showExternalIcon?: boolean;
}

export function SocialLinks({ 
  links, 
  showLabels = false,
  gap = 'xs',
  fillWidth = true,
  showExternalIcon = false
}: SocialLinksProps) {
  return (
    <Column gap="m" fillWidth={fillWidth}>
      {showLabels && (
        <Text variant="label-strong-s" onBackground="neutral-weak" marginBottom="8">
          Social
        </Text>
      )}
      <Column gap={gap} fillWidth>
        {links.map((social) => (
          <Link key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button
              id={social.label.toLowerCase()}
              variant="secondary"
              weight="default"
              fillWidth
              horizontal="start"
              prefixIcon={social.icon}
              arrowIcon
              suffixIcon={showExternalIcon ? "external" : undefined}
              className={showExternalIcon ? "social-link-button" : undefined}
            >
              {social.label}
            </Button>
          </Link>
        ))}
      </Column>
    </Column>
  );
} 