"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create-booking', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.bookingZodSchema), booking_controller_1.BookingController.createBooking);
router.get('/:id', booking_controller_1.BookingController.getBooking);
router.put('/:id', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.updateBookingZodSchema), booking_controller_1.BookingController.updateBooking);
router.delete('/:id', booking_controller_1.BookingController.deleteBooking);
router.get('/', booking_controller_1.BookingController.listBookings);
router.get('/booked-user/:userId', booking_controller_1.BookingController.listUserBookings);
exports.BookingRoutes = router;
