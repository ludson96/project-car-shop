export interface IVehicleFilterQuery {
  page?: number;
  limit?: number;
  model?: string;
  color?: string;
  year?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: boolean;
  sortBy?: string;
  order?: 'asc' | 'desc';
  category?: string;
}

export const buildPriceFilter = (
  min?: number,
  max?: number,
): Record<string, number> | undefined => {
  if (!min && !max) return undefined;
  const priceFilter: Record<string, number> = {};
  if (min) priceFilter.$gte = Number(min);
  if (max) priceFilter.$lte = Number(max);
  return priceFilter;
};

const buildTextFilter = (query: IVehicleFilterQuery): Record<string, unknown> => {
  const text: Record<string, unknown> = {};
  if (query.model) text.model = { $regex: query.model, $options: 'i' };
  if (query.color) text.color = { $regex: query.color, $options: 'i' };
  if (query.category) text.category = query.category;
  return text;
};

export const buildVehicleFilter = (query: IVehicleFilterQuery): Record<string, unknown> => {
  const filter = buildTextFilter(query);

  if (query.year) filter.year = Number(query.year);
  if (query.status !== undefined) filter.status = query.status;

  const price = buildPriceFilter(query.minPrice, query.maxPrice);
  if (price) filter.buyValue = price;

  return filter;
};

export const buildSort = (
  sortBy?: string,
  order?: 'asc' | 'desc',
): Record<string, 1 | -1> => {
  if (!sortBy) return {};
  return { [sortBy]: order === 'desc' ? -1 : 1 };
};
