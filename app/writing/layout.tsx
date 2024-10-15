import React from 'react';
import Header from "@/ui/shared/Header";
import styles from "./layout.module.css";

const WritingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.pageLayout}>
            <Header 
                title='Designing Forward'
                back={true}
            />
            <main className={`${styles.layout}`}>{children}</main>
            
            {/* Add your footer component here */}
        </div>
    );
};

export default WritingLayout;