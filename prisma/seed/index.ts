import { db } from "../../lib/prisma";
import { seedTodos } from "./todo";

async function main() {
  await seedTodos();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
