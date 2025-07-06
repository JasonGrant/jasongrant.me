import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Column,
  Text,
  Button,
} from "@once-ui-system/core";

interface NavigationItem {
  href: string;
  label: string;
}

interface NavigationItemsProps {
  items: NavigationItem[];
  showLabels?: boolean;
  showActiveIcon?: boolean;
  onItemClick?: () => void;
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl';
  fillWidth?: boolean;
}

export function NavigationItems({ 
  items, 
  showLabels = false,
  onItemClick,
  gap = 'xs',
  fillWidth = true
}: NavigationItemsProps) {
  const pathname = usePathname();

  return (
    <Column gap={gap} fillWidth={fillWidth}>
      {showLabels && (
        <Text variant="label-strong-s" onBackground="neutral-weak" marginBottom="8">
          Navigation
        </Text>
      )}
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
            <Button
              id={item.label.toLowerCase()}
              variant={isActive ? "primary" : "secondary"}
              weight={isActive ? "strong" : "default"}
              fillWidth
              horizontal="start"
              arrowIcon={!isActive}
              onClick={onItemClick}
            >
              {item.label}
            </Button>
          </Link>
        );
      })}
    </Column>
  );
} 