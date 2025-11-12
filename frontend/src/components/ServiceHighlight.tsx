interface ServiceHighlightProps {
  title: string;
  description: string;
}

const ServiceHighlight: React.FC<ServiceHighlightProps> = ({ title, description }) => {
  return (
    <div className="p-6 border rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceHighlight;
