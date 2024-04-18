import { getApartments } from "../../data/apartmentsScrape.mjs";

async function testGetApartments() {
  const data = [
    { input: [], expected: null },
    { input: ["", ""], expected: null },
    { input: ["test", ""], expected: null },

    // This runs the scrapping, don't want that in test => create mocks
    // {
    //   input: [
    //     "clso0gn4b000111l2vkugd9hr",
    //     "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings",
    //   ],
    //   expected: [],
    // },
  ];

  var i = 0;
  for (const item of data) {
    i++;
    const output = await getApartments(item.input[0], item.input[1]);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${i} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  }
  console.log("Tests completed");
}

testGetApartments();
