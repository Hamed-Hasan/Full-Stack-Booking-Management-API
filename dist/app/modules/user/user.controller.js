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
exports.UserController = void 0;
const fs_1 = __importDefault(require("fs"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const config_1 = __importDefault(require("../../../config"));
const user_constant_1 = require("./user.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
exports.UserController = {
    getAllUsers: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
        const filters = (0, pick_1.default)(req.query, [
            ...user_constant_1.UserSortableFields,
            ...user_constant_1.UserFilterableFields,
            ...user_constant_1.UserSearchableFields,
        ]);
        const result = yield user_service_1.UserService.listAllUsers(options, filters);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            meta: result.meta,
            data: result.data,
        });
    })),
    getUserById: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.UserService.getUserById(req.params.id);
        (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: user });
    })),
    updateUser: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = JSON.parse(req.body.data);
        let profileImage;
        if (req.file) {
            const uploadResult = yield config_1.default.cloudinary.uploader.upload(req.file.path);
            profileImage = uploadResult.secure_url;
            fs_1.default.unlink(req.file.path, err => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }
        const updatedUser = yield user_service_1.UserService.updateUser(req.params.id, userData, profileImage);
        (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: updatedUser });
    })),
    deleteUser: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_service_1.UserService.deleteUser(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'User deleted successfully.',
        });
    })),
};
