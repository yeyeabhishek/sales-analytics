# 📊 Sales Analytics Backend

This project provides a scalable, production-ready backend for analyzing large-scale sales CSV data. It supports:

* Loading millions of rows from a normalized CSV
* Refreshing the database via API
* Calculating revenue via REST API

## 🚀 Tech Stack

* Node.js + Express.js
* TypeScript
* PostgreSQL
* pg + csv-parser
* pgAdmin (for DB management)

---

## 🏗️ Project Setup

### 1️⃣ Clone and Install

```bash
git clone <your-repo-url>
cd sales-analytics
npm install
```

### 2️⃣ Set Up PostgreSQL

* Install PostgreSQL and pgAdmin
* Create a database: `sales_db`
* Create user: `sales_user` with password `sales_pass`

### 3️⃣ Create Tables

Run this in pgAdmin or psql:

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE customers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  address TEXT
);

CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  category_id INTEGER REFERENCES categories(id),
  unit_price NUMERIC
);

CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50) REFERENCES customers(id),
  region_id INTEGER REFERENCES regions(id),
  date_of_sale DATE,
  payment_method VARCHAR(50),
  shipping_cost NUMERIC
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id),
  product_id VARCHAR(50) REFERENCES products(id),
  quantity INTEGER,
  unit_price NUMERIC,
  discount NUMERIC
);
```

### 4️⃣ Create `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=sales_user
DB_PASSWORD=sales_pass
DB_NAME=sales_db
PORT=4000
```

### 5️⃣ Start Server

```bash
npm run dev
```

Place your CSV file at `data/sales.csv`.

---

## 📮 API List

| Method | Route                                          | Body / Params | Description                              |
| ------ | ---------------------------------------------- | ------------- | ---------------------------------------- |
| `POST` | `/api/refresh`                                 | —             | Reloads CSV data into the DB             |
| `GET`  | `/api/revenue?start=YYYY-MM-DD&end=YYYY-MM-DD` | —             | Returns total revenue for the date range |

### ✅ Example:

```
curl "http://localhost:4000/api/revenue?start=2024-01-01&end=2024-12-31"
```

Response:

```json
{ "totalRevenue": 4712.57 }
```

---

## 📁 Folder Structure

```
src/
├── config/         # DB connection
├── controllers/    # Business logic
├── routes/         # API routing
├── services/       # CSV loader
├── app.ts          # Express setup
├── server.ts       # Server entry point
data/
└── sales.csv       # Your CSV file
```

---

## 🧪 Notes

* Ensure you don’t reload the same CSV multiple times (or de-dupe with UPSERTs)
* You can add additional endpoints for revenue by category, region, etc.

---

## 📬 Submission Checklist

* [x] Backend setup ✅
* [x] PostgreSQL schema ✅
* [x] REST APIs ✅
* [x] CSV loader ✅
* [x] README ✅
* [ ] DB diagram (optional)

> Created by Abhishek Anand for Sales Analytics Assignment
