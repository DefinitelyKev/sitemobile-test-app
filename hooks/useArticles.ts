import { useQuery } from "@tanstack/react-query";
import { searchArticles, getTopHeadlines } from "../services/article/articleService";
import type { SearchArticleParams } from "../services/article/types";

export const useSearchArticles = (params: SearchArticleParams) => {
  return useQuery({
    queryKey: ["articles", "search", params],
    queryFn: () => searchArticles(params),
    enabled: params.q.length > 0,
  });
};

export const useTopHeadlines = (params: Omit<SearchArticleParams, "q">) => {
  return useQuery({
    queryKey: ["articles", "top-headlines", params],
    queryFn: () => getTopHeadlines(params),
  });
};
