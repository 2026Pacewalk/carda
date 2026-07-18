import { getDb } from "../api/queries/connection";
import { sql } from "drizzle-orm";

async function main() {
  const db = getDb();

  // Create customers table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS customers (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(320) NOT NULL UNIQUE,
      mobile VARCHAR(20) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      email_verified BOOLEAN DEFAULT FALSE,
      avatar TEXT,
      status ENUM('active', 'inactive', 'suspended') DEFAULT 'active' NOT NULL,
      role ENUM('customer') DEFAULT 'customer' NOT NULL,
      package_id BIGINT UNSIGNED,
      order_id BIGINT UNSIGNED,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL ON UPDATE NOW(),
      last_sign_in_at TIMESTAMP
    )
  `);
  console.log("customers table OK");

  // Create payments table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS payments (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      order_id BIGINT UNSIGNED NOT NULL,
      customer_id BIGINT UNSIGNED NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      payment_method VARCHAR(50) DEFAULT 'upi' NOT NULL,
      upi_id VARCHAR(100),
      screenshot_url TEXT,
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
      admin_note TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);
  console.log("payments table OK");

  // Create password_resets table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS password_resets (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(320) NOT NULL,
      token VARCHAR(255) NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);
  console.log("password_resets table OK");

  // Update existing tables if needed
  try {
    await db.execute(sql`ALTER TABLE pdf_cards ADD COLUMN customer_id BIGINT UNSIGNED AFTER id`);
    console.log("Added customer_id to pdf_cards");
  } catch {
    console.log("customer_id already exists in pdf_cards");
  }

  console.log("All migrations complete!");
}

main().catch(console.error);
