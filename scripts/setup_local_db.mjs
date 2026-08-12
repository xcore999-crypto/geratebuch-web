import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const databasePath = path.join(root, "dev.db");
const database = new Database(databasePath);

const tables = database
  .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
  .all();

if (tables.length === 0) {
  const migrations = [
    "prisma/migrations/20260812161014_init/migration.sql",
    "prisma/migrations/20260812162635_add_organization_contact_person/migration.sql",
  ];

  for (const migration of migrations) {
    database.exec(fs.readFileSync(path.join(root, migration), "utf8"));
  }
  console.log(`Created ${databasePath}`);
} else if (!tables.some(({ name }) => name === "service_requests")) {
  throw new Error("dev.db contains a partial schema; remove the local database and run db:setup again.");
} else {
  console.log(`Using existing ${databasePath}`);
}

database.close();
