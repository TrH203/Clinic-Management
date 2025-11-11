import { useState } from 'react';
import DoctorManagement from '../components/DoctorManagement';
import PatientManagement from '../components/PatientManagement';
import AppointmentManagement from '../components/AppointmentManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('doctors');

  return (
    <div className="container mx-auto p-4">
      <div className="flex border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'doctors' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'patients' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'appointments' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
      </div>
      <div className="mt-4">
        {activeTab === 'doctors' && <DoctorManagement />}
        {activeTab === 'patients' && <PatientManagement />}
        {activeTab === 'appointments' && <AppointmentManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
