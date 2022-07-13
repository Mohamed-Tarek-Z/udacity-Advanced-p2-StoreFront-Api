# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)



### Users Endpoints and routes
- [get] http://localhost:3000/users sends all users (authorization required)

- [post] http://localhost:3000/users register new user.
request body should contain: `user_name`, `first_name`, `last_name`, `password`.
JWT is send if registeration succes.

- [post] http://localhost:3000/users/login authenticate user.
request body should contain correct : `user_name`, `password`. JWT is send if login succes.

- [get] http://localhost:3000/users/:id sends the user of `id` in the url (authorization required)

- [delete] http://localhost:3000/users deletes all users (authorization required) made for testing

### Products Endpoints and routes
- [get] http://localhost:3000/products sends all products.

- [get] http://localhost:3000/products/:id sends product with `id` in url.

- [get] http://localhost:3000/products/category/:category sends product with `category` in url.

- [get] http://localhost:3000/products/top5 sends most Popular products.

- [post] http://localhost:3000/products create a new product when authenticated. request body : `name`, `price`, `category`.

- [put] http://localhost:3000/products/:id edit product with `id` in url (authorization required). request body: `name`, `price`, `category`.

- [delete] http://localhost:3000/products/:id delete product with `id` in url (authorization required).

- [delete] http://localhost:3000/products deletes all products (authorization required).

### Order Endpoints and routes
- [get] http://localhost:3000/orders sends all orders.

- [get] http://localhost:3000/orders/:id sends order with `id` in url.

- [get] http://localhost:3000/orders/:user_id get a list of completed orders for user `user_id` (authorization required).

- [get] http://localhost:3000/orders/:user_id get a last active order for user `user_id` (authorization required).

- [post] http://localhost:3000/orders create a new order (authorization required). request body: `user_id` and `status = active or complete`.

- [put] http://localhost:3000/orders/:id edit an order with `id`(authorization required). request body: `user_id` and `status = active or complete`.

- [delete] http://localhost:3000/orders/:id delete order with `id` in url (authorization required).

- [delete] http://localhost:3000/orders delete all orders (authorization required).

### Order product Endpoints and routes
- [get] http://localhost:3000/order_product get all order_product.

- [post] http://localhost:3000/order_product/:order_id/product add new record with `order_id`in url (authorization required). request body `product_id` ,`quantity`.

- [put] http://localhost:3000/order_product/:order_id/product/:op_id edit record with `order_id` and `op_id` in url (authorization required). request body `product_id` ,`quantity`.

- [delete] http://localhost:3000/order_product/:op_id delete an order_product `op_id` in url (authorization required).



### Schema
- products(id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, price INT NOT NULL, category VARCHAR(50))

- users(id SERIAL PRIMARY KEY, user_name VARCHAR(50) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, password VARCHAR(200) NOT NULL)

- orders(id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id), status VARCHAR(10) CHECK(status = 'active' OR status ='complete'))

- order_product(id SERIAL PRIMARY KEY, order_id BIGINT REFERENCES orders(id), product_id BIGINT REFERENCES products(id), quantity INT NOT NULL)