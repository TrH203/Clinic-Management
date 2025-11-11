import { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_time: string;
}

const AppointmentList = ({ onEdit }: { onEdit: (appointment: Appointment) => void }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/appointments/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setAppointments(response.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này không?')) {
      const token = localStorage.getItem('token');
      axios.delete(`/api/admin/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        setAppointments(appointments.filter(a => a.id !== id));
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Bác sĩ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Bệnh nhân</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian hẹn</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.doctor_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.patient_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(appointment.appointment_time).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button
                  onClick={() => onEdit(appointment)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(appointment.id)}
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

export default AppointmentList;
