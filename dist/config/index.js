"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// config.ts
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = __importDefault(require("cloudinary"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
// Configure Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_student_pass: process.env.DEFAULT_STUDENT_PASS,
    default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
    default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.JWT_SECRET || 'booking-secret',
        refresh_secret: process.env.JWT_REFRESH_SECRET || 'booking-secret',
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    cloudinary: cloudinary_1.default.v2,
};
exports.default = config;
