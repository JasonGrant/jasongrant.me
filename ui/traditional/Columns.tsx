import React from 'react';
import styles from './SectionFull.module.css';

type ColumnsProps = {
    type: 'fullWidth' | 'twoColumnEqual' | 'threeColumnEqual' | 'twoColumnLeftTwoThirds' | 'twoColumnRightTwoThirds';
    children: React.ReactNode;
};

const Columns: React.FC<ColumnsProps> = ({ type, children }) => {

    return (
        <div className={styles.type}>
            {children}
        </div>
    );
};

export default Columns;