// src/lib/seed.ts
import { db } from "./db";
import { usersTable, leadsTable } from "../db/schema";

async function seed() {
  await db.insert(usersTable).values([
    { name: "John Doe", email: "john@example.com", password: "hashedpassword" },
    { name: "Jane Smith", email: "jane@example.com", password: "hashedpassword" },
  ]);

  await db.insert(leadsTable).values([
    { name: "Lead One", email: "lead1@example.com", company: "ABC Corp", status: "new", userId: 1 },
    { name: "Lead Two", email: "lead2@example.com", company: "XYZ Ltd", status: "contacted", userId: 2 },
  ]);
}

seed()
  .then(() => console.log("Seed complete"))
  .catch((err) => console.error(err));
