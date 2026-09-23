# 🛒 E-Commerce Platform API

### AIWT Lab 03 — E-Commerce Platform API Modernization

A modern, RESTful E-Commerce Platform API built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project modernizes a traditional e-commerce backend by implementing **RESTful resource URLs, API versioning, standardized HTTP status codes, validation, filtering, pagination, field selection, consistent error handling, and idempotent PUT operations**.

---

## 🚀 Features

- ✅ RESTful API Architecture
- ✅ API Versioning with `/api/v1/`
- ✅ Product CRUD Operations
- ✅ Noun-Based Resource URLs
- ✅ MongoDB Database Integration
- ✅ Mongoose Data Modeling
- ✅ Product Validation
- ✅ Category Filtering
- ✅ Pagination
- ✅ Field Selection
- ✅ Over-Fetching Reduction
- ✅ Idempotent PUT Updates
- ✅ Standardized Error Responses
- ✅ Proper HTTP Status Codes
- ✅ Environment Variable Support
- ✅ Postman API Testing

---

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB ODM |
| **dotenv** | Environment variable management |
| **Nodemon** | Development server |

---

## 📁 Project Structure

```text
ecommerce-api/
│
├── controllers/
│   └── productController.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── middleware/
│   └── errorHandler.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/MunazaMunir-dev/api-modernization.git
```

## 2. Navigate to the Project

```bash
cd api-modernization
```

## 3. Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_api
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

> ⚠️ **Never commit your `.env` file to GitHub.**

The project uses `.env.example` to show the required configuration without exposing credentials.

---

# ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

### Production/Normal Mode

```bash
npm start
```

The server will run on:

```text
http://localhost:5000
```

Test the root endpoint:

```http
GET http://localhost:5000
```

Expected response:

```json
{
  "message": "E-Commerce Platform API is running"
}
```

---

# 🌐 API Base URL

All product endpoints use the following base URL:

```text
http://localhost:5000/api/v1/products
```

The API uses versioning:

```text
/api/v1/
```

API versioning makes it possible to introduce future API versions without breaking existing clients.

---

# 📦 Product API

## Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/products` | Get all products |
| GET | `/api/v1/products/:id` | Get a single product |
| POST | `/api/v1/products` | Create a product |
| PUT | `/api/v1/products/:id` | Update a product |
| DELETE | `/api/v1/products/:id` | Delete a product |

The API follows **noun-based resource URLs**.

### Example

Recommended:

```http
GET /api/v1/products
```

Instead of:

```http
GET /getProducts
```

---

# 1️⃣ Get All Products

### Request

```http
GET /api/v1/products
```

Example:

```text
http://localhost:5000/api/v1/products
```

### Response

```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 2,
  "products": [
    {
      "_id": "PRODUCT_ID",
      "title": "iPhone 15",
      "price": 250000,
      "category": "electronics",
      "description": "Apple smartphone",
      "vendor": "Apple",
      "stock": 20
    }
  ]
}
```

---

# 2️⃣ Create a Product

### Request

```http
POST /api/v1/products
```

### Headers

```text
Content-Type: application/json
```

### Request Body

```json
{
  "title": "iPhone 15",
  "price": 250000,
  "category": "electronics",
  "description": "Apple smartphone",
  "vendor": "Apple",
  "stock": 20
}
```

### Response

**201 Created**

```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "PRODUCT_ID",
    "title": "iPhone 15",
    "price": 250000,
    "category": "electronics",
    "description": "Apple smartphone",
    "vendor": "Apple",
    "stock": 20
  }
}
```

---

# 3️⃣ Get a Single Product

### Request

```http
GET /api/v1/products/:id
```

Example:

```text
http://localhost:5000/api/v1/products/PRODUCT_ID
```

### Response

```json
{
  "success": true,
  "product": {
    "_id": "PRODUCT_ID",
    "title": "iPhone 15",
    "price": 250000,
    "category": "electronics",
    "description": "Apple smartphone",
    "vendor": "Apple",
    "stock": 20
  }
}
```

---

# 4️⃣ Update a Product

### Request

```http
PUT /api/v1/products/:id
```

### Request Body

```json
{
  "title": "iPhone 15 Updated",
  "price": 240000,
  "category": "electronics",
  "description": "Updated Apple smartphone",
  "vendor": "Apple",
  "stock": 25
}
```

### Response

**200 OK**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "PRODUCT_ID",
    "title": "iPhone 15 Updated",
    "price": 240000,
    "category": "electronics",
    "description": "Updated Apple smartphone",
    "vendor": "Apple",
    "stock": 25
  }
}
```

---

# 🔁 Idempotent PUT

The `PUT` method is designed to be **idempotent**.

If the same PUT request is sent multiple times, the resource remains in the same final state rather than creating duplicate products.

Example:

```http
PUT /api/v1/products/PRODUCT_ID
```

Sending the same request repeatedly produces the same final state for that product.

---

# 5️⃣ Delete a Product

### Request

```http
DELETE /api/v1/products/:id
```

Example:

```text
http://localhost:5000/api/v1/products/PRODUCT_ID
```

### Response

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

# 🔎 Filtering

Products can be filtered using query parameters.

### Filter by Category

```http
GET /api/v1/products?category=electronics
```

Example:

```text
http://localhost:5000/api/v1/products?category=electronics
```

This returns products belonging to the selected category.

---

# 📄 Pagination

Pagination prevents the API from returning the entire product catalog in a single response.

### Request

```http
GET /api/v1/products?page=1&limit=2
```

### Parameters

| Parameter | Description |
|---|---|
| `page` | Page number |
| `limit` | Number of products per page |

Example:

```http
GET /api/v1/products?page=2&limit=5
```

This requests the second page with up to five products.

---

# 🔎 Filtering + Pagination

Filtering and pagination can be used together.

```http
GET /api/v1/products?category=electronics&page=1&limit=2
```

This means:

- Category: `electronics`
- Page: `1`
- Products per page: `2`

---

# ⚡ Field Selection

### Solving REST API Over-Fetching

Over-fetching occurs when an API returns more information than the client actually needs.

For example, a mobile application may only require:

```text
title
price
```

Instead of returning the complete product object, the API supports field selection.

### Request

```http
GET /api/v1/products/PRODUCT_ID?fields=title,price
```

### Response

```json
{
  "success": true,
  "product": {
    "title": "iPhone 15",
    "price": 250000
  }
}
```

Multiple fields can also be requested:

```http
GET /api/v1/products/PRODUCT_ID?fields=title,price,category
```

This allows clients to request only the data they need and reduces unnecessary response data.

---

# ❌ Error Handling

The API uses a standardized JSON error structure.

Errors contain:

- `error_code`
- `message`
- `timestamp`

---

## 400 — Bad Request

Returned when the client sends invalid or incomplete product data.

### Example Request

```http
POST /api/v1/products
```

Invalid body:

```json
{
  "price": 5000
}
```

### Response

```json
{
  "error_code": "INVALID_PRODUCT_DATA",
  "message": "Title, price and category are required",
  "timestamp": "2026-09-23T..."
}
```

---

## 404 — Not Found

Returned when a requested product does not exist.

### Request

```http
GET /api/v1/products/INVALID_PRODUCT_ID
```

### Response

```json
{
  "error_code": "PRODUCT_NOT_FOUND",
  "message": "Product not found",
  "timestamp": "2026-09-23T..."
}
```

---

## 500 — Internal Server Error

Unexpected server-side errors are returned using a consistent structure.

```json
{
  "error_code": "INTERNAL_SERVER_ERROR",
  "message": "Internal server error",
  "timestamp": "2026-09-23T..."
}
```

---

# 📊 HTTP Status Codes

| Status | Meaning |
|---|---|
| **200 OK** | Request completed successfully |
| **201 Created** | New product created |
| **400 Bad Request** | Invalid request or validation error |
| **404 Not Found** | Product or route not found |
| **500 Internal Server Error** | Unexpected server-side error |

---

# 🧪 Postman Testing

The API can be tested using **Postman**.

### Test 1 — Get Products

```http
GET http://localhost:5000/api/v1/products
```

### Test 2 — Create Product

```http
POST http://localhost:5000/api/v1/products
```

Body:

```json
{
  "title": "iPhone 15",
  "price": 250000,
  "category": "electronics",
  "description": "Apple smartphone",
  "vendor": "Apple",
  "stock": 20
}
```

### Test 3 — Get Single Product

```http
GET http://localhost:5000/api/v1/products/PRODUCT_ID
```

### Test 4 — Update Product

```http
PUT http://localhost:5000/api/v1/products/PRODUCT_ID
```

### Test 5 — Test Idempotency

Send the same PUT request multiple times and verify that the product does not get duplicated.

### Test 6 — Delete Product

```http
DELETE http://localhost:5000/api/v1/products/PRODUCT_ID
```

### Test 7 — Category Filtering

```http
GET http://localhost:5000/api/v1/products?category=electronics
```

### Test 8 — Pagination

```http
GET http://localhost:5000/api/v1/products?page=1&limit=2
```

### Test 9 — Field Selection

```http
GET http://localhost:5000/api/v1/products/PRODUCT_ID?fields=title,price
```

### Test 10 — 400 Error

Send a POST request without the required product fields.

### Test 11 — 404 Error

Request a product ID that does not exist.

---

# 🎯 AIWT Lab 03 Requirements

This project demonstrates the following API modernization concepts:

- ✅ RESTful Architecture
- ✅ Resource Modeling
- ✅ Noun-Based URIs
- ✅ API Versioning
- ✅ HTTP GET
- ✅ HTTP POST
- ✅ HTTP PUT
- ✅ HTTP DELETE
- ✅ Idempotent PUT
- ✅ Product CRUD
- ✅ Filtering
- ✅ Pagination
- ✅ Field Filtering
- ✅ Over-Fetching Solution
- ✅ Consistent Error Schema
- ✅ 400 Bad Request
- ✅ 404 Not Found
- ✅ 201 Created
- ✅ 500 Internal Server Error
- ✅ MongoDB Integration

---

# 🔐 Security

Sensitive information should **never** be committed to the repository.

Do not upload:

```text
.env
MongoDB passwords
API keys
Database credentials
```

The `.gitignore` file excludes `.env` and `node_modules`.

Use `.env.example` to document required environment variables without exposing credentials.

---

# 🔮 Future Improvements

Possible future enhancements include:

- 🔐 User Authentication
- 🛡️ JWT Authorization
- 📦 Order Management
- 💳 Payment Integration
- 🔍 Advanced Product Search
- ↕️ Sorting
- 📚 Swagger / OpenAPI Documentation
- 🧪 Automated Testing
- 🚦 Rate Limiting
- 🐳 Docker Deployment
- ☁️ Cloud Deployment
- 🔗 GraphQL Support

---

# 👩‍💻 Author

**Munaza Munir**

BS Software Engineering  
COMSATS University Islamabad — Vehari Campus

### Academic Project

Developed for **AIWT Lab 03** to demonstrate modern RESTful API architecture and E-Commerce backend development.

---

## ⭐ Project

If you find this project useful for learning REST API modernization, feel free to explore the repository and give it a ⭐.<img width="1920" height="1080" alt="Screenshot (295)" src="https://github.com/user-attachments/assets/d5e260a5-9db6-4be6-86cf-992b801c070f" />
<img width="1920" height="1080" alt="Screenshot (294)" src="https://github.com/user-attachments/assets/78c7d0b6-f54a-4410-8d52-2a50d269ad17" />
<img width="1920" height="1080" alt="Screenshot (293)" src="https://github.com/user-attachments/assets/bab2abb6-820d-42ad-91d1-ca749795b025" />
<img width="1920" height="1080" alt="Screenshot (292)" src="https://github.com/user-attachments/assets/d95b1e94-eb80-4784-a5f4-33c0e8bbdc99" />
<img width="1920" height="1080" alt="Screenshot (291)" src="https://github.com/user-attachments/assets/5009d4fb-5e13-414c-aaae-f167ef00a9d8" />
<img width="1920" height="1080" alt="Screenshot (290)" src="https://github.com/user-attachments/assets/8253c6ce-68c6-409a-b4dc-110e1a9d8640" />
<img width="1920" height="1080" alt="Screenshot (289)" src="https://github.com/user-attachments/assets/a32d0e4c-678b-402a-840a-a853ad046b63" />
<img width="1920" height="1080" alt="Screenshot (288)" src="https://github.com/user-attachments/assets/54281d24-d784-47ec-92c1-ebce6874bb27" />
<img width="1920" height="1080" alt="Screenshot (287)" src="https://github.com/user-attachments/assets/edb90af1-7a3d-437b-b831-0f0906245ac2" />
<img width="1920" height="1080" alt="Screenshot (286)" src="https://github.com/user-attachments/assets/3d1c297b-c2ec-4859-8458-a81cb073b56a" />
