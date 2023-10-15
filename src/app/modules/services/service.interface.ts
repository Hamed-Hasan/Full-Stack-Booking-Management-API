export type FuelType = 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
export type Transmission = 'AUTOMATIC' | 'MANUAL';

export type IService = {
  id?: string;
  name?: string | null;
  description?: string | null;
  pricePerHour: number;
  brand: string;
  model: string;
  fuelType?: FuelType | null | string;
  transmission?: Transmission | null | string;  
  seatingCapacity: number;
  images?: IImage[];
  categoryId: string;
};

export type IImage = {
  id?: string;
  serviceId: string;
  filePath: string;
  createdAt?: Date;
  updatedAt?: Date;
};
