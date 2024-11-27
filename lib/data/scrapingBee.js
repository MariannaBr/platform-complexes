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
      //       wait_for_and_click: ".view-footer > a",
      //     },
      //     { wait: 300 },
      //     // {
      //     //   wait_for_and_click:
      //     //     "body > div.component.section-component > astro-island > section > div > div > ul > li:nth-child(3) > button",
      //     // },
      //   ],
      // },
      //premium_proxy: "True",
      //block_resources: "False",
      wait_for: ".views-content-inner",
      extract_rules: {
        apartments: {
          selector: '//*[@id="paragraph-6"]/div/div/div/div[3]/div[3]/div',
          type: "list",
          output: {
            bedsBaths: {
              selector: ".node--type-unit",
              output: "@data-variant",
            },
            price: {
              selector: ".node--type-unit",
              output: "@data-price",
            },
            picture: {
              selector: ".field--type-image img",
              output: "@src",
            },
            link: {
              selector: ".node--type-unit",
              output: "@about",
            },
          },
        },
      },
    },
  });
  return response;
}

get(
  "https://www.relatedrentals.com/search?city=51&property=%5B%5B%3A%3C%3A%5D%5D(10057386)%5B%5B%3A%3E%3A%5D%5D"
)
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
