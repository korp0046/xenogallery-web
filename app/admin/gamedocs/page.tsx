import pagestyles from '../../styles/page.module.css';
import GamedocBrowser from '@/app/components/GamedocBrowser/GamedocBrowser';

export default async function Page() {
    
  return(
    <div className={pagestyles.root}>
      <GamedocBrowser />
    </div>
  );
}

export const metadata = {
  title: 'Element Rogue Gamedoc Editor',
}
