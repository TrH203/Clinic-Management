import { useEffect, useState } from 'react';
import axios from 'axios';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  date_of_birth: string;
}

const DoctorList = ({ onEdit }: { onEdit: (doctor: Doctor) => void }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/doctors/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setDoctors(response.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này không?')) {
      const token = localStorage.getItem('token');
      axios.delete(`/api/admin/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        setDoctors(doctors.filter(d => d.id !== id));
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chuyên khoa</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sinh</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.specialty}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.date_of_birth}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button
                  onClick={() => onEdit(doctor)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
