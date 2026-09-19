import { useState, useEffect } from 'react';
import { jobsData } from '../data/mockData';
import { Plus, Search, Filter, Edit, Trash2, X } from 'lucide-react';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '', department: '', type: 'Full-time', salary: '', deadline: '', status: 'Open', description: ''
  });

  useEffect(() => {
    // Khởi tạo data
    setJobs(jobsData);
  }, []);

  // Lấy danh sách phòng ban duy nhất để làm bộ lọc
  const departments = ['All', ...new Set(jobsData.map(j => j.department))];

  // Xử lý Lọc và Tìm kiếm
  const filteredJobs = jobs.filter(job => {
    const matchName = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDept === 'All' || job.department === filterDept;
    return matchName && matchDept;
  });

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData(job);
    } else {
      setEditingJob(null);
      setFormData({
        title: '', department: '', type: 'Full-time', salary: '', deadline: '', status: 'Open', description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      // Cập nhật
      setJobs(jobs.map(j => j.id === editingJob.id ? { ...formData, id: editingJob.id } : j));
    } else {
      // Thêm mới (Tạo ID ảo)
      const newJob = { ...formData, id: `J0${jobs.length + 1}` };
      setJobs([...jobs, newJob]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary-900">Quản lý Tin Tuyển dụng</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Tạo tin mới</span>
        </button>
      </div>

      {/* Thanh công cụ Tìm kiếm & Lọc */}
      <div className="bg-surface p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm theo tên vị trí..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select 
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Danh sách tin tuyển dụng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-surface border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${job.status === 'Open' ? 'bg-primary-500' : 'bg-gray-400'}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{job.department} • {job.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                job.status === 'Open' ? 'bg-primary-50 text-primary-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {job.status === 'Open' ? 'Đang tuyển' : 'Đã đóng'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-4">
              <div>
                <span className="font-medium text-gray-900">Mức lương:</span> {job.salary}
              </div>
              <div>
                <span className="font-medium text-gray-900">Hạn nộp:</span> {job.deadline}
              </div>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
              {job.skills?.map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-end gap-2 border-t pt-4 mt-auto">
              <button 
                onClick={() => handleOpenModal(job)}
                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title="Chỉnh sửa"
              >
                <Edit size={18} />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Xóa"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        
        {filteredJobs.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-surface rounded-xl border border-dashed border-gray-300">
            Không tìm thấy tin tuyển dụng nào phù hợp.
          </div>
        )}
      </div>

      {/* Modal Thêm/Sửa tin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                {editingJob ? 'Chỉnh sửa tin tuyển dụng' : 'Tạo tin tuyển dụng mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề vị trí *</label>
                    <input 
                      required
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phòng ban *</label>
                    <input 
                      required
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hình thức *</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Open">Đang tuyển</option>
                      <option value="Closed">Đã đóng</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mức lương</label>
                    <input 
                      type="text" 
                      placeholder="VD: $1000 - $1500"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hạn nộp</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả công việc</label>
                  <textarea 
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 font-medium"
              >
                Hủy
              </button>
              <button 
                type="submit"
                form="jobForm"
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 font-medium"
              >
                {editingJob ? 'Lưu thay đổi' : 'Tạo mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
