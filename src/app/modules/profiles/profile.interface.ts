// src/profile/profile.interface.ts

export type IProfile = {
  id?: string;
  userId?: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: Date | null;
  phoneNumber?: string | null;
  address?: string | null;
  bio?: string | null;
  profileImage?: string | null;
};
