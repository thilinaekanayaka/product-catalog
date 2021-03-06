# Product Catalog

## Motivation

We need a simple system to maintain our products list. Therefore, we need to develop a set of
endpoints to show all products in a dashboard as well as to create a new product.
1. Setup a database using Mysql to store products with the following attributes. Design the
table structure as you preferred. Feel free to add some attributes to the brands table.
a. Product id
b. Product name
c. Product slug
d. Sku
e. Brand
2. Design a RESTful API using NodeJS & ExpressJS framework to fulfill following
requirements.
a. Return products
b. Return a single product by id/slug
c. Create a new product
d. Delete a single product
e. Update a single product
f. Create multiple products using a csv file upload
3. Develop graphql operations to expose your RESTful Products API & the Create a new
product API (2.a & 2.c).

## Installation

Use npm to install the necessary packages.

```bash
npm install
```
## Database

Restore the SQL backup from the repository.
```bash
products_catalog.sql
```

## Running the app

```bash
npm start
```
Then the REST APIs run on http://localhost:5000.
GraphQL runs on http://localhost:5000/graphql.

## API Requests

Use a tool like Postman to make API requests. API endpoint,
```bash
/api/v1/products
```

## Sample API Requests

```bash
GET http://localhost:5000/api/v1/products
```
```bash
DELETE http://localhost:5000/api/v1/products/{product_id}
```

## REST APIs Postman Collection

Import the following JSON to Postman for the REST API collection.
```bash
Products_Catalog.postman_collection.json
```
