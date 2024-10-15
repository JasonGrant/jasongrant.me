import React from 'react';
import {Link} from '@radix-ui/react-navigation-menu';
import styles from './ListItem.module.css';

type ListItemProps = {
    title: string;
    href: string;
    children: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = ({ title, children }) => {
    return (
        <li className={styles.listItem}>
            <Link href="#" className={styles.link}>
                <div className={styles.ListItemHeading}>{title}</div>
            </Link>
            <p className={styles.ListItemText}>{children}</p>
        </li>
    );
};

export default ListItem;