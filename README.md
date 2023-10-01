## Lit Haven

**Live Server** link here

### Application Routes

#### User

- `/api/v1/auth/signup` [POST] --> Public
- `/api/v1/auth/signin` [POST] -- Public
- `/api/v1/users` [GET] --> Only For Admin
- `/api/v1/users/:id` [SINGLE GET] --> Only For Admin
- `/api/v1/users/:id` [PATCH] --> Only For Admin
- `/api/v1/users/:id` [DELETE] --> Only For Admin
- `/api/v1/profile` [GET] --> Only For Admin & Customer

#### Category

- `/api/v1/categories/create-category` [POST] --> Only For Admin
- `/api/v1/categories` [GET] --> Public
- `/api/v1/categories/:id` [SINGLE GET] --> Public
- `/api/v1/categories/:id` [PATCH] --> Only For Admin
- `/api/v1/categories/:id` [DELETE] --> Only For Admin

#### Books

- `/api/v1/books/create-book` [POST] --> Only For Admin
- `/api/v1/books` [GET] --> Public
- `/api/v1/books/:id/category` [GET BY CATEGORY] --> Public
- `/api/v1/books/:id` [SINGLE GET] --> Public
- `/api/v1/books/:id` [PATCH] --> Only For Admin
- `/api/v1/books/:id` [DELETE] --> Only For Admin

#### Orders

- `/api/v1/orders/create-order` [POST] --> Only Customers
- `/api/v1/orders` [GET] --> Only For Admin
- `/api/v1/orders/:id` [SINGLE GET] --> Ony For Admin & Customer
- `/api/v1/orders/my-orders` [GET ALL ORDERES OF A SINGLE CUSTOMER] --> Only For Customer
