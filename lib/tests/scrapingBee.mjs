import { getApartmentsUsingOpenAI } from "./openai_test.mjs";
import { ScrapingBeeClient } from "scrapingbee";
//const scrapingbee = require("scrapingbee");

async function get(url) {
  const key =
    "XCGKWXTROXD7LU7065DVBOL0C4EFYPL8HQK33NYUY2A041BHCR6WZV6JJRYT3YZZ0MUNRYXMMTBT3OAQ";
  var client = new ScrapingBeeClient(key);
  var response = await client.get({
    url: url,
    params: {
      js_scenario: {
        instructions: [
          { wait_for_and_click: "[id^=load-all-units]" },
          { wait: 5000 },
        ],
      },
      wait: "35000",
      block_resources: "False",
      wait_for: ".unit-grid-wrapper",
      extract_rules: {
        apartments: {
          selector: ".unit-grid-wrapper",
          output: "text",
        },
      },
      //json_response: true,
    },
  });

  var decoder = new TextDecoder();
  if (response && response.data) {
    try {
      JSON.parse(response.data);
      var text = JSON.parse(decoder.decode(response.data));
      //console.log(text.apartments);
      var input = JSON.stringify(text.apartments);
    } catch (error) {
      console.log(`Invalid JSON as scraped data: ${error}`);
    }
  }
  const units = await getApartmentsUsingOpenAI(input);
  console.log(JSON.parse(units).units);
}

get(
  "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings"
);
