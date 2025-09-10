import { db } from "./src/lib/db";
import { usersTable } from "./src/db/schema";

async function test() {
  const users = await db.select().from(usersTable).limit(5);
  console.log(users);
}

test();
