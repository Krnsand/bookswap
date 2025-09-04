import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  // Rensa databasen (valfritt)
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  // Testanvändare för Book-flows
  const hashedPassword = await bcrypt.hash("SuperSecret123!", 10);

  await prisma.user.upsert({
    where: { email: "karin@example.com" },
    update: {},
    create: {
      name: "Karin Testsson",
      email: "karin@example.com",
      password: hashedPassword,
    },
  });

  console.log("Seed klar!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
