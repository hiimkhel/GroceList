# 🛒 GroceList API Reference

**Version:** 1.0  
**Base URL:** `http://localhost:5000/api`  
**Format:** JSON  

---

## 📑 Table of Contents
1. [Overview](#overview)  
2. [Authentication](#authentication)  
3. [Cart](#cart)  
4. [Marketplace](#marketplace)  
5. [Orders](#orders)

---

## 🧾 Overview

The **GroceList API** provides backend functionality for the **GroceList Web App**, enabling:

- User registration and authentication  
- Marketplace product management  
- Shopping cart operations  
- Order creation and tracking  

All endpoints return **JSON responses** and follow standard **HTTP status codes**.

---

## 🔐 Authentication

### **POST /auth/register**
Registers a new user account and initializes an empty cart array.

#### Example Request
```json
{
  "name": "Kelly Ydrhan",
  "email": "kelly@example.com",
  "password": "mypassword123",
  "address": "Iloilo City"
}

Success Response

{
  "_id": "671c48f8e2f7b218bca1ef55",
  "name": "Kelly Ydrhan",
  "email": "kelly@example.com",
  "address": "Iloilo City",
  "cart": [],
  "__v": 0
}

Error Responses
Status Code	Message
400	"All fields are mandatory!"
400	"User already registered"
500	"Internal Server Error"
