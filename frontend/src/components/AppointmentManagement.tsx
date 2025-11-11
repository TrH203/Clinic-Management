import { useState } from 'react';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';

const AppointmentManagement = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appointment Management</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add Appointment'}
        </button>
      </div>
      {showForm && <AppointmentForm />}
      <AppointmentList />
    </div>
  );
};

export default AppointmentManagement;
