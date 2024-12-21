export const PaginationMessage = {
  CURSOR: 'Cursor for pagination (id of the last item from the previous page)',
  PAGE: 'Page number for pagination (used for page-based pagination)',
  LIMIT: 'Number of items per page',
  INVALID_PAGE: 'Invalid page number',
} as const;

export const PaginationDtoMessage = {
  CURSOR_DESCRIPTION:
    'The cursor for pagination (id of the last item from the previous page)',
  PAGE_DESCRIPTION:
    'The page number for pagination (used for page-based pagination)',
  LIMIT_DESCRIPTION: 'Number of items per page',
} as const;
