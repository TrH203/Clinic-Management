interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, excerpt, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{excerpt}</p>
        <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">Đọc thêm</a>
      </div>
    </div>
  );
};

export default ArticleCard;
