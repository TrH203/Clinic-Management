import ArticleCard from '../components/ArticleCard';
import FeaturedArticle from '../components/FeaturedArticle';

const mockNews = [
  {
    id: 1,
    title: 'Những tiến bộ mới trong Chăm sóc Tim mạch',
    excerpt: 'Tìm hiểu về những đột phá mới nhất trong công nghệ và phương pháp điều trị tim mạch.',
    imageUrl: 'https://via.placeholder.com/800x400',
    featured: true,
  },
  {
    id: 2,
    title: 'Lời khuyên Dinh dưỡng cho một Lối sống Lành mạnh',
    excerpt: 'Các chuyên gia dinh dưỡng của chúng tôi chia sẻ những lời khuyên hàng đầu để duy trì một chế độ ăn uống cân bằng.',
    imageUrl: 'https://via.placeholder.com/400x300',
  },
  {
    id: 3,
    title: 'Tầm quan trọng của việc Khám sức khỏe Định kỳ',
    excerpt: 'Đừng đợi đến khi quá muộn. Hãy tìm hiểu tại sao việc khám sức khỏe định kỳ lại quan trọng.',
    imageUrl: 'https://via.placeholder.com/400x300',
  },
  {
    id: 4,
    title: 'Sức khỏe Tâm thần: Phá vỡ sự Kỳ thị',
    excerpt: 'Tham gia cùng chúng tôi trong cuộc trò chuyện về sức khỏe tâm thần và cách tìm kiếm sự giúp đỡ.',
    imageUrl: 'https://via.placeholder.com/400x300',
  },
];

const News = () => {
  const featuredArticle = mockNews.find((article) => article.featured);
  const otherArticles = mockNews.filter((article) => !article.featured);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Tin tức & Cập nhật</h1>

      {/* Featured Article */}
      {featuredArticle && (
        <FeaturedArticle
          title={featuredArticle.title}
          excerpt={featuredArticle.excerpt}
          imageUrl={featuredArticle.imageUrl}
        />
      )}

      {/* Other Articles */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              imageUrl={article.imageUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
