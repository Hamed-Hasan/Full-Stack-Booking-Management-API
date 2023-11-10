"use strict";
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
exports.NotificationService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createNotification = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.notification.create({ data: payload });
});
const getUserNotifications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.notification.findMany({
        where: { userId },
        include: { user: true },
    });
});
const getNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.notification.findUnique({
        where: { id },
        include: { user: true },
    });
});
const updateNotification = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.notification.update({ where: { id }, data: payload });
});
const deleteNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.notification.delete({ where: { id } });
});
const listNotifications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.notification.findMany({
        where: { userId },
        include: { user: true },
    });
});
exports.NotificationService = {
    createNotification,
    getUserNotifications,
    getNotification,
    updateNotification,
    deleteNotification,
    listNotifications,
};
