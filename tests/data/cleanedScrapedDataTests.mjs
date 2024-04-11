import {
  getApartmentsChase,
  getApartmentsAvalon,
  getApartmentsMariposa,
  getApartmentsTenn,
  getApartmentsPotrero,
  getApartmentsMartin,
  getApartmentsGantry,
  getApartmentsOAM,
  getApartmentsWindsor,
} from "../../data/cleanedScrapedData.mjs";

function testGetApartmentsAvalon() {
  const data = [
    { input: {}, expected: [] },
    {
      input: {
        apartments: [],
      },
      expected: [],
    },
    {
      input: {
        apartments: [{}],
      },
      expected: [
        {
          bedrooms: "",
          baths: "",
          area: "",
          price: null,
          image: "",
          apartment_link: "",
        },
      ],
    },
    {
      input: {
        apartments: [{ info: "" }],
      },
      expected: [
        {
          bedrooms: "",
          baths: "",
          area: "",
          price: null,
          image: "",
          apartment_link: "",
        },
      ],
    },
    {
      input: {
        apartments: [{ info: "1 Bed • 1 Bath" }],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "",
          price: null,
          image: "",
          apartment_link: "",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: "1 Bed • 1 Bath • 500 sqft",
            price: "call us",
            picture: "img_url",
            link: "page_url",
          },
        ],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "500 sqft",
          price: null,
          image: "img_url",
          apartment_link: "page_url",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: "1 Bed | 1 Bath | 500 sqft",
            price: "$2000",
            picture: "img_url",
            link: "page_url",
          },
          {
            info: "2 Bed • 2 Bath • 900 sqft",
            price: "$4000",
            picture: "img_url2",
            link: "page_url2",
          },
        ],
      },
      expected: [
        {
          bedrooms: "1 Bed | 1 Bath | 500 sqft",
          baths: "",
          area: "",
          price: "$2000",
          image: "img_url",
          apartment_link: "page_url",
        },
        {
          bedrooms: "2 Bed",
          baths: "2 Bath",
          area: "900 sqft",
          price: "$4000",
          image: "img_url2",
          apartment_link: "page_url2",
        },
      ],
    },
  ];
  data.forEach((item, index) => {
    const output = getApartmentsAvalon(item.input);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartmentsAvalon();

function testGetApartmentsMariposa() {
  const data = [
    { input: {}, expected: [] },
    {
      input: {
        apartments: [],
      },
      expected: [],
    },
    {
      input: {
        apartments: [{}],
      },
      expected: [
        {
          bedrooms: "",
          baths: "",
          area: "- Sq. Ft.",
          price: null,
          image: "",
          apartment_link: "",
        },
      ],
    },
    {
      input: {
        apartments: [{ info: "" }],
      },
      expected: [
        {
          bedrooms: "",
          baths: "",
          area: "- Sq. Ft.",
          price: null,
          image: "",
          apartment_link: "",
        },
      ],
    },
    {
      input: {
        apartments: [{ info: "0 Bed | 1 Bath" }],
      },
      expected: [
        {
          bedrooms: "Studio",
          baths: "1 Bath",
          area: "- Sq. Ft.",
          price: null,
          image: "",
          apartment_link: "",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: "1 Bed | 1 Bath",
            area: "500",
            price: "call us",
            picture: "img_url",
            link: "page_url",
          },
        ],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "500 Sq. Ft.",
          price: null,
          image: "https://www.themariposa.comimg_url",
          apartment_link: "page_url",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: "1 Bed | 1 Bath",
            area: "500",
            price: "Starting at $2000",
            picture: "img_url",
            link: "page_url",
          },
          {
            info: "2 Bed • 2 Bath",
            area: "900",
            price: "$4000",
            picture: "img_url2",
            link: "page_url2",
          },
        ],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "500 Sq. Ft.",
          price: "$2000",
          image: "https://www.themariposa.comimg_url",
          apartment_link: "page_url",
        },
        {
          bedrooms: "2 Bed • 2 Bath",
          baths: "",
          area: "900 Sq. Ft.",
          price: "$4000",
          image: "https://www.themariposa.comimg_url2",
          apartment_link: "page_url2",
        },
      ],
    },
  ];
  data.forEach((item, index) => {
    const output = getApartmentsMariposa(item.input);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartmentsMariposa();

function testGetApartmentsTenn() {
  const data = [
    { input: {}, expected: [] },
    {
      input: {
        apartments: [],
      },
      expected: [],
    },
    {
      input: {
        apartments: [{}],
      },
      expected: [],
    },
    {
      input: {
        apartments: [{ info: "" }],
      },
      expected: [],
    },
    {
      input: {
        apartments: [{ info: ["1 Bed", "1 Bath"] }],
      },
      expected: [],
    },
    {
      input: {
        apartments: [
          {
            info: ["1 Bed", "1 Bath", "500 Sq. Ft."],
            price: "call us",
            picture: "img_url",
            link: "page_url",
          },
        ],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "500 Sq. Ft.",
          price: null,
          image: "img_url",
          apartment_link: "https://www.live777tenn.compage_url",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: ["1 Bed", "1 Bath", "500 Sq. Ft."],
            price: "Starting at $2000",
            picture: "img_url",
            link: "page_url",
          },
          {
            info: ["2 Bed", "2 Bath", "900 Sq. Ft."],
            price: "$4000",
            picture: "img_url2",
            link: "page_url2",
          },
        ],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "500 Sq. Ft.",
          price: "$2000",
          image: "img_url",
          apartment_link: "https://www.live777tenn.compage_url",
        },
        {
          bedrooms: "2 Bed",
          baths: "2 Bath",
          area: "900 Sq. Ft.",
          price: "$4000",
          image: "img_url2",
          apartment_link: "https://www.live777tenn.compage_url2",
        },
      ],
    },
  ];
  data.forEach((item, index) => {
    const output = getApartmentsTenn(item.input);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartmentsTenn();

function testGetApartmentsPotrero() {
  const data = [
    { input: "<div>", expected: [] },
    { input: "{}", expected: [] },
    {
      input: {
        apartments: "[]",
      },
      expected: [],
    },
    {
      input: {
        apartments: "[{}]",
      },
      expected: [
        {
          bedrooms: "",
          baths: "",
          area: "",
          price: null,
          image: "",
          apartment_link: "",
        },
      ],
    },
    {
      input: {
        apartments: JSON.stringify([
          {
            Beds: "0",
            Baths: "1",
            MinimumSQFT: "500",
            MinimumRent: "-1",
            FloorplanImageURL: "img_url",
            AvailabilityURL: "page_url",
          },
        ]),
      },
      expected: [
        {
          bedrooms: "Studio",
          baths: "1 Bath",
          area: "500 Sq. Ft.",
          price: null,
          image: "img_url",
          apartment_link: "page_url",
        },
      ],
    },
    {
      input: {
        apartments: JSON.stringify([
          {
            Beds: "1",
            Baths: "1",
            MinimumSQFT: "500",
            MinimumRent: "2000",
            FloorplanImageURL: "img_url",
            AvailabilityURL: "page_url",
          },
          {
            Beds: "2",
            Baths: "1.5",
            MinimumSQFT: "900",
            MinimumRent: "4000",
            FloorplanImageURL: "img_url2",
            AvailabilityURL: "page_url2",
          },
        ]),
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "500 Sq. Ft.",
          price: "$2,000",
          image: "img_url",
          apartment_link: "page_url",
        },
        {
          bedrooms: "2 Beds",
          baths: "1.5 Baths",
          area: "900 Sq. Ft.",
          price: "$4,000",
          image: "img_url2",
          apartment_link: "page_url2",
        },
      ],
    },
  ];
  data.forEach((item, index) => {
    const output = getApartmentsPotrero(item.input);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartmentsPotrero();
