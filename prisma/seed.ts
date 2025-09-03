// prisma/seed.ts
import { prisma } from "@/lib/prisma";

async function main() {
  // Skapa en testanvändare
  const user = await prisma.user.create({
    data: { email: "anna@test.com", password: "1234" },
  });

  // Skapa en bok
  await prisma.book.create({
    data: {
      title: "Harry Potter",
      author: "J.K. Rowling",
      ownerId: user.id,
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
