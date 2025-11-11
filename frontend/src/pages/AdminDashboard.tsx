import { useState } from 'react';
import DoctorManagement from '../components/DoctorManagement';
import PatientManagement from '../components/PatientManagement';
import AppointmentManagement from '../components/AppointmentManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('doctors');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'doctors':
        return <DoctorManagement />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      default:
        return <DoctorManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Trang quản trị</h1>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 text-lg font-medium ${activeTab === 'doctors' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('doctors')}
          >
            Quản lý Bác sĩ
          </button>
          <button
            className={`py-4 px-6 text-lg font-medium ${activeTab === 'patients' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('patients')}
          >
            Quản lý Bệnh nhân
          </button>
          <button
            className={`py-4 px-6 text-lg font-medium ${activeTab === 'appointments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('appointments')}
          >
            Quản lý Lịch hẹn
          </button>
        </div>

        <div className="mt-8">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
