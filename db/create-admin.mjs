// One-off: create or update a super-admin account.
// Usage: node db/create-admin.mjs "<name>" "<email>" "<password>"
import "dotenv/config";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const [, , name, email, password] = process.argv;
if (!name || !email || !password) {
  console.error('Usage: node db/create-admin.mjs "<name>" "<email>" "<password>"');
  process.exit(1);
}

const url = process.env.DATABASE_URL;
if (!url) { console.error("DATABASE_URL missing"); process.exit(1); }

const passwordHash = await bcrypt.hash(password, 12);
const conn = await mysql.createConnection(url);

await conn.execute(
  `INSERT INTO users (unionId, name, email, passwordHash, role, createdAt, updatedAt, lastSignInAt)
   VALUES (NULL, ?, ?, ?, 'admin', NOW(), NOW(), NULL)
   ON DUPLICATE KEY UPDATE name = VALUES(name), passwordHash = VALUES(passwordHash), role = 'admin', updatedAt = NOW()`,
  [name, email, passwordHash]
);

const [rows] = await conn.execute("SELECT id, name, email, role FROM users WHERE email = ?", [email]);
console.log("Admin account ready:", rows[0]);
await conn.end();
