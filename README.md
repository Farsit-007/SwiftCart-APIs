# 🚀 SwiftCart (Backend)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 📌 Overview

RESTful API for SwiftCart e-commerce platform, built with Node.js, Express, and
MongoDB. Handles product management, user authentication, payments, and order
processing.

## 🌍 Live URLs

- Frontend:
  [https://swift-cart-mocha.vercel.app](https://swift-cart-mocha.vercel.app)
- Backend:
  [https://swiftcart-server-silk.vercel.app](https://swiftcart-server-silk.vercel.app)

## 📂 Repository Links

- [Frontend](https://github.com/khaledssbd/SwiftCart)
- [Backend](https://github.com/khaledssbd/SwiftCart-APIs)

## 🛠️ Key Features

- **User Authentication**: JWT-based secure login/registration
- **Product Management**: Full CRUD operations for products
- **Order Processing**: Complete order lifecycle management
- **Payment Integration**: Stripe/SSLCommerz payment processing
- **Search & Filtering**: Advanced product search capabilities
- **Review System**: Product ratings and reviews
- **Admin Dashboard**: Comprehensive admin controls

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, bcrypt
- **Payments**: Stripe/SSLCommerz integration
- **Image Storage**: Cloudinary
- **Email**: Nodemailer

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js ≥18.x
- MongoDB ≥6.x

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/khaledssbd/SwiftCart-APIs.git
   cd SwiftCart-APIs
   ```

2. Install dependencies

   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables in a `.env` file:

   ```bash
   NODE_ENV="development"
   PORT=5000
   DB_URL="mongodb_URI"

   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET="<your_access_secret>" JWT_ACCESS_EXPIRES_IN=7d
   JWT_REFRESH_SECRET="<your_refresh_secret>" JWT_REFRESH_EXPIRES_IN=1y
   JWT_OTP_SECRET="<your_otp_secret>"
   JWT_PASS_RESET_SECRET="<your_pass_reset_secret>" JWT_PASS_RESET_EXPIRES_IN=15m

   CLOUDINARY_CLOUD_NAME="<your_cloudinary_cloud_name>"
   CLOUDINARY_API_KEY="<your_cloudinary_api_key>"
   CLOUDINARY_API_SECRET="<your_cloudinary_api_secret>"

   SENDER_EMAIL="<your_email>"
   SENDER_APP_PASS="<your_app_password>"

   STORE_NAME="teststore"
   PAYMENT_API="https://sandbox.sslcommerz.com/gwprocess/v3/api.php"
   VALIDATION_API="https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
   STORE_ID="<your_store_id>"
   STORE_PASSWORD="<your_store_password>"
   VALIDATION_URL="<your_validation_url>"
   SUCCESS_URL="<your_success_url>"
   FAILED_URL="<your_failed_url>"
   CANCEL_URL="<your_cancel_url>"
   ```

4. Start the server
   ```bash
   npm run dev
   ```

## License

MIT (do whatever you want to do :smile: )
