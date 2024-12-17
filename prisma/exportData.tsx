import fs from "fs";
import prisma from "../lib/prisma";

async function exportData() {
  try {
    // Fetch data from the table
    const apartmentsRaw = await prisma.apartmentRaw.findMany();

    // Write the data to a JSON file
    fs.writeFileSync(
      "apartments_export.json",
      JSON.stringify(apartmentsRaw, null, 2)
    );

    console.log("Data exported successfully to complexes_export.json");
  } catch (error) {
    console.error("Error exporting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();

// execute with npx tsx exportData.tsx
