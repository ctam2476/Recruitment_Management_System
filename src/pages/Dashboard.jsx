import { useState, useEffect } from 'react';
import { jobsData, candidatesData, interviewsData } from '../data/mockData';
import { Briefcase, Users, Calendar, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCandidates: 0,
    upcomingInterviews: 0,
    hiredRate: 0,
  });

  useEffect(() => {
    // Tính toán thống kê từ mock data
    const totalJobs = jobsData.filter(j => j.status === 'Open').length;
    const totalCandidates = candidatesData.length;
    const upcomingInterviews = interviewsData.filter(i => i.status === 'Scheduled').length;
    
    const hired = candidatesData.filter(c => c.status === 'Hired').length;
    const hiredRate = totalCandidates > 0 ? Math.round((hired / totalCandidates) * 100) : 0;

    setStats({ totalJobs, totalCandidates, upcomingInterviews, hiredRate });
  }, []);

  // Tính số lượng ứng viên theo vị trí (đơn giản)
  const candidatesPerJob = jobsData.map(job => {
    return {
      title: job.title,
      count: candidatesData.filter(c => c.jobId === job.id).length
    };
  }).filter(j => j.count > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-900">Tổng quan (Dashboard)</h1>
          <p className="text-gray-500 mt-1">Xin chào, đây là tình hình tuyển dụng hôm nay.</p>
        </div>
      </div>

      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Vị trí đang tuyển" 
          value={stats.totalJobs} 
          icon={<Briefcase size={24} className="text-primary-600" />} 
          trend="+2 so với tháng trước"
        />
        <StatCard 
          title="Tổng ứng viên" 
          value={stats.totalCandidates} 
          icon={<Users size={24} className="text-blue-500" />} 
          trend="+15% so với tuần trước"
        />
        <StatCard 
          title="Lịch phỏng vấn sắp tới" 
          value={stats.upcomingInterviews} 
          icon={<Calendar size={24} className="text-accent-500" />} 
          highlight
        />
        <StatCard 
          title="Tỷ lệ tuyển thành công" 
          value={`${stats.hiredRate}%`} 
          icon={<CheckCircle size={24} className="text-green-500" />} 
          trend="Ổn định"
        />
      </div>

      {/* Biểu đồ / Thanh tiến trình đơn giản */}
      <div className="bg-surface rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4 text-text-main">Lượng ứng viên theo vị trí tuyển dụng</h2>
        <div className="space-y-4 mt-6">
          {candidatesPerJob.map((item, index) => {
            const maxCount = Math.max(...candidatesPerJob.map(c => c.count));
            const percentage = (item.count / maxCount) * 100;
            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.title}</span>
                  <span className="text-gray-500 font-medium">{item.count} ứng viên</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
          {candidatesPerJob.length === 0 && (
            <p className="text-gray-500 italic text-center py-4">Chưa có dữ liệu ứng viên</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, highlight }) {
  return (
    <div className={`bg-surface rounded-xl p-6 shadow-sm border ${highlight ? 'border-accent-500 ring-1 ring-accent-500' : 'border-gray-100'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className={`text-3xl font-bold mt-2 ${highlight ? 'text-accent-600' : 'text-gray-800'}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${highlight ? 'bg-accent-50' : 'bg-gray-50'}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <p className="text-xs text-gray-500 mt-4 font-medium">{trend}</p>
      )}
    </div>
  );
}
