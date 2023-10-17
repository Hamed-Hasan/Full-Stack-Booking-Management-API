// src/profile/profile.service.ts

import prisma from '../../../shared/prisma';
import { IProfile } from './profile.interface';

const getProfiles = async (): Promise<IProfile[] | null> => {
  const profiles = await prisma.profile.findMany({
    include: {
      user: true,
    },
  });
  return profiles || null;
};

const getProfile = async (userId: string): Promise<IProfile | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
  return user?.profile || null;
};

const updateProfile = async (userId: string, payload: Partial<IProfile>) => {
  // Check for profile existence
  const existingProfile = await prisma.profile.findUnique({
    where: { userId },
  });
  if (!existingProfile) {
    throw new Error('Profile not found for the provided user ID.');
  }

  // Update the profile
  return await prisma.profile.update({
    where: { userId },
    data: payload,
  });
};

const deleteProfile = async (userId: string): Promise<IProfile> => {
  return await prisma.profile.delete({
    where: { userId },
  });
};

export const ProfileService = {
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};
