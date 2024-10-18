const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "OLPANG4NCKJ4G76FXFW4I72YTX8ZDSDO02DMNYP0IKWMVBUIU84I8F16H5MEEVVQF5MNRWGPDNUV9LGF"
  );
  //process.env.SCRAPING_BEE_API_KEY;
  var response = await client.get({
    url: url,
    params: {
      js_scenario: {
        instructions: [
          { wait_for_and_click: ".rpfp-button--availability" },
          { wait_for: ".rpfp-unit-rent" },
          {
            extract_rules: {
              price,
            },
          },
        ],
      },
      wait_for: ".rpfp-card",
      extract_rules: {
        // prices: {
        //   selector: ".rpfp-button--availability"
        // }
        apartments: {
          selector: ".rpfp-card",
          type: "list",
          output: {
            beds: {
              selector: ".rpfp-beds",
              type: "item",
              output: "text",
            },
            area: {
              selector: ".rpfp-sqft",
              type: "item",
              output: "text",
            },
            baths: {
              selector: ".rpfp-bath",
              type: "item",
              output: "text",
            },
            price: {
              selector: ".rpfp-rent",
              type: "item",
            },
            picture: {
              selector: ".rpfp-image",
              output: "@data-src",
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

get("https://www.themartinsf.com/floor-plans")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
