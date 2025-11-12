interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  imageUrl: string;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ title, excerpt, imageUrl }) => {
  return (
    <section className="mb-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        <img src={imageUrl} alt={title} className="md:w-1/2" />
        <div className="p-6 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700">{excerpt}</p>
          <a href="#" className="text-blue-500 hover:underline mt-4">Đọc thêm</a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
