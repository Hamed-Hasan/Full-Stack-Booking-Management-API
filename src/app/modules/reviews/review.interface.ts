/* eslint-disable no-unused-vars */

export enum RatingValue {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
}

export type IReview = {
  id?: string;
  userId: string;
  serviceId: string;
  review: string;
  rating: RatingValue;
};
