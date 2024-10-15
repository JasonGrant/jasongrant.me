import styles from './SectionFull.module.css';

interface SectionFullProps {
    children: React.ReactNode;
    bg?: boolean;
}

const SectionFull: React.FC<SectionFullProps> = ({ children, bg }) => {
    return (
        <section className={`${styles.containerOuter} ${bg ? styles.bgGray : ''}`}>
            <div className={styles.containerInner}>
                {children}
            </div>
        </section>
    );
};