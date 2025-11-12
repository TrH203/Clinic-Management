import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Doctor {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  appointment_time: string;
  patient: {
    name: string;
  };
}

const DoctorCalendar = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/doctors/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setDoctors(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      const token = localStorage.getItem('token');
      axios.get(`/api/admin/doctors/${selectedDoctorId}/appointments/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        const events = response.data.map((app: Appointment) => ({
          title: `Patient: ${app.patient.name}`,
          start: new Date(app.appointment_time),
          end: new Date(new Date(app.appointment_time).getTime() + 60 * 60 * 1000), // Assuming 1-hour appointments
        }));
        setAppointments(events);
      })
      .catch(error => {
        console.error('Error fetching doctor appointments:', error);
      });
    }
  }, [selectedDoctorId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lịch Bác sĩ</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Chọn Bác sĩ</label>
        <select
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          onChange={(e) => setSelectedDoctorId(parseInt(e.target.value))}
        >
          <option value="">-- Chọn một bác sĩ --</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} (ID: {doctor.id})
            </option>
          ))}
        </select>
      </div>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
};

export default DoctorCalendar;
