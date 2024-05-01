const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  //1 - seed categories in DB
  try {
    await database.category.createMany({
      data: [
        { name: "Truck" },
        { name: "Heavy Equipment" },
        { name: "Generator" },
        { name: "Aqua" },
        { name: "Elec Equipment" },
        { name: "Vehicle" },
        { name: "Machine" },
        { name: "Service" },
        { name: "Water Based Assets" },
        { name: "Generators" },
      ],
    });
    console.log("Success seeding categories!");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Failed to seed categories in DB.");
    }
  } finally {
    await database.$disconnect();
  }
}

main();
