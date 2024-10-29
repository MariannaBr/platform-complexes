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
          {
            wait_for_and_click:
              "#common_component_0 > ul > li:nth-child(2) > button",
          },
          { wait: 300 },
        ],
      },
      block_resources: "False",
      wait_for: ".availability-component",
      extract_rules: {
        apartments: {
          selector: ".apartment-item",
          type: "list",
          output: {
            picture: {
              selector: ".image-wrapper img",
              output: "@src",
            },
            info: {
              selector: ".body-wrapper li",
              type: "list",
            },
            link: {
              selector: ".body-wrapper a",
              output: "@href",
            },
          },
        },
      },
    },
  });
  return response;
}

get("https://www.thecanyonsf.com/availability")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
