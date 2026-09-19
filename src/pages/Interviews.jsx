import { useState, useEffect } from 'react';
import { interviewsData, candidatesData, usersData } from '../data/mockData';
import { Calendar as CalendarIcon, Clock, MapPin, Video, User, Plus, X } from 'lucide-react';

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    candidateId: '',
    date: '',
    time: '',
    format: 'Online',
    location: '',
    interviewer: ''
  });

  useEffect(() => {
    setInterviews(interviewsData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidate = candidatesData.find(c => c.id === formData.candidateId);
    if (!candidate) return;

    const newInterview = {
      id: `I0${interviews.length + 1}`,
      candidateId: candidate.id,
      candidateName: candidate.name,
      jobTitle: candidate.jobTitle,
      interviewer: formData.interviewer,
      date: `${formData.date}T${formData.time}`,
      format: formData.format,
      location: formData.location,
      status: 'Scheduled'
    };

    setInterviews([...interviews, newInterview]);
    setIsModalOpen(false);
    setFormData({ candidateId: '', date: '', time: '', format: 'Online', location: '', interviewer: '' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return 'text-accent-600 bg-accent-50 border-accent-200';
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'Cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const statusMap = {
    'Scheduled': 'Đã lên lịch',
    'Completed': 'Đã hoàn thành',
    'Cancelled': 'Đã hủy'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary-900">Lịch Phỏng vấn</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Lên lịch mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map(interview => {
          const dateObj = new Date(interview.date);
          const dateStr = dateObj.toLocaleDateString('vi-VN');
          const timeStr = dateObj.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

          return (
            <div key={interview.id} className="bg-surface rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{interview.candidateName}</h3>
                  <p className="text-sm text-primary-700 font-medium">{interview.jobTitle}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(interview.status)}`}>
                  {statusMap[interview.status]}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <CalendarIcon size={16} className="text-gray-400" />
                  <span>{dateStr}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gray-400" />
                  <span>{timeStr}</span>
                </div>
                <div className="flex items-center gap-3">
                  {interview.format === 'Online' ? <Video size={16} className="text-gray-400" /> : <MapPin size={16} className="text-gray-400" />}
                  <span className="truncate">{interview.location}</span>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-2">
                  <User size={16} className="text-gray-400" />
                  <span>Người PV: <span className="font-medium text-gray-800">{interview.interviewer}</span></span>
                </div>
              </div>
            </div>
          );
        })}
        {interviews.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-surface rounded-xl border border-dashed border-gray-300">
            Chưa có lịch phỏng vấn nào.
          </div>
        )}
      </div>

      {/* Modal Thêm lịch */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Lên lịch phỏng vấn mới</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form id="interviewForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ứng viên *</label>
                  <select 
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                    value={formData.candidateId}
                    onChange={(e) => setFormData({...formData, candidateId: e.target.value})}
                  >
                    <option value="" disabled>Chọn ứng viên...</option>
                    {candidatesData.filter(c => c.status === 'Interviewing' || c.status === 'New').map(c => (
                      <option key={c.id} value={c.id}>{c.name} - {c.jobTitle}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày *</label>
                    <input 
                      required
                      type="date" 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giờ *</label>
                    <input 
                      required
                      type="time" 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hình thức *</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                    value={formData.format}
                    onChange={(e) => setFormData({...formData, format: e.target.value})}
                  >
                    <option value="Online">Online (Google Meet/Zoom)</option>
                    <option value="Offline">Offline (Tại văn phòng)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link / Địa điểm *</label>
                  <input 
                    required
                    type="text" 
                    placeholder={formData.format === 'Online' ? "Link cuộc gọi..." : "Phòng họp..."}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Người phỏng vấn *</label>
                  <select 
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                    value={formData.interviewer}
                    onChange={(e) => setFormData({...formData, interviewer: e.target.value})}
                  >
                    <option value="" disabled>Chọn người PV...</option>
                    {usersData.filter(u => u.isActive).map(u => (
                      <option key={u.id} value={u.name}>{u.name} ({u.role})</option>
                    ))}
                  </select>
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
                form="interviewForm"
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 font-medium"
              >
                Tạo lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
