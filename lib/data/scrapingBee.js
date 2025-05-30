const { type } = require("os");
const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "OLPANG4NCKJ4G76FXFW4I72YTX8ZDSDO02DMNYP0IKWMVBUIU84I8F16H5MEEVVQF5MNRWGPDNUV9LGF"
  );
  //process.env.SCRAPING_BEE_API_KEY;
  var response = await client.get({
    url: url,
    params: {
      render_js: "true",
      block_resources: "false",
      premium_proxy: "True",
      stealth_proxy: "True",
      wait_for: "#main-content > div:nth-child(4) > shreddit-feed",
      //wait: "500",
      extract_rules: {
        posts: {
          selector:
            "#main-content > div:nth-child(4) > shreddit-feed > faceplate-batch > article",
          type: "list",
          output: {
            commentCount: {
              selector: "shreddit-post",
              output: "@comment-count"
            },
            postLink: {
              selector: "shreddit-post",
              output: "@content-href"
            }
            // post_link: {
            //   selector: "a[data-click-id='body']",
            //   output: "@href"
            // },
            // comments_text: {
            //   selector: "span[data-click-id='comments']",
            //   type: "text"
            // },
            // upvotes_text: {
            //   selector: "div[data-click-id='upvote']",
            //   type: "text"
            // }
          }
        }
      }
    }
  });

  return response;
}
const subreddits = [
  "Divorce",
  "SurvivingMyInfidelity",
  "HomeImprovement",
  "RealEstate",
  "HomeSelling",
  "ApplyingToCollege",
  "freelance",
  "EntrepreneurRideAlong",
  "personalfinance",
  "NewParents"
];

get("https://www.reddit.com/r/" + subreddits[0])
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
