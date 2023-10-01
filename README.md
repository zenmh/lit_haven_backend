## Lit Haven

**Live Server** https://lit-haven-server.vercel.app

### Application Routes

#### User

- `/api/v1/auth/signup` [POST] --> Public
- `/api/v1/auth/signin` [POST] -- Public
- `/api/v1/users` [GET] --> Only For Admin
- `/api/v1/users/6a20b106-737d-476e-a9e3-00a28faf7276` [SINGLE GET] --> Only For Admin
- `/api/v1/users/6a20b106-737d-476e-a9e3-00a28faf7276` [PATCH] --> Only For Admin
- `/api/v1/users/6a20b106-737d-476e-a9e3-00a28faf7276` [DELETE] --> Only For Admin
- `/api/v1/profile` [GET] --> Only For Admin & Customer

#### Category

- `/api/v1/categories/create-category` [POST] --> Only For Admin
- `/api/v1/categories` [GET] --> Public
- `/api/v1/categories/fd8702c7-0fee-4e72-b7ab-aae3a84b45a1` [SINGLE GET] --> Public
- `/api/v1/categories/fd8702c7-0fee-4e72-b7ab-aae3a84b45a1` [PATCH] --> Only For Admin
- `/api/v1/categories/fd8702c7-0fee-4e72-b7ab-aae3a84b45a1` [DELETE] --> Only For Admin

#### Books

- `/api/v1/books/create-book` [POST] --> Only For Admin
- `/api/v1/books` [GET] --> Public
- `/api/v1/books/:id/category` [GET BY CATEGORY] --> Public
- `/api/v1/books/87c73e79-b016-4542-9b82-c7d1956ccf8e` [SINGLE GET] --> Public
- `/api/v1/books/87c73e79-b016-4542-9b82-c7d1956ccf8e` [PATCH] --> Only For Admin
- `/api/v1/books/87c73e79-b016-4542-9b82-c7d1956ccf8e` [DELETE] --> Only For Admin

#### Orders

- `/api/v1/orders/create-order` [POST] --> Only Customers
- `/api/v1/orders` [GET] --> Only For Admin
- `/api/v1/orders/41f95137-3837-4824-aa0a-41391d143f0e` [SINGLE GET] --> Ony For Admin & Customer
- `/api/v1/orders/my-orders` [GET ALL ORDERES OF A SINGLE CUSTOMER] --> Only For Customer
