import OpenAI from "openai";

const openai = new OpenAI();

export async function getApartmentsUsingOpenAI(input) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an expert in analyzing data from html code and you will get a html code that collects data about units. Your task is to list all units that are listed in the html. Create a json with all units and their title, number of bedrooms, number of bathrooms, square feet, price, link of unit's picture and link for applying for the unit if it's given.",
      },
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 0.1,
  });
  return completion.choices[0].message.content;
}
