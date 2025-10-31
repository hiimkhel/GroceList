# 🏗️ GroceList Architecture Overview (v1)

**Project Name:** GroceList  
**Version:** 1.0  
**Primary Technologies:**  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JSON Web Token (JWT)  
- **Frontend:** React (Vite)  
- **Hosting (optional):** Vercel & Render

---

## System Overview

GroceList is a modern grocery management and marketplace application that allows users to:
- Create accounts
- Browse and purchase marketplace products
- Create and manage groery lists
- Add, update, and remove items from their shopping cart
- Edit personal profile and delivery address

All data is securely managed using **JWT-based authentication** and stored in **MongoDB**.

## Core Architecture Flow
Below is the **high-level data flow** from user interaction to database storage:
           ┌───────────────────────────────────────────────────┐
           │                    FRONTEND (React)               │
           │  • Login / Signup                                 │
           │  • Grocery List UI                                │
           │  • Marketplace & Cart                             │
           │  • Fetches APIs using JWT Bearer token            │
           └──────────────────────────────┬────────────────────┘
                                          │
                                          ▼
           ┌───────────────────────────────────────────────────┐
           │               BACKEND (Node.js / Express)         │
           │  • Auth Routes (/api/auth)                        │
           │  • Grocery List Routes (/api/lists)               │
           │  • Cart Routes (/api/users/:id/cart)              │
           │  • Product Routes (/api/marketplace)              │
           │  • Order Routes (/api/orders)                     │
           │                                                   │
           │  JWT Verification Middleware                      │
           │  Firebase ID Verification (for Google login)      │
           └──────────────────────────────┬────────────────────┘
                                          │
                                          ▼
           ┌───────────────────────────────────────────────────┐
           │                    DATABASE (MongoDB)             │
           │  • Users                                          │
           │  • GroceryLists                                   │
           │  • Products                                       │
           │  • Carts                                          │
           │  • Orders                                         │
           └───────────────────────────────────────────────────┘

---


## System Components

### 1. ## Frontend (React + Vite)**
- Provides user interface for login, marketplace, grocery list, cart, and profile.
- Interacts with backend via **REST API** calls.
- Store JWT token in localStorage or sessionStorage.
- Uses JWT token in `Authorization` header for protected routes.

**Key Page**
- `/auth` - login and sign up
- `/marketplace` - view of all grocery products
- `/cart` - view and update cart items
- `-grocery-list` - manage saved grocery items
- `/profile` - manage user profile

---

### 2. **Backend (Node.js + Express.js)**

### **Responsibilities**
- Serve RESTful APIs to frontend
- Handle CRUD operations for Users, Products, Carts, and Grocery Lists
- Manage authentication via JWT
- Connect to MongoDB using mongoose


### Folder Structure Example
backend/
├── config/
│ └── dbConnection.js # MongoDB connection
├── controllers/ # Route logic
│ ├── authController.js
│ ├── userController.js
│ ├── productController.js
│ ├── cartController.js
│ └── groceryController.js
├── middleware/
│ └── authMiddleware.js # JWT verification
├── models/  # Schema of each models
│ ├── userModel.js
│ ├── productModel.js
│ ├── cartModel.js
│ └── groceryListModel.js
├── routes/  # Modularized routes
│ ├── authRoutes.js
│ ├── userRoutes.js
│ ├── productRoutes.js
│ ├── cartRoutes.js
│ └── groceryRoutes.js
├── server.js # Entry point
└── package.json

---

### 3. **Database (MongoDB + Mongoose)

#### **Collections**

| Collection       |            Description                          |
|------------------|-------------------------------------------------|
| **users**        | Stores user details and hashed passwords & cart |
| **products**     | Marketplace items with stock info               |
| **grocerylists** | Stores user-created grocery lists               |

#### **Schema Highlights**

 **User**
{
    name: String,
    email: String,
    password: String, // bcrypt hashed
    address: String,
    cart: [{ productId: ObjectId, quantity: Number }]
}

 **Product**
{
    name: String,
    price: Number,
    image: String,
    stock: Number,
    description: String,
    tags: [] // An array of categories
}

 **Grocery List**
{
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who owns this list
      required: true,
    },
    title: {
      type: String,
      required: [true, "List title is required"],
      trim: true,
    },items: [
      {
        name: {
          type: String,
          required: [true, "Item name is required"],
          trim: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be at least 1"],
        },
        isChecked: {
          type: Boolean,
          default: false, // Used for marking completed items
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
}

### 4. Authentication (JWT)

# Signup Flow
- User submits name, email, password, address.
- Backend hashed password using bcrypt.
- User is created in the database with empty cart.

# Login Flow
- User submits email and password.
- Backend verifies credentials.
- If valid, backend signs a JWT token
- Frontend stores token for session persistence.

# Protected Routes
- **Middleware** authMiddleware.js


### 5. APIs and Routes Overview
**Module**  | **Endpoint Base Path** |  **Description**
Auth	    |      /api/auth	     |   Register, Login
Users	    |     /api/users	     |   Profile CRUD, get user info
Products	|     /api/products      |	 Get or search products
Cart	    |     /api/cart	         |   Get or add cart items
GroceryList |	  /api/groceries     |	 Manage saved grocery lists


### 6. Environment Variables

**Variable**      |    **Description**
PORT              |     Server port
MONGO_URI         |     MongoDB connection string
JWT_SECRET        |     Secret key for JWT signing


### 7. Security Practices
- Use HTTPS for deployment
- Hash passwords with bcrypt
- Verify JWT on every protected route
- Sanitize and validate inputs
- Use CORS middleware for domain control


### 8. Deployment Setup
- **Backend Deployment**: Render
- **Frontend Deplotment**: Vercel
- **Database**: MongoDB


### 9. Scalability Notes
- Implement pagination for marketplace.
- Cache frequent product queries using Redis (future).
- Add admin dashboard for product and order management.
- Expand to include order tracking in v2.


### 10. Future Expansion (GroceList v2.0)
- 📦 Order system (checkout and delivery tracking)
- 🔍 Product recommendations
- 🌐 Multi-vendor marketplace expansion
- 🛡️ Role-based admin panel
- 🧾 Activity logs & audit trail