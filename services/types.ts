export interface PaginatedResponse<T> {
  status: string;
  totalResults: number;
  articles: T[];
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
}
