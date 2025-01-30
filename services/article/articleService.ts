import ApiClient from "../apiClient";
import { Article, SearchArticleParams } from "./types";
import { PaginatedResponse } from "../types";

/**
 * Search for articles based on query parameters
 */
export const searchArticles = async (params: SearchArticleParams): Promise<PaginatedResponse<Article>> => {
  try {
    const { data } = await ApiClient.get<PaginatedResponse<Article>>("/everything", {
      params: {
        ...params,
        language: params.language || "en",
        sortBy: params.sortBy || "publishedAt",
        pageSize: params.pageSize || 20,
      },
    });
    return data;
  } catch (error) {
    console.error("Error searching articles:", error);
    throw error;
  }
};

/**
 * Get top headlines
 */
export const getTopHeadlines = async (params: Omit<SearchArticleParams, "q">): Promise<PaginatedResponse<Article>> => {
  try {
    const { data } = await ApiClient.get<PaginatedResponse<Article>>("/top-headlines", {
      params: {
        country: "us", // default to US news
        ...params,
        pageSize: params.pageSize || 20,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
};
