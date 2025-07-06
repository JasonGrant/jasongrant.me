import Link from 'next/link';
import {
  Column,
  Flex,
  Text,
  Avatar,
  Button,
} from "@once-ui-system/core";

interface ProfileSectionProps {
  name: string;
  imageSrc: string;
  size?: 's' | 'm' | 'l' | 'xl';
  textVariant?: 'heading-strong-l' | 'heading-strong-m' | 'heading-strong-s' | 'heading-default-l' | 'heading-default-m' | 'heading-default-s';
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl';
  align?: 'start' | 'center' | 'end';
  href?: string;
}

export function ProfileSection({ 
  name, 
  imageSrc, 
  size = 'l',
  textVariant = 'heading-strong-l',
  gap = 'xs',
  align = 'center',
  href = '/'
}: ProfileSectionProps) {
  return (
    <Column gap="m" align={align} className="profile-section">
      <Link href={href} style={{ textDecoration: 'none' }}>
          <Button
            variant="tertiary"
            weight="default"
            size="l"
            fillWidth
            horizontal="start"
            style={{ padding: '0', margin: '0', borderRadius: '9999px' }}
            className="profile-section-button"
          >
          <Flex gap={gap} align={align} vertical="center" paddingX="0" margin="0">
            <Avatar
              src={imageSrc}
              size={size}
              border="neutral-alpha-medium"
              style={{ marginLeft: '-4px' }}
            />
            <Text variant={textVariant} style={{ textAlign: align }}>
              {name}
            </Text>
          </Flex>
        </Button>
      </Link>
    </Column>
  );
} 