import prisma from "../prisma";
import { Parser } from 'json2csv';
import fs from 'fs';


async function exportToCSV() {

  // Step 1: Fetch the filtered data using raw SQL query
  const complexId = "clso0gn4b000111l2vkugd9hr";
  const filteredItems = await prisma.$queryRaw`SELECT DISTINCT ON ("image", DATE("createdAt")) * FROM "ApartmentRaw" WHERE "complex_id" = ${complexId} ORDER BY image, DATE("createdAt"), "createdAt" DESC`;

  // Step 2: Convert the data to CSV format
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(filteredItems);

  // Step 3: Write the CSV data to a local file
  fs.writeFileSync('avalon_filtered.csv', csv);

  console.log('Data exported successfully to avalon_filtered.csv');
}

exportToCSV()
  .catch((e) => {
    console.error(e);
  });
