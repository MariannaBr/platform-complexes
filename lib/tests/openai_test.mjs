import OpenAI from "openai";

const openai = new OpenAI();

export async function getApartmentsUsingOpenAI(input) {
  const completion = await openai.chat.completions.create({
    model: "babbage-002",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an expert in analyzing HTML and you will get an HTML code of a webpage. Your task is to list all units that are listed on the webpage. Create a json with all units and their title, number of bedrooms, number of bathrooms, square feet, price, link of unit's picture and link for applying for the unit if it's given.",
      },
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 0.1,
  });

  return completion.choices[0];
}
