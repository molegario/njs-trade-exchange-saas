const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  //1 - seed categories in DB
  try {
    await database.category.createMany({
      data: [
        { name: "Truck" },
        { name: "Heavy Equipment" },
        { name: "Generators" },
        { name: "Water Based Assets" },
        { name: "Elec Equipment" },
        { name: "Vehicle" },
        { name: "Machine" },
        { name: "Service" },
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
