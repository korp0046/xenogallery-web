import AdminUserPanel from '@/app/components/AdminUserPanel/AdminUserPanel';
import pagestyles from '../../styles/page.module.css';

export default async function Page() {
    
  return(
    <div className={pagestyles.root}>
      <AdminUserPanel />
    </div>
  );
}

export const metadata = {
  title: 'Element Rogue Gamedoc Editor',
}
