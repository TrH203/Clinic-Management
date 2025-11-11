import { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
  id: number;
  title: string;
  content: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    axios.get('/api/news').then((response) => {
      setNews(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">News</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h2 className="text-xl">{item.title}</h2>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
