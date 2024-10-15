import Link from 'next/link';
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Not found – 404!</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/">
        Go back to Home
      </Link>
    </div>
  );
}