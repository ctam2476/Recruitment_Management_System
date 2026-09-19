import { useState, useEffect } from 'react';
import { usersData } from '../data/mockData';
import { Shield, Mail, Key } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const toggleActive = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const changeRole = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-900">Quản lý Phân quyền</h1>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <th className="p-4 font-medium">Người dùng</th>
                <th className="p-4 font-medium">Vai trò (Role)</th>
                <th className="p-4 font-medium text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail size={12} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-gray-400" />
                      <select 
                        value={user.role}
                        onChange={(e) => changeRole(user.id, e.target.value)}
                        className="bg-transparent border border-gray-200 rounded p-1 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      >
                        <option value="Admin">Admin</option>
                        <option value="HR Specialist">HR Specialist</option>
                        <option value="Interviewer">Interviewer</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => toggleActive(user.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                        user.isActive ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                    <div className={`text-xs mt-1 ${user.isActive ? 'text-primary-600' : 'text-gray-500'}`}>
                      {user.isActive ? 'Hoạt động' : 'Đã khóa'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
