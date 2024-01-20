import { db } from "../src/config/database";

export async function cleanDB() {
  await db.query(`TRUNCATE TABLE notes RESTART IDENTITY`);
}
