import { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('/api/admin/appointments/', {
      doctor_id: parseInt(doctorId),
      patient_id: parseInt(patientId),
      appointment_time: appointmentTime,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      // Reload the list of appointments
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorId">
            Doctor ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="doctorId"
            type="number"
            placeholder="Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
            Patient ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="patientId"
            type="number"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appointmentTime">
            Appointment Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="appointmentTime"
            type="datetime-local"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
