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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const service_constant_1 = require("./service.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const listAllServices = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(options);
    // Build the WHERE condition for filtering and searching
    const andConditions = [];
    // Handling search
    if (filters.searchTerm) {
        andConditions.push({
            OR: service_constant_1.ServiceSearchableFields.map(field => ({
                [field]: { contains: filters.searchTerm, mode: 'insensitive' },
            })),
        });
    }
    // Handling filtering
    service_constant_1.ServiceFilterableFields.forEach(field => {
        if (filters[field]) {
            andConditions.push({ [field]: { equals: filters[field] } });
        }
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // Execute the query with pagination, sorting, and filtering
    const services = yield prisma_1.default.service.findMany({
        include: {
            images: true,
            availabilities: true,
            bookings: true,
            cartItems: true,
            category: true,
            reviews: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.service.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: services,
    };
});
const createService = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    // for multer
    const { images } = serviceData, rest = __rest(serviceData, ["images"]);
    const imageCreateInputs = (images === null || images === void 0 ? void 0 : images.map(image => ({
        filePath: image.filePath,
    }))) || [];
    const service = yield prisma_1.default.service.create({
        data: Object.assign(Object.assign({}, rest), { 
            // for multer
            images: {
                create: imageCreateInputs,
            } }),
        include: {
            images: true,
            category: true,
        },
    });
    return service;
});
const getService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.service.findUnique({ where: { id: serviceId } });
    return service;
});
const updateService = (serviceId, serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.service.update({
        where: { id: serviceId },
        data: serviceData,
    });
    return service;
});
const deleteService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.service.delete({ where: { id: serviceId } });
    return service;
});
const deleteMultipleServices = (serviceIds) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedServices = [];
    const notFoundServices = [];
    for (const serviceId of serviceIds) {
        try {
            const service = yield prisma_1.default.service.delete({
                where: { id: serviceId },
            });
            deletedServices.push(service);
        }
        catch (error) {
            // Check for specific error message indicating not found
            if (error.message.includes('Record to delete does not exist')) {
                notFoundServices.push(serviceId);
            }
            else {
                // Handle other errors
                console.error(error);
            }
        }
    }
    return { deletedServices, notFoundServices };
});
exports.ServiceService = {
    createService,
    getService,
    updateService,
    deleteService,
    listAllServices,
    deleteMultipleServices
};
