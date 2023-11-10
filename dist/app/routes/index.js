"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const category_routes_1 = require("../modules/category/category.routes");
const service_routes_1 = require("../modules/services/service.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const profile_routes_1 = require("../modules/profiles/profile.routes");
const review_routes_1 = require("../modules/reviews/review.routes");
const availability_routes_1 = require("../modules/availability/availability.routes");
const blog_routes_1 = require("../modules/blogs/blog.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const notification_routes_1 = require("../modules/notification/notification.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_routes_1.UserRoutes,
    },
    {
        path: '/category',
        routes: category_routes_1.CategoryRoutes,
    },
    {
        path: '/services',
        routes: service_routes_1.ServiceRoutes,
    },
    {
        path: '/cart',
        routes: cart_routes_1.CartItemRoutes,
    },
    {
        path: '/booking',
        routes: booking_routes_1.BookingRoutes,
    },
    {
        path: '/profiles',
        routes: profile_routes_1.ProfileRoutes,
    },
    {
        path: '/reviews',
        routes: review_routes_1.ReviewRoutes,
    },
    {
        path: '/availability',
        routes: availability_routes_1.AvailabilityRoutes,
    },
    {
        path: '/blog',
        routes: blog_routes_1.BlogRoutes,
    },
    {
        path: '/feedback',
        routes: feedback_routes_1.FeedbackRoutes,
    },
    {
        path: '/notification',
        routes: notification_routes_1.NotificationRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
