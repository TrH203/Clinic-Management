import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Doctor {
  id: number;
  name: string;
}

interface Patient {
  id: number;
  name: string;
}

const StatisticsDashboard = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedDoctors, setSelectedDoctors] = useState<any[]>([]);
  const [selectedPatients, setSelectedPatients] = useState<any[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stats, setStats] = useState<any>({ doctor_stats: [], patient_trend: [], patient_visits: [] });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/doctors/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setDoctors(res.data.map(d => ({ value: d.id, label: d.name }))));
    axios.get('/api/admin/patients/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPatients(res.data.map(p => ({ value: p.id, label: p.name }))));
  }, []);

  const handleFetchStatistics = () => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();
    selectedDoctors.forEach(d => params.append('doctor_ids', d.value));
    selectedPatients.forEach(p => params.append('patient_ids', p.value));
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    axios.get(`/api/admin/statistics/?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStats(res.data));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Thống kê Nâng cao</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Select isMulti options={doctors} onChange={setSelectedDoctors} placeholder="Chọn Bác sĩ" />
        <Select isMulti options={patients} onChange={setSelectedPatients} placeholder="Chọn Bệnh nhân" />
        <div className="flex space-x-2">
          <input type="date" onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded w-full" />
          <input type="date" onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded w-full" />
        </div>
      </div>
      <button onClick={handleFetchStatistics} className="bg-blue-600 text-white py-2 px-4 rounded mb-6">Lọc</button>

      {/* Doctor Statistics */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Thống kê Bác sĩ</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.doctor_stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_hours" name="Tổng giờ khám" fill="#8884d8" />
            <Bar dataKey="visit_count" name="Số lượt khám" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Patient Statistics */}
      <div>
        <h3 className="text-xl font-bold mb-4">Thống kê Bệnh nhân</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Xu hướng Bệnh nhân</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.patient_trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="patient_count" name="Số bệnh nhân" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Xu hướng Giờ khám</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.patient_trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_hours" name="Tổng giờ khám" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-2">Lượt khám theo Bệnh nhân</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.patient_visits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="patient_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visit_count" name="Số lượt khám" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
