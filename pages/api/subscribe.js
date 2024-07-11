import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { email, message } = req.body;

    try {
      // check if the user already exists
      const user = await prisma.user.upsert({
        where: {
          email: email,
        },
        update: {
          message: message,
        },
        create: {
          email: email,
          message: message,
        },
      });
      res
        .status(200)
        .json({ id: user.id, email: user.email, message: user.message });
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
