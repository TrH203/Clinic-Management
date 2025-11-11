import { Outlet } from 'react-router-dom';
import Header from './Header';

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
