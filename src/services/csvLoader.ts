import fs from "fs";
import csv from "csv-parser";
import { pool } from "../config/db";

export const loadCSV = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream("data/sales.csv").pipe(csv());

    stream.on("data", async (row) => {
      try {
        const {
          "Order ID": orderId,
          "Product ID": productId,
          "Customer ID": customerId,
          "Product Name": productName,
          Category,
          Region,
          "Date of Sale": dateOfSale,
          "Quantity Sold": quantity,
          "Unit Price": unitPrice,
          Discount,
          "Shipping Cost": shippingCost,
          "Payment Method": paymentMethod,
          "Customer Name": customerName,
          "Customer Email": customerEmail,
          "Customer Address": customerAddress,
        } = row;

        // 1. Insert category
        const categoryRes = await pool.query(
          "INSERT INTO categories(name) VALUES($1) ON CONFLICT(name) DO NOTHING RETURNING id",
          [Category]
        );
        const categoryId = categoryRes.rows[0]?.id || (
          await pool.query("SELECT id FROM categories WHERE name = $1", [Category])
        ).rows[0].id;

        // 2. Insert region
        const regionRes = await pool.query(
          "INSERT INTO regions(name) VALUES($1) ON CONFLICT(name) DO NOTHING RETURNING id",
          [Region]
        );
        const regionId = regionRes.rows[0]?.id || (
          await pool.query("SELECT id FROM regions WHERE name = $1", [Region])
        ).rows[0].id;

        // 3. Insert customer
        await pool.query(
          "INSERT INTO customers(id, name, email, address) VALUES($1, $2, $3, $4) ON CONFLICT(id) DO NOTHING",
          [customerId, customerName, customerEmail, customerAddress]
        );

        // 4. Insert product
        await pool.query(
          "INSERT INTO products(id, name, category_id, unit_price) VALUES($1, $2, $3, $4) ON CONFLICT(id) DO NOTHING",
          [productId, productName, categoryId, unitPrice]
        );

        // 5. Insert order
        await pool.query(
          "INSERT INTO orders(id, customer_id, region_id, date_of_sale, payment_method, shipping_cost) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT(id) DO NOTHING",
          [orderId, customerId, regionId, dateOfSale, paymentMethod, shippingCost]
        );

        // 6. Insert order item
        await pool.query(
          "INSERT INTO order_items(order_id, product_id, quantity, unit_price, discount) VALUES($1, $2, $3, $4, $5)",
          [orderId, productId, quantity, unitPrice, Discount]
        );
      } catch (error) {
        console.error("Error processing row:", error);
      }
    });

    stream.on("end", () => {
      console.log("✅ CSV loaded successfully.");
      resolve();
    });

    stream.on("error", reject);
  });
};
