const puppeteer = require("puppeteer");
const proxyChain = require("proxy-chain");
const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "T3F66P6BIUQDW9IIO97V654TP2KXLOLK0RRTJJ04DVT0IVIUT0YO37K74HHSS30NRLWMEUDT7LN6TMTF"
    //process.env.SCRAPING_BEE_API_KEY
  );
  var response = await client.get({
    url: url,
    params: {
      js_scenario: {
        instructions: [{ wait_for_and_click: ".card-nav-btn" }, { wait: 5000 }],
      },
      block_resources: "False",
      wait: "35000",
      wait_for: ".card-container",
      extract_rules: {
        apartments: {
          selector: ".card-container",
          type: "list",
          output: {
            info: {
              selector: ".floorplan-title-meta span",
              type: "list",
              output: "text",
            },
            price: {
              selector: ".rate-display span",
              type: "item",
            },
            picture: {
              selector: ".v-image__image",
              output: "@style",
            },
            link: {
              selector: ".card-cta a",
              output: "@href",
            },
          },
        },
      },
    },
  });
  return response;
}

get("https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
