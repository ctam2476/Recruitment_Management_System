import { useState, useEffect } from 'react';
import { candidatesData } from '../data/mockData';
import { Eye, FileText, Search, Filter, X } from 'lucide-react';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal states
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    setCandidates(candidatesData);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const filteredCandidates = candidates.filter(c => {
    const matchName = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      c.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchName && matchStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      'New': 'bg-blue-100 text-blue-700',
      'Interviewing': 'bg-accent-100 text-accent-700',
      'Hired': 'bg-green-100 text-green-700',
      'Rejected': 'bg-red-100 text-red-700'
    };
    
    const labels = {
      'New': 'Mới',
      'Interviewing': 'Phỏng vấn',
      'Hired': 'Trúng tuyển',
      'Rejected': 'Từ chối'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[status]}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-900">Quản lý Ứng viên</h1>
      </div>

      <div className="bg-surface p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc vị trí..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="New">Mới</option>
            <option value="Interviewing">Phỏng vấn</option>
            <option value="Hired">Trúng tuyển</option>
            <option value="Rejected">Từ chối</option>
          </select>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <th className="p-4 font-medium">Ứng viên</th>
                <th className="p-4 font-medium">Vị trí ứng tuyển</th>
                <th className="p-4 font-medium hidden md:table-cell">Kinh nghiệm</th>
                <th className="p-4 font-medium">Trạng thái</th>
                <th className="p-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCandidates.map(candidate => (
                <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{candidate.name}</div>
                    <div className="text-xs text-gray-500">{candidate.email}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{candidate.jobTitle}</td>
                  <td className="p-4 text-sm text-gray-700 hidden md:table-cell">{candidate.experience}</td>
                  <td className="p-4">
                    <select 
                      value={candidate.status}
                      onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                      className={`text-xs font-semibold rounded px-2 py-1 border-none focus:ring-2 focus:ring-primary-500 cursor-pointer ${
                        candidate.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        candidate.status === 'Interviewing' ? 'bg-accent-100 text-accent-700' :
                        candidate.status === 'Hired' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      <option value="New">Mới</option>
                      <option value="Interviewing">Phỏng vấn</option>
                      <option value="Hired">Trúng tuyển</option>
                      <option value="Rejected">Từ chối</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedCandidate(candidate)}
                      className="p-2 text-gray-500 hover:text-primary-600 bg-gray-50 hover:bg-primary-50 rounded transition-colors inline-flex items-center gap-1"
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                      <span className="text-xs hidden sm:inline">Chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    Không tìm thấy ứng viên phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Chi tiết Ứng viên */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Chi tiết Hồ sơ</h2>
              <button onClick={() => setSelectedCandidate(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-primary-900">{selectedCandidate.name}</h3>
                  <p className="text-gray-500">{selectedCandidate.email} • {selectedCandidate.phone}</p>
                </div>
                {getStatusBadge(selectedCandidate.status)}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-gray-500 mb-1">Vị trí ứng tuyển</span>
                    <span className="font-semibold text-gray-800">{selectedCandidate.jobTitle}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Ngày nộp</span>
                    <span className="font-semibold text-gray-800">{selectedCandidate.appliedDate}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Kinh nghiệm</span>
                    <span className="font-semibold text-gray-800">{selectedCandidate.experience}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Kỹ năng chuyên môn</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills?.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium border border-primary-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors">
                  <FileText size={18} />
                  <span>Xem CV Đính kèm (PDF)</span>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
