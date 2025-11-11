import { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_time: string;
}

const AppointmentList = () => {
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

  return (
    <div>
      <h2 className="text-xl font-bold">Appointments</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Doctor ID</th>
            <th className="px-4 py-2">Patient ID</th>
            <th className="px-4 py-2">Appointment Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="border px-4 py-2">{appointment.doctor_id}</td>
              <td className="border px-4 py-2">{appointment.patient_id}</td>
              <td className="border px-4 py-2">{appointment.appointment_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
