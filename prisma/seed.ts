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
        title: "Lord of the Rings",
        author: "J.R.R. Tolkien",
        ownerId: user.id, 
        available: true,
      },
      {
        title: "The Wise Mans Fear",
        author: "Patrick Rothfuss",
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
