import React from 'react';
import Header from "@/ui/shared/Header";
import styles from "./layout.module.css";

const MentoringLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.pageLayout}>
            <Header 
                title='Mentoring'
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

export default MentoringLayout;