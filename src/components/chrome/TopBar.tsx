import Image from "next/image";
import Link from "next/link";
import { CmdKTrigger } from "./CmdKTrigger";
import styles from "./TopBar.module.css";

export function TopBar() {
  return (
    <header className={styles.topbar}>
      <Link href="/" className={styles.mark} aria-label="jasongrant.me — home">
        jasongrant.me
      </Link>
      <div className={styles.right}>
        <CmdKTrigger className={styles.cmdkTrigger} />
        <Link href="/" className={styles.portrait} aria-label="Jason Grant — home">
          <Image src="/jason.jpeg" alt="Jason Grant" width={96} height={96} priority />
        </Link>
      </div>
    </header>
  );
}
