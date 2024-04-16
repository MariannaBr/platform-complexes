import { getApartments } from "../../data/apartmentsScrape.mjs";

function testGetApartments() {
  const data = [
    { input: [], expected: [] },
    { input: ["", ""], expected: [] },
    { input: ["test", ""], expected: [] },
    {
      input: [
        "clso0gn4b000111l2vkugd9hr",
        "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings",
      ],
      expected: [],
    },
  ];

  data.forEach((item, index) => {
    const output = getApartments(item.input[0], item.input[1]);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartments();
