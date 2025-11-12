import { useState } from 'react';
import DoctorList from './DoctorList';
import DoctorForm from './DoctorForm';

const DoctorManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleEdit = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách Bác sĩ</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
          onClick={() => {
            setShowForm(true);
            setSelectedDoctor(null);
          }}
        >
          Thêm Bác sĩ
        </button>
      </div>

      {showForm && (
        <DoctorForm
          doctor={selectedDoctor}
          onClose={handleCloseForm}
        />
      )}

      <DoctorList onEdit={handleEdit} />
    </div>
  );
};

export default DoctorManagement;
