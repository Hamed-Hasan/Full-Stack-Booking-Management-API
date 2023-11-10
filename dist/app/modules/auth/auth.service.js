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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // Check if user already exists
    const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Email already registered');
    }
    // Hash password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Create new user
    yield prisma_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user.id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in, user.role // Pass the user's role here
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user.id }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in, user.role // Pass the user's role here
    );
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user.needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const user = yield prisma_1.default.user.findUnique({
        where: { id: verifiedToken.userId },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    console.log(user.role);
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user.id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in, user.role);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const user = yield prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isOldPasswordMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isOldPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield prisma_1.default.user.update({
        where: { id: userId },
        data: {
            password: newHashedPassword,
            needsPasswordChange: false,
        },
    });
});
exports.AuthService = {
    registerUser,
    loginUser,
    refreshToken,
    changePassword,
};
