import React from 'react';
import TraditionalHeader from "@/ui/traditional/TraditionalHeader";
import styles from "./layout.module.css";

const TraditionalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <TraditionalHeader title="Jason Grant Work Portfolio" />
            <main className={`${styles.layout}`}>{children}</main>
        </>
    );
};

export default TraditionalLayout;