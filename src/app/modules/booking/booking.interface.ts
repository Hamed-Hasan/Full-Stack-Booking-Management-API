export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';  // updated 'canceled' to 'cancelled'

export type IBooking = {
    userId: string;
    serviceId: string;
    scheduledDate: Date;
    status?: BookingStatus;
};
