/* Instruments */
import styles from './footer.module.css'
import '../../styles/globals.css'

export default function Footer(props: React.PropsWithChildren) {
    return (
        <footer className={styles.footer}>
        <div>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://elementrogue.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Element Rogue
          </a>
        </div>
      </footer>
    )
  }