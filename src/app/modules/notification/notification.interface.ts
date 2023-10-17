export type INotification = {
  id?: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt?: Date;
};
