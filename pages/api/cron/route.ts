import type { NextApiRequest, NextApiResponse } from "next";
import { saveApartments } from "../../../lib/data/apartmentsScrape.mjs";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const result = await saveApartments();
  return response.json(result);
}
