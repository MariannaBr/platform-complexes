const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "OLPANG4NCKJ4G76FXFW4I72YTX8ZDSDO02DMNYP0IKWMVBUIU84I8F16H5MEEVVQF5MNRWGPDNUV9LGF"
  );
  //process.env.SCRAPING_BEE_API_KEY;
  var response = await client.get({
    url: url,
    params: {
      // js_scenario: {
      //   instructions: [
      //     {
      //       wait_for_and_click:
      //         "body > div.component.section-component > astro-island > section > div > ul > li:nth-child(2) > button",
      //     },
      //     { wait: 300 },
      //     {
      //       wait_for_and_click:
      //         "body > div.component.section-component > astro-island > section > div > div > ul > li:nth-child(3) > button",
      //     },
      //   ],
      // },
      block_resources: "False",
      wait_for: ".ap-results",
      extract_rules: {
        apartments: {
          selector: ".ap-unit",
          type: "list",
          output: {
            beds: {
              selector: ".unit-bed-count",
            },
            baths: {
              selector: ".unit-bath-count",
            },
            area: {
              selector: ".unit-sqft",
            },
            picture: {
              selector: ".unit-image",
              output: "@data-src",
            },
            price: {
              selector: ".details-rent-amount",
            },
          },
        },
      },
    },
  });
  return response;
}

get(
  "https://www.udr.com/san-francisco-bay-area-apartments/san-francisco/399-fremont/apartments-pricing/"
)
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
