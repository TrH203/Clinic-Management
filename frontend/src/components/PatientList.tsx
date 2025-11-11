import { useEffect, useState } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  date_of_birth: string;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/patients/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setPatients(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Patients</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="border px-4 py-2">{patient.name}</td>
              <td className="border px-4 py-2">{patient.date_of_birth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
