import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/doctors/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setDoctors(res.data));
    axios.get('/api/admin/patients/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPatients(res.data));
  }, []);

  const handleFetchStatistics = () => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();
    if (doctorId) params.append('doctor_id', doctorId.toString());
    if (patientId) params.append('patient_id', patientId.toString());
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    axios.get(`/api/admin/statistics/?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTotalHours(res.data.total_hours));
  };

  const data = [
    { name: 'Total Hours', hours: totalHours },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Thống kê Giờ khám</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <select onChange={(e) => setDoctorId(parseInt(e.target.value) || null)} className="p-2 border rounded">
          <option value="">Chọn Bác sĩ</option>
          {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select onChange={(e) => setPatientId(parseInt(e.target.value) || null)} className="p-2 border rounded">
          <option value="">Chọn Bệnh nhân</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded" />
      </div>
      <button onClick={handleFetchStatistics} className="bg-blue-600 text-white py-2 px-4 rounded mb-6">Lọc</button>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsDashboard;
