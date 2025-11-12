import { useState } from 'react';
import PatientList from './PatientList';
import PatientForm from './PatientForm';

const PatientManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleEdit = (patient: any) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPatient(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách Bệnh nhân</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
          onClick={() => {
            setShowForm(true);
            setSelectedPatient(null);
          }}
        >
          Thêm Bệnh nhân
        </button>
      </div>

      {showForm && (
        <PatientForm
          patient={selectedPatient}
          onClose={handleCloseForm}
        />
      )}

      <PatientList onEdit={handleEdit} />
    </div>
  );
};

export default PatientManagement;
