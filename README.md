## Lit Haven

### Application Routes

#### User

- `api/v1/auth/signup` [POST]
- `api/v1/auth/signin` [POST]
- `api/v1/users` [GET]
- `api/v1/users/:id` [SINGLE GET]
- `api/v1/users/:id` [PATCH]
- `api/v1/users/:id` [DELETE]
- `api/v1/profile` [GET]

#### Category

- `api/v1/categories/create-category` [POST]
- `api/v1/categories` [GET]
- `api/v1/categories/:id` [SINGLE GET]
- `api/v1/categories/:id` [PATCH]
- `api/v1/categories/:id` [DELETE]

#### Books

- `api/v1/books/create-book` [POST]
- `api/v1/books` [GET]
- `api/v1/books/:categoryId/category` [GET BY CATEGORY]
- `api/v1/books/:id` [SINGLE GET]
- `api/v1/books/:id` [PATCH]
- `api/v1/books/:id` [DELETE]

#### Orders

- `api/v1/orders/create-order` [POST]
- `api/v1/orders` [GET]
- `api/v1/orders/:orderId` [SINGLE GET]
- `api/v1/orders/my-orders` [GET ALL ORDERS FOR SPECIFIC CUSTOMER]
