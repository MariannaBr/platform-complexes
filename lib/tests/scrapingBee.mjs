import { getApartmentsUsingOpenAI } from "./openai_test.mjs";
import { ScrapingBeeClient } from "scrapingbee";
import dotenv from "dotenv";

dotenv.config();

async function get(url) {
  const key = process.env.SCRAPING_BEE_API_KEY;
  var client = new ScrapingBeeClient(key);
  var response = await client.get({
    url: url,
    params: {
      js_scenario: {
        instructions: [
          { wait_for_and_click: "[id^=load-all-units]" },
          //{ wait: 5000 },
        ],
      },
      wait: "35000",
      block_resources: "False",
      wait_for: ".ant-card-body",
      extract_rules: {
        apartments: {
          selector: ".ant-card-body",
          type: "list",
          output: "html",
        },
      },
    },
  });

  var decoder = new TextDecoder();
  if (response && response.data) {
    try {
      JSON.parse(response.data);
      var text = JSON.parse(decoder.decode(response.data));
      //console.log(text);
      var data = text.apartments;
    } catch (error) {
      console.log(`Invalid JSON as scraped data: ${error}`);
    }
  }

  for (var i = 0; i < data.length; i++) {
    var unit = await getApartmentsUsingOpenAI(data[i]);
    console.log(unit);
  }
}

get(
  "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings"
);
