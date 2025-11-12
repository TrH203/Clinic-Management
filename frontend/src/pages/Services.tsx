import { useState } from 'react';
import axios from 'axios';

const mockServices = [
  {
    id: 1,
    name: 'Khám tổng quát',
    description: 'Dịch vụ khám sức khỏe toàn diện để đánh giá tổng thể sức khỏe của bạn.',
    icon: '🩺',
  },
  {
    id: 2,
    name: 'Phục hồi sau phẩu thuật',
    description: 'Chuyên phục hồi chức năng cho người sau khi phẩu thuật',
    icon: '❤️',
  },
  {
    id: 3,
    name: 'Phục hồi sau chấn thương',
    description: 'Chuyên phục hồi chức năng cho người sau chấn thương',
    icon: '💎',
  },
];

const Services = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/consultations', { name, age: parseInt(age), phone });
      setSubmitted(true);
      setName('');
      setAge('');
      setPhone('');
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu tư vấn:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Dịch vụ của chúng tôi</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {mockServices.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-5xl mb-4">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Đăng ký Tư vấn</h2>
      {submitted ? (
        <p className="text-center text-green-500">Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn sớm.</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Tên
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Tuổi
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              placeholder="Tuổi của bạn"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Số điện thoại của bạn"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Gửi yêu cầu
          </button>
        </form>
      )}
    </div>
  );
};

export default Services;
