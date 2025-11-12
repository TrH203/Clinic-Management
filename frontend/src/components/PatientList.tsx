import { useEffect, useState } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  date_of_birth: string;
}

const PatientList = ({ onEdit }: { onEdit: (patient: Patient) => void }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/patients/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setPatients(response.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bệnh nhân này không?')) {
      const token = localStorage.getItem('token');
      axios.delete(`/api/admin/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        setPatients(patients.filter(p => p.id !== id));
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sinh</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{patient.date_of_birth}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button
                  onClick={() => onEdit(patient)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
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

export default PatientList;
