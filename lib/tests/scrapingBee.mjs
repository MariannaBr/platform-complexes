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
      json_response: true,
    },
  });
  return response;
}

get(
  "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings"
)
  .then(function (response) {
    var decoder = new TextDecoder();
    if (response && response.data) {
      try {
        JSON.parse(response.data);
        var text = JSON.parse(decoder.decode(response.data));
        var input = JSON.stringify(text.body);
        const units = getApartmentsUsingOpenAI(input);
        console.log(units);
      } catch (error) {
        console.log(`Invalid JSON as scraped data: ${error}`);
      }
    }
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
