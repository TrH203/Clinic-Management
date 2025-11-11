import { useState } from 'react';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';

const AppointmentManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleEdit = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách Lịch hẹn</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
          onClick={() => {
            setShowForm(true);
            setSelectedAppointment(null);
          }}
        >
          Thêm Lịch hẹn
        </button>
      </div>

      {showForm && (
        <AppointmentForm
          appointment={selectedAppointment}
          onClose={handleCloseForm}
        />
      )}

      <AppointmentList onEdit={handleEdit} />
    </div>
  );
};

export default AppointmentManagement;
