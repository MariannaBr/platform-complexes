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
              "body > div.component.section-component > astro-island > section > div > ul > li:nth-child(2) > button",
          },
          { wait: 300 },
          {
            wait_for_and_click:
              "body > div.component.section-component > astro-island > section > div > div > ul > li:nth-child(3) > button",
          },
        ],
      },
      block_resources: "False",
      //wait_for: ".availability-component",
      extract_rules: {
        apartments: {
          selector:
            "body > div.component.section-component > astro-island > section > div > div > div.grid.grid-cols-1.md:grid-cols-4.gap-5",
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

get("https://www.verdesf.com/availability/")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
