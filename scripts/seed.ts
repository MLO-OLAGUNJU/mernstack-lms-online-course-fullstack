const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Graphics Design" },
        { name: "Product Management" },
        { name: "Data Analytics" },
        { name: "Web Development" },
        { name: "Frontend Development" },
        { name: "Backend Development" },
        { name: "Fullstack Development" },
        { name: "UI/UX Design" },
        { name: "Video Editing" },
        { name: "Mobile app Development" },
        { name: "Wordpress Development" },
        { name: "Data Analytics and Engineering" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
