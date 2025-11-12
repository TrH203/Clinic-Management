import { useState, useEffect } from 'react';
import axios from 'axios';

interface Appointment {
  id: number;
  appointment_time: string;
  patient: {
    name: string;
  }
}

const DoctorSchedule = ({ doctorId }: { doctorId: number | null }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctorId) {
      setLoading(true);
      const token = localStorage.getItem('token');
      axios.get(`/api/admin/doctors/${doctorId}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor schedule:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [doctorId]);

  if (!doctorId) {
    return <p className="text-gray-500">Vui lòng chọn một bác sĩ để xem lịch trình của họ.</p>;
  }

  if (loading) {
    return <p>Đang tải lịch trình...</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Lịch trình của Bác sĩ</h3>
      {appointments.length > 0 ? (
        <ul className="space-y-2">
          {appointments.map(app => (
            <li key={app.id} className="p-2 bg-gray-100 rounded-md">
              <p className="font-semibold">{new Date(app.appointment_time).toLocaleString()}</p>
              <p>Bệnh nhân: {app.patient.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Bác sĩ này không có lịch hẹn nào.</p>
      )}
    </div>
  );
};

export default DoctorSchedule;
