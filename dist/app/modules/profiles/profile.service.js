"use strict";
// src/profile/profile.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const profiles = yield prisma_1.default.profile.findMany({
        include: {
            user: true,
        },
    });
    return profiles || null;
});
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id: userId },
        include: { profile: true },
    });
    return (user === null || user === void 0 ? void 0 : user.profile) || null;
});
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for profile existence
    const existingProfile = yield prisma_1.default.profile.findUnique({
        where: { userId },
    });
    if (!existingProfile) {
        throw new Error('Profile not found for the provided user ID.');
    }
    // Update the profile
    return yield prisma_1.default.profile.update({
        where: { userId },
        data: payload,
    });
});
const deleteProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.profile.delete({
        where: { userId },
    });
});
exports.ProfileService = {
    getProfiles,
    getProfile,
    updateProfile,
    deleteProfile,
};
