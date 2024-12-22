import {
  PaginationMeta,
  PaginationParams,
  PaginationResponse,
} from './model/pagination.model';

/**
 * Retrieves all records of a given model with pagination support.
 * The function supports both page-based and cursor-based pagination.
 * You can specify relations to be included using the `includeRelations` parameter.
 *
 * @param model - The Prisma model to query (e.g., `prisma.college`, `prisma.student`, etc.).
 * @param paginationParams - Pagination parameters containing the `cursor`, `page`, and `limit`.
 *     - `cursor`: The ID of the last record from the previous page for cursor-based pagination (optional).
 *     - `page`: The page number for page-based pagination (optional).
 *     - `limit`: The number of records to fetch per page.
 * @param includeRelations - (Optional) An object to include related records (e.g., `{ city: true, state: true }`).
 *
 * @returns A `PaginationResponse` object containing the paginated data and metadata.
 *     - `data`: The records retrieved, an array of type `T`.
 *     - `meta`: Metadata about the pagination, including total records, current page, and the next cursor (if applicable).
 */
export async function findAll<T>(
  model: any,
  paginationParams: PaginationParams,
  includeRelations: any = {},
  orderBy: any = { id: 'asc' },
): Promise<PaginationResponse<T>> {
  const { cursor, page, limit } = paginationParams;

  let data;
  let meta: PaginationMeta;
  // Page-based pagination
  if (page !== undefined) {
    const skip = (page - 1) * limit;
    data = await model.findMany({
      take: limit,
      skip,
      orderBy: orderBy,
      include: includeRelations,
    });

    const totalRecords = await model.count();
    meta = {
      total: totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
    };
  } else {
    // Cursor-based pagination and default behavior
    data = await model.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: orderBy,
      include: includeRelations,
    });

    meta = {
      nextCursor: data.length ? data[data.length - 1].id : null,
      limit,
    };
  }

  return { data, meta };
}

/**
 * Helper function to perform update operation on any model
 *
 * @param model - The Prisma model you want to update
 * @param where - The condition to find the record
 * @param data - The data to update
 */
export async function updateModel<T>(
  model: any,
  where: object,
  data: object,
): Promise<T> {
  const result = await model.update({
    where,
    data,
  });
  return result;
}
