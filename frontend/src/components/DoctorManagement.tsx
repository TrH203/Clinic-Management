import { useState } from 'react';
import DoctorList from './DoctorList';
import DoctorForm from './DoctorForm';

const DoctorManagement = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Doctor Management</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add Doctor'}
        </button>
      </div>
      {showForm && <DoctorForm />}
      <DoctorList />
    </div>
  );
};

export default DoctorManagement;
