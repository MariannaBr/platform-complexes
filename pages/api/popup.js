import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { email, district, message } = req.body;

    try {
      // Create a new user in the database
      const user = await prisma.user.upsert({
        where: {
          email: email,
        },
        update: {
          district: district,
          message: message,
        },
        create: {
          email: email,
          district: district,
          message: message,
        },
      });
      res
        .status(200)
        .json({
          id: user.id,
          email: user.email,
          district: user.district,
          message: user.message,
        });
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
