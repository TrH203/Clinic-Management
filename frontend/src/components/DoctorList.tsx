import { useEffect, useState } from 'react';
import axios from 'axios';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/doctors/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setDoctors(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Doctors</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Specialty</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td className="border px-4 py-2">{doctor.name}</td>
              <td className="border px-4 py-2">{doctor.specialty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
