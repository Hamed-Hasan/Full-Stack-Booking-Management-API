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
exports.FeedbackService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createFeedback = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.feedback.create({
        data: payload,
        include: { user: true },
    });
});
const getFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.feedback.findUnique({
        where: { id },
        include: { user: true },
    });
});
const updateFeedback = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.feedback.update({
        where: { id },
        data: payload,
        include: { user: true },
    });
});
const deleteFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.feedback.delete({ where: { id } });
});
const listFeedback = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.feedback.findMany({ include: { user: true } });
});
exports.FeedbackService = {
    createFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback,
    listFeedback,
};
