import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("SuperSecret123!", 10);

  const user = await prisma.user.create({
    data: {
      name: "Karin Testsson",
      email: "karin@example.com",
      password: hashedPassword,
    },
  });

  await prisma.book.createMany({
    data: [
      {
        title: "The Pragmatic Programmer",
        author: "Andy Hunt",
        ownerId: user.id, 
        available: true,
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        ownerId: user.id,
        available: false,
      },
    ],
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
