const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "OLPANG4NCKJ4G76FXFW4I72YTX8ZDSDO02DMNYP0IKWMVBUIU84I8F16H5MEEVVQF5MNRWGPDNUV9LGF"
  );
  //process.env.SCRAPING_BEE_API_KEY;
  var response = await client.get({
    url: url,
    params: {
      wait_for: ".floor-plan-card__wrapper",
      extract_rules: {
        apartments: {
          selector: ".floor-plan-card__wrapper > div",
          type: "list",
          output: {
            info: {
              selector: ".floor-plan-card__content__size",
              output: "markdown_relevant",
            },
            picture: {
              selector: ".image-lightbox__image",
              output: "@src",
            },
            price: {
              selector: ".floor-plan-card__content__price",
            },
          },
        },
      },
    },
  });
  return response;
}

get(
  "https://www.essexapartmenthomes.com/apartments/san-francisco/mb360/floor-plans-and-pricing"
)
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
