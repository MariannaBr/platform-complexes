const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "OLPANG4NCKJ4G76FXFW4I72YTX8ZDSDO02DMNYP0IKWMVBUIU84I8F16H5MEEVVQF5MNRWGPDNUV9LGF"
  );
  //process.env.SCRAPING_BEE_API_KEY;
  var response = await client.get({
    url: url,
    params: {
      wait_for: ".spaces__tab-container",
      extract_rules: {
        apartments: {
          selector: ".spaces-unit",
          type: "list",
          output: {
            beds: {
              selector: ".spaces__plan__attributes-bedcount span",
              type: "list",
            },
            baths: {
              selector: ".spaces__plan__attributes-bathcount span",
              type: "list",
            },
            area: {
              selector: ".spaces__plan__attributes-area span",
              type: "list",
            },
            price: {
              selector: ".spaces__label-price a",
              type: "item",
              output: "text",
            },
            picture: {
              selector: ".spaces__unit-media a",
              type: "list",
              output: "@href",
            },
            link: {
              selector: ".spaces__unit-cta a",
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
