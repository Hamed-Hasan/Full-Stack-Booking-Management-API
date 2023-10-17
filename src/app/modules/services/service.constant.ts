export type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export const ServiceSearchableFields = [
  'name',
  'description',
  'brand',
  'model',
];
export const ServiceSortableFields = ['pricePerHour', 'seatingCapacity'];
export const ServiceFilterableFields = ['fuelType', 'transmission'];
