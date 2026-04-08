export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: string;
  tags: string[];
  sources?: string[];
}

export interface ArticlesData {
  articles: Article[];
}
