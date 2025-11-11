import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-gray-800">
          ClinicSystem
        </NavLink>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}
              >
                Giới thiệu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}
              >
                Bản tin
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}
              >
                Dịch vụ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/login"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Đăng nhập
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
