const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "OLPANG4NCKJ4G76FXFW4I72YTX8ZDSDO02DMNYP0IKWMVBUIU84I8F16H5MEEVVQF5MNRWGPDNUV9LGF"
  );
  //process.env.SCRAPING_BEE_API_KEY;
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

get("https://www.venuesf.com/floorplans")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
