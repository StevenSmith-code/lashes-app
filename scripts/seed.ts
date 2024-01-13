const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  const servicesData = [
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
        "3D eyelash extensions are thinner, light weight extensions, 3 extensions per lash, offering a more natural look.",
      price: 175,
      refillPrice: 75,
    },
    {
      name: "5D",
      description:
        "5D Volume lashes are a more dramatic look using 5 very lightweight and thin extensions.",
      price: 200,
      refillPrice: 85,
    },
    {
      name: "Hybrid",
      description:
        "Hybrid lashes are a mix of Classic and 3D. They will fall out naturally along with the natural growth cycle of each lash.",
      price: 185,
      refillPrice: 80,
    },
  ];

  for (const service of servicesData) {
    await database.service.create({
      data: service,
    });
  }

  console.log("Services have been created.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await database.$disconnect();
  });
