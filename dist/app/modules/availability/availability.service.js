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
exports.AvailabilityService = void 0;
// availability.service.ts
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createAvailability = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert date strings to Date objects
    const startDate = new Date(payload.startDate);
    const endDate = new Date(payload.endDate);
    return yield prisma_1.default.availability.create({
        data: Object.assign(Object.assign({}, payload), { startDate,
            endDate }),
    });
});
const getAvailability = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma_1.default.availability.findUnique({
        where: { id },
        include: { service: true },
    });
    return response;
});
const updateAvailability = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startDate = payload.startDate
            ? new Date(payload.startDate)
            : undefined;
        const endDate = payload.endDate ? new Date(payload.endDate) : undefined;
        return yield prisma_1.default.availability.update({
            where: { id },
            data: Object.assign(Object.assign({}, payload), { startDate,
                endDate }),
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025') {
            throw new Error(`Record with id ${id} not found`);
        }
        throw error;
    }
});
const deleteAvailability = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.availability.delete({ where: { id } });
});
const listAvailabilities = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.availability.findMany({ include: { service: true } });
});
exports.AvailabilityService = {
    createAvailability,
    getAvailability,
    updateAvailability,
    deleteAvailability,
    listAvailabilities,
};
