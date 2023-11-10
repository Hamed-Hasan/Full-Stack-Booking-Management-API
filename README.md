### Booking Management API DEVELOPMENT


Check out the live [here](https://full-stack-booking-management-api.vercel.app)

## Overview

Welcome to the Booking Management Backend repository, an unparalleled solution at the intersection of innovation and reliability! This project stands as a cornerstone for orchestrating a resilient backend system that meticulously oversees service bookings, user roles, and community reviews. Meticulously crafted, it adheres to a cutting-edge modular design pattern, ensuring not only scalability but also unmatched flexibility.

Embark on a journey with us to revolutionize the way services are managed, user roles are defined, and experiences are shared. This powerhouse backend is meticulously engineered to be the bedrock of efficiency, bringing together seamless service booking, comprehensive user role administration, and a vibrant community-driven review ecosystem.


## Features

- **Role-Based Authentication:** Three user roles - User, Admin, and Super Admin.
- **Service Booking:** Users can easily book any service.
- **Reviews:** Share your experiences with the community.
- **Dashboards:** Three separate dashboards for User, Admin, and Super Admin.
- **Admin Control:** Admins manage users, while Super Admins oversee everything.
- **Modular Design:** Developed using a modular pattern for scalability.
- **Email Notifications:** Users receive email notifications for booking confirmations and updates.
- **Search Functionality:** Efficient search functionality for services and reviews.
- **Real-Time Updates:** Real-time updates for bookings and reviews using WebSocket.
- **Data Validation:** Robust data validation using Zod to ensure data integrity.
- **Error Handling:** Comprehensive error handling for a smooth user experience.
- **API Documentation:** Well-documented API endpoints for easy integration.
- **User Profiles:** Customizable user profiles with profile pictures and preferences.
- **Localization:** Multi-language support for a global user base.
- **Responsive Design:** A responsive design for seamless user experience across devices.
- **Analytics Dashboard:** Admins can view analytics and insights for better decision-making.
- **Role Permissions:** Fine-grained permissions for each user role.
- **Payment Integration:** Secure payment integration for service bookings.
- **Feedback System:** Users can provide feedback on services and overall experience.
- **Security Measures:** Implementation of security best practices to protect user data.
- **Automated Testing:** Comprehensive test suite for robust code quality.
- **Git Hooks:** Pre-commit and pre-push hooks for code consistency.


## 🚀 API Endpoints

### 🌐 Auth Module
- **Register User**: `POST /api/v1/auth/register`
- **Login User**: `POST /api/v1/auth/login`
- **Refresh Token**: `POST /api/v1/auth/refresh-token`
- **Change Password**: `POST /api/v1/auth/change-password`

### 📅 Availability Module
- **Add Availability**: `POST /api/v1/availability/add`
- **Get Availability by ID**: `GET /api/v1/availability/:id`
- **Update Availability by ID**: `PUT /api/v1/availability/:id`
- **Delete Availability by ID**: `DELETE /api/v1/availability/:id`
- **List All Availabilities**: `GET /api/v1/availability/`

### 📝 Blog Module
- **Create Blog Post**: `POST /api/v1/blog/create`
- **Get Blog Post by ID**: `GET /api/v1/blog/:id`
- **Update Blog Post by ID**: `PUT /api/v1/blog/:id`
- **Delete Blog Post by ID**: `DELETE /api/v1/blog/:id`
- **List All Blog Posts**: `GET /api/v1/blog/`

### 📅 Booking Module
- **Create Booking**: `POST /api/v1/booking/create-booking`
- **Get Booking by ID**: `GET /api/v1/booking/:id`
- **Update Booking by ID**: `PUT /api/v1/booking/:id`
- **Delete Booking by ID**: `DELETE /api/v1/booking/:id`
- **List All Bookings**: `GET /api/v1/booking/`
- **List User Bookings**: `GET /api/v1/booking/booked-user/:userId`

### 🛒 Cart Module
- **Add Cart Item**: `POST /api/v1/cart/add`
- **Update Cart Item by ID**: `PUT /api/v1/cart/:id`
- **Remove Cart Item by ID**: `DELETE /api/v1/cart/:id`
- **List Cart Items by User ID**: `GET /api/v1/cart/user/:userId`
- **Get Cart Item by ID**: `GET /api/v1/cart/:id`

### 🗂️ Category Module
- **Create Category**: `POST /api/v1/category/create-category`
- **Bulk Create Categories**: `POST /api/v1/category/bulk-create`
- **Get Category by ID**: `GET /api/v1/category/:id`
- **Update Category by ID**: `PUT /api/v1/category/:id`
- **Delete Category by ID**: `DELETE /api/v1/category/:id`
- **List All Categories**: `GET /api/v1/category/`

### 💬 Feedback Module
- **Create Feedback**: `POST /api/v1/feedback/create-feedback`
- **Get Feedback by ID**: `GET /api/v1/feedback/:id`
- **Update Feedback by ID**: `PUT /api/v1/feedback/:id`
- **Delete Feedback by ID**: `DELETE /api/v1/feedback/:id`
- **List All Feedbacks**: `GET /api/v1/feedback/`

### 📩 Notification Module
- **Create Notification**: `POST /api/v1/notification/create-notification`
- **Get Notification by ID**: `GET /api/v1/notification/:id`
- **Update Notification by ID**: `PUT /api/v1/notification/:id`
- **Delete Notification by ID**: `DELETE /api/v1/notification/:id`
- **List All Notifications**: `GET /api/v1/notification/`
- **List User Notifications**: `GET /api/v1/notification/user/:userId`

### 👤 Profile Module
- **Get All Profiles**: `GET /api/v1/profiles/all-profile`
- **Get Specific Profile by User ID**: `GET /api/v1/profiles/specific-profile/:userId`
- **Update Profile by User ID**: `PATCH /api/v1/profiles/update-profile/:userId`
- **Delete Profile by User ID**: `DELETE /api/v1/profiles/delete-profile/:userId`

### 🌟 Review Module
- **Create Review**: `POST /api/v1/reviews/create-review`
- **Get All Reviews**: `GET /api/v1/reviews/all-reviews`
- **Get Review by ID**: `GET /api/v1/reviews/:id`
- **Get User Reviews by User ID**: `GET /api/v1/reviews/user/:userId`
- **Update Review by ID**: `PATCH /api/v1/reviews/:id`
- **Delete Review by ID**: `DELETE /api/v1/reviews/:id`

### 🚀 Service Module
- **Create Services**: `POST /api/v1/services/create-services`
- **Get Service by Service ID**: `GET /api/v1/services/:serviceId`
- **Update Service by Service ID**: `PUT /api/v1/services/:serviceId`
- **Delete Service by Service ID**: `DELETE /api/v1/services/:serviceId`
- **Delete Multiple Services**: `DELETE /api/v1/services/delete-multiple`
- **List All Services**: `GET /api/v1/services/`

### 👥 User Module
- **Get All Users**: `GET /api/v1/users/all-users`
- **Get User by ID**: `GET /api/v1/users/:id`
- **Update User by ID**: `PUT /api/v1/users/:id`
- **Delete User by ID**: `DELETE /api/v1/users/:id`



## Tech Stack

- **Languages:** TypeScript - A statically typed superset of JavaScript for enhanced code quality.
- **Framework:** Express.js - A fast, unopinionated, minimalist web framework for Node.js.
- **Database:** Prisma - Modern database access toolkit with type-safe queries.
- **Authentication:** JSON Web Tokens (JWT) - Secure and efficient user authentication.
- **Logging:** Winston with Daily Rotate File - Robust logging with daily log rotation for easy debugging.
- **File Upload:** Multer - Middleware for handling file uploads with ease.
- **Cloud Storage:** Cloudinary - Reliable cloud storage for seamless file management.
- **Validation:** Zod - Powerful runtime type checking and validation for data integrity.
- **Middleware:** CORS, Cookie Parser - Cross-Origin Resource Sharing and cookie parsing for secure communication.
- **Environment Variables:** dotenv - Loading environment variables from a .env file for configuration.
- **Linting:** ESLint with Prettier - Ensuring code consistency, style, and formatting for clean and maintainable code.

- **Real-Time Communication:** WebSocket - Enabling real-time updates for a dynamic user experience.
- **Testing Framework:** Jest - Robust testing for ensuring code quality and reliability.
- **Containerization:** Docker - Streamlining deployment and scalability with containerization.
- **Orchestration:** Kubernetes - Efficiently managing containerized applications in a clustered environment.
- **API Documentation:** Swagger/OpenAPI - Clear and interactive API documentation for seamless integration.
- **Payment Integration:** SSLCommerze - Secure and seamless payment processing for service bookings.

## 🌠 Postman API Documentation

Explore and test the API endpoints using [Postman](https://documenter.getpostman.com/view/20661145/2s9YXk2g2h)!


## Installation

1. Clone the repository.
2. Run `yarn install` to install dependencies.
3. Set up your environment variables using the provided `.env` example.

## Contributing

We welcome contributions! Please follow our [contribution guidelines](https://www.linkedin.com/in/hamed-hasan) before submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](https://hamedhasan-dev.vercel.app) file for details.

## About the Author

- **Author:** Hamed Hasan
- **Location:** Saudi Arabia

Feel free to explore, contribute, and enjoy building innovative features with Booking Management Backend!
