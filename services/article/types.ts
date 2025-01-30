import { PaginationOptions } from "../types";

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface SearchArticleParams extends PaginationOptions {
  q: string;
  language?: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
}
