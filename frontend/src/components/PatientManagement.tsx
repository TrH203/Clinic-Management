import { useState } from 'react';
import PatientList from './PatientList';
import PatientForm from './PatientForm';

const PatientManagement = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patient Management</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add Patient'}
        </button>
      </div>
      {showForm && <PatientForm />}
      <PatientList />
    </div>
  );
};

export default PatientManagement;
