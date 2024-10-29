import React from 'react';
import Header from "@/ui/shared/Header";
import styles from "./layout.module.css";

const WritingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.pageLayout}>
            <Header 
                title='Color Contrast Checker'
                back={true}
            />
            <main 
                className={styles.layout}
            >
                {children}
            </main>
        </div>
    );
};

export default WritingLayout;