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
      wait_for: ".floorplan-list",
      extract_rules: {
        apartments: {
          selector: ".floorplan-list > div",
          type: "list",
          output: {
            beds: {
              selector: ".card-item",
              output: "@data-beds",
            },
            area: {
              selector: ".card-item",
              output: "@data-maximumsqft",
            },
            link: {
              selector:
                ".card-item > div > div > div:nth-child(2) > button > a",
              output: "@href",
            },
            picture: {
              selector: ".image",
              output: "@src",
            },
            price: {
              selector: ".card-item",
              output: "@data-max_price",
            },
          },
        },
      },
    },
  });
  return response;
}

get("https://rent.brookfieldproperties.com/floorplans/?propertyId[]=1780420")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
