import { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = ({ patient, onClose }: { patient?: any, onClose: () => void }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const isEditing = !!patient;

  useEffect(() => {
    if (isEditing) {
      setName(patient.name);
      setDateOfBirth(patient.date_of_birth);
    }
  }, [patient, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const patientData = { name, date_of_birth: dateOfBirth };

    const request = isEditing
      ? axios.put(`/api/admin/patients/${patient.id}`, patientData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : axios.post('/api/admin/patients/', patientData, {
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
        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Chỉnh sửa Bệnh nhân' : 'Thêm Bệnh nhân'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
            <input
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
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

export default PatientForm;
