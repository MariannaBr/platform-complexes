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
      wait_for: ".floorplan-details",
      extract_rules: {
        apartments: {
          selector: '//tr[@scope="row"]',
          type: "list",
          output: {
            bedsBaths: {
              selector: "td:nth-child(3)",
            },
            area: {
              selector: "td:nth-child(4)",
            },
            link: {
              selector: ".applyButton",
              output: "@onclick",
            },
            picture: {
              selector: ".floorplan-img > div > a > img",
              output: "@data-src",
            },
            price: {
              selector: "td:nth-child(5)",
            },
          },
        },
      },
    },
  });
  return response;
}

get("https://rentjasper.securecafe.com/onlineleasing/jasper-1/floorplans.aspx")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
