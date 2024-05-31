import { MultiOnClient } from "multion";
import dotenv from "dotenv";

dotenv.config();

const multion = new MultiOnClient({
  apiKey: process.env.MULTION_API_KEY,
});

// const browse = await multion.browse({
//   cmd: "hello",
//   url: "https://www.google.com",
// });
// console.log("browse:", browse);

export async function scrape(link) {
  await multion.sessions.create({
    url: link,
  });
}
console.log(scrape("https://www.google.com"));
