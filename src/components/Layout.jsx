import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  Settings,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Tin tuyển dụng', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'Ứng viên & Hồ sơ', path: '/candidates', icon: <Users size={20} /> },
    { name: 'Lịch phỏng vấn', path: '/interviews', icon: <Calendar size={20} /> },
    { name: 'Phân quyền User', path: '/users', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-700 text-white transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-primary-800">
          <span className="text-xl font-bold tracking-wider">RMS System</span>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-900 text-accent-400 font-medium' 
                    : 'hover:bg-primary-600 hover:text-white text-gray-200'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

const Header = ({ setIsOpen }) => {
  return (
    <header className="h-16 bg-surface border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsOpen(true)} className="lg:hidden text-text-main hover:text-primary-700">
          <Menu size={24} />
        </button>
        
        <div className="hidden sm:flex items-center bg-background rounded-full px-4 py-2 w-64 border border-gray-200 focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-600 transition-all">
          <Search size={18} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="bg-transparent border-none outline-none w-full text-sm text-text-main"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-primary-700 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>
        <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer border-2 border-white shadow-sm">
          A
        </div>
      </div>
    </header>
  );
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
