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
      //block_resources: "False",
      wait_for: '//div[@id="floorplan-container"]',
      extract_rules: {
        apartments: {
          selector: '//div[@id="floorplan-container"]/div',
          type: "list",
          output: {
            picture: {
              selector: ".floorplan-image > a",
              output: "@href",
            },
            beds: {
              selector: ".floorplan-block",
              output: "@data-bed",
            },
            baths: {
              selector: ".floorplan-block",
              output: "@data-bath",
            },
            price: {
              selector: ".floorplan-block",
              output: "@data-rent",
            },
            area: {
              selector: ".floorplan-block",
              output: "@data-sqft",
            },
            link: {
              selector: ".li_print > a",
              output: "@onclick",
            },
          },
        },
      },
    },
  });
  return response;
}

get("https://www.rincongreen.com/Floor-plans.aspx")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
