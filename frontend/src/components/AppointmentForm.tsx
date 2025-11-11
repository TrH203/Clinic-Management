import { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = ({ appointment, onClose }: { appointment?: any, onClose: () => void }) => {
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const isEditing = !!appointment;

  useEffect(() => {
    if (isEditing) {
      setDoctorId(appointment.doctor_id);
      setPatientId(appointment.patient_id);
      setAppointmentTime(new Date(appointment.appointment_time).toISOString().slice(0, 16));
    }
  }, [appointment, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const appointmentData = {
      doctor_id: parseInt(doctorId),
      patient_id: parseInt(patientId),
      appointment_time: appointmentTime,
    };

    const request = isEditing
      ? axios.put(`/api/admin/appointments/${appointment.id}`, appointmentData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : axios.post('/api/admin/appointments/', appointmentData, {
          headers: { Authorization: `Bearer ${token}` },
        });

    request.then(() => {
      onClose();
      window.location.reload();
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-6 border w-full max-w-lg shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Chỉnh sửa Lịch hẹn' : 'Thêm Lịch hẹn'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID Bác sĩ</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ID Bệnh nhân</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Thời gian hẹn</label>
            <input
              type="datetime-local"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isEditing ? 'Lưu thay đổi' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
