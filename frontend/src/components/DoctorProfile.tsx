interface DoctorProfileProps {
  name: string;
  specialty: string;
  imageUrl: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ name, specialty, imageUrl }) => {
  return (
    <div className="text-center">
      <img
        src={imageUrl}
        alt={`Bác sĩ ${name}`}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{specialty}</p>
    </div>
  );
};

export default DoctorProfile;
