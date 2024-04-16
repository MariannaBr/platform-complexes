const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient();
  //process.env.SCRAPING_BEE_API_KEY
  var response = await client.get({
    url: url,
    params: {
      js_scenario: {
        instructions: [
          { wait_for_and_click: "[id^=load-all-units]" },
          { wait: 5000 },
        ],
      },
      block_resources: "False",
      wait: "35000",
      wait_for: ".ant-card-body",
      extract_rules: {
        apartments: {
          selector: ".ant-card-body",
          type: "list",
          output: {
            info: {
              selector: ".description",
            },
            price: {
              selector: ".unit-price",
            },
            picture: {
              selector: ".unit-img",
              output: "@src",
            },
            link: {
              selector: ".unit-item-details-title",
              output: "@href",
            },
          },
        },
      },
    },
  });
  return response;
}

get(
  "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings"
)
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
