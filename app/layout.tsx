/* Components */
import { Providers } from '@/lib/providers'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Toaster from './components/Toaster/Toaster';

/* Instruments */
import './styles/globals.css';
import styles from './styles/layout.module.css';
import Tray from './components/Nav/Tray';
import TopNav from './components/Nav/TopNav';
import Modal from './components/Modal/Modal';
import RightNav from './components/Nav/RightNav';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"/>
        </head>
        <body>
          <section className={styles.container}>
            <Modal />
            <TopNav />
            <Tray />
            <RightNav />
            <main className={styles.main}>{props.children}</main>
            <Toaster />
          </section>
        </body>
      </html>
    </Providers>
  )
}
