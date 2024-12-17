const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "OLPANG4NCKJ4G76FXFW4I72YTX8ZDSDO02DMNYP0IKWMVBUIU84I8F16H5MEEVVQF5MNRWGPDNUV9LGF"
  );
  //process.env.SCRAPING_BEE_API_KEY;
  var response = await client.get({
    url: url,
    params: {
      render_js: true,
      // js_scenario: {
      //   instructions: [
      //     {
      //       wait_for:
      //         "#jd-fp-body > div:nth-child(1) > div:nth-child(1) > div > div > div.jd-fp__toolbar-col.jd-fp__toolbar-col--tabs > div > a:nth-child(2)",
      //     },

      //     {
      //       wait_for_and_click:
      //         "#jd-fp-body > div:nth-child(1) > div:nth-child(1) > div > div > div.jd-fp__toolbar-col.jd-fp__toolbar-col--tabs > div > a:nth-child(2)",
      //     },
      //     { wait: 5000 },
      //   ],
      // },
      premium_proxy: true,
      wait: "5000",
      //wait_for: ".result-list-container",
      wait_for: ".search-page-list-header",
      block_resources: "False",
      extract_rules: {
        apartments: {
          //selector: "#grid-search-results > ul > li", 
          selector: ".search-title",
          //type: "list",
          // output: {
          //   area: {
          //     selector: ".PropertyCardWrapper__StyledPriceLine-srp-8-107-0__sc-16e8gqd-1",
          //   },
            // beds: {
            //   selector: ".floorplan-features > ul > li:nth-child(2) > b > span",
            // },
            // baths: {
            //   selector: ".floorplan-features > ul > li:nth-child(3) > b > span",
            // },
            // price: {
            //   selector: ".floorplan-num",
            // },
            // picture: {
            //   selector: ".floorplan-thumb a",
            //   output: "@href",
            // },
            // link: {
            //   selector: ".pr-button > a",
            //   output: "@href",
            // },
          //},
        },
      },
    },
  });

  return response;
}

get("https://www.zillow.com/homes/for_rent/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-122.5033965288223%2C%22east%22%3A-122.34975959644925%2C%22south%22%3A37.71063905016015%2C%22north%22%3A37.83764162227967%7D%2C%22filterState%22%3A%7B%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apco%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A14%2C%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%22San%20Francisco%20CA%22%7D")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));

// HOW TO GET POST REQUEST

// const fetchApartmentData = async () => {
//   const apiUrl = "https://solairesf.com/floorplans/";

//   // Payload from the request (replace with actual payload values)
//   const payload = new URLSearchParams({
//     action: "floorplans",
//   });

//   // Headers from the request
//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//     Cookie:
//       "PHPSESSID=b6c4a56d2179156007c14d98c3b6df3e; JonahLead=eyJyZWZlcnJlciI6Imdvb2dsZS5jb20iLCJyZWZlcnJlcl91cmxfcXVlcnlzdHJpbmciOm51bGwsImN1cnJlbnRfdXJsX3F1ZXJ5c3RyaW5nIjoidXRtX3NvdXJjZT1vYmwmdXRtX21lZGl1bT1vcmdhbmljIiwicHJvcGVydHlfaWRfaW5zdGFsbGVkIjp0cnVlfQ%3D%3D;", // Use your actual cookie values
//     Referer: "https://solairesf.com/floorplans/",
//     "User-Agent":
//       "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
//     Accept: "*/*",
//     "Accept-Language": "en-US,en;q=0.9",
//     "X-Requested-With": "XMLHttpRequest",
//     Origin: "https://solairesf.com",
//   };

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: headers,
//       body: payload.toString(),
//     });

//     if (response.ok) {
//       const jsonData = await response.json(); // Parse the JSON response
//       console.log(jsonData); // Log or process the data
//     } else {
//       console.error(
//         "Failed to fetch data:",
//         response.status,
//         response.statusText
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// // Call the function
// fetchApartmentData();
