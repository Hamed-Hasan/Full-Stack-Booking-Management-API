import { DaysOfWeek } from './daysOfWeek.type';

export type IAvailability = {
  id?: string;
  serviceId: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  daysOfWeek: DaysOfWeek;
};
