"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("./notification.controller");
const notification_zod_1 = require("./notification.zod");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create-notification', (0, validateRequest_1.default)(notification_zod_1.NotificationZod.createNotificationSchema), notification_controller_1.NotificationController.createNotification);
router.get('/:id', notification_controller_1.NotificationController.getNotification);
router.put('/:id', (0, validateRequest_1.default)(notification_zod_1.NotificationZod.updateNotificationSchema), notification_controller_1.NotificationController.updateNotification);
router.delete('/:id', notification_controller_1.NotificationController.deleteNotification);
router.get('/', notification_controller_1.NotificationController.listNotifications);
router.get('/user/:userId', notification_controller_1.NotificationController.getUserNotifications);
exports.NotificationRoutes = router;
