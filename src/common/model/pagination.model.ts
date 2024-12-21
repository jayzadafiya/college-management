export type PaginationParams = {
  cursor?: number;
  page?: number;
  limit: number;
};

export type PaginationMeta = {
  nextCursor?: number;
  total?: number;
  page?: number;
  totalPages?: number;
  limit: number;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
