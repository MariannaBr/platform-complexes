const puppeteer = require("puppeteer");
const proxyChain = require("proxy-chain");
const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "HFHGTKG035GVEUIF8VB5KG1TZG8DBPCPO1KDTWO78WKWPKLR6A3E1UGPCJCC90X53NW2UV6NHE102CX7"
  );
  var response = await client.get({
    url: url,
    params: {
      wait_for: ".fp-container",
      extract_rules: {
        apartments: {
          selector: '//div[@id="floorplans-container"]/div',
          type: "list",
          output: {
            info: {
              selector: "li",
              type: "list",
              output: "text",
            },
            price: {
              selector: ".card-body span",
              type: "item",
            },
            picture: {
              selector: ".card-img-top",
              output: "@src",
            },
            link: {
              selector: ".floorplan-action-button",
              output: "@href",
            },
          },
        },
      },
    },
  });
  return response;
}

get("https://www.live777tenn.com/floorplans")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
