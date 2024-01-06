const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.service.createMany({
      data: [
        {
          name: "Classic",
          description:
            "Classic eyelash extensions are a single eyelash extension attached to a single eyelash.",
          price: 150,
          refillPrice: 65,
        },
        {
          name: "3D",
          description:
            "3D eyelash extensions are thinner, light weight extensions, 3 extensions per lash,a more natural look.",
          price: 150,
          refillPrice: 65,
        },
        {
          name: "5D",
          description:
            "5D Volume lashes are a more dramatic look using 5 very lightweight and thin extensions.",
          price: 150,
          refillPrice: 65,
        },
        {
          name: "Hybrid",
          description:
            "Hybrid lashes are a mix of Classic and 3D. They will fall out naturally along with the natural growth cycle of each lash.",
          price: 150,
          refillPrice: 65,
        },
      ],
    });

    console.log("services seeded");
  } catch (error) {
    console.log("Error seeding the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
