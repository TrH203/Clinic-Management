import ServiceHighlight from '../components/ServiceHighlight';
import DoctorProfile from '../components/DoctorProfile';

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Banner Section */}
      <section
        className="bg-cover bg-center h-96 text-white"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1500x600')",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-5xl font-extrabold mb-4">Chào mừng đến với Phòng khám của chúng tôi</h1>
          <p className="text-xl max-w-2xl">
            Chúng tôi tận tâm cung cấp dịch vụ chăm sóc sức khỏe chất lượng cao với lòng trắc ẩn và sự tôn trọng.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="container mx-auto p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Sứ mệnh của chúng tôi</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Sứ mệnh của chúng tôi là nâng cao sức khỏe và hạnh phúc của cộng đồng bằng cách cung cấp dịch vụ chăm sóc sức khỏe toàn diện, lấy bệnh nhân làm trung tâm. Chúng tôi cố gắng tạo ra một môi trường an toàn, chào đón và tôn trọng cho tất cả bệnh nhân.
        </p>
      </section>

      {/* Services Highlight Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Dịch vụ của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceHighlight
              title="Chăm sóc ban đầu"
              description="Dịch vụ chăm sóc ban đầu toàn diện cho mọi lứa tuổi."
            />
            <ServiceHighlight
              title="Chăm sóc chuyên khoa"
              description="Tiếp cận với nhiều chuyên khoa khác nhau."
            />
            <ServiceHighlight
              title="Chẩn đoán"
              description="Dịch vụ chẩn đoán tiên tiến để đảm bảo kết quả chính xác."
            />
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Đội ngũ của chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DoctorProfile
            name="Bác sĩ Nguyễn Văn A"
            specialty="Bác sĩ đa khoa"
            imageUrl="https://via.placeholder.com/150"
          />
          <DoctorProfile
            name="Bác sĩ Trần Thị B"
            specialty="Bác sĩ nhi"
            imageUrl="https://via.placeholder.com/150"
          />
          <DoctorProfile
            name="Bác sĩ Lê Văn C"
            specialty="Bác sĩ tim mạch"
            imageUrl="https://via.placeholder.com/150"
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Thư viện ảnh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://via.placeholder.com/400x300" alt="Phòng khám 1" className="rounded-lg shadow-md" />
            <img src="https://via.placeholder.com/400x300" alt="Phòng khám 2" className="rounded-lg shadow-md" />
            <img src="https://via.placeholder.com/400x300" alt="Phòng khám 3" className="rounded-lg shadow-md" />
            <img src="https://via.placeholder.com/400x300" alt="Phòng khám 4" className="rounded-lg shadow-md" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
