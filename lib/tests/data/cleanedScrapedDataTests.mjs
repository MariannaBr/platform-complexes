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

// needs to be done
function testgetApartmentsChase() {}

testgetApartmentsChase();

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

function testGetApartmentsMartin() {
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
          apartment_link: "https://www.themartinsf.com/page_url",
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
          apartment_link: "https://www.themartinsf.com/page_url",
        },
        {
          bedrooms: "2 Bed",
          baths: "2 Bath",
          area: "900 Sq. Ft.",
          price: "$4000",
          image: "img_url2",
          apartment_link: "https://www.themartinsf.com/page_url2",
        },
      ],
    },
  ];
  data.forEach((item, index) => {
    const output = getApartmentsMartin(item.input);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartmentsMartin();

function testGetApartmentsGantry() {
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
        apartments: [{ info: ["Name", "1 Bed / 1 Bath"] }],
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
            info: ["Name", "Studio / 1 Bath"],
            area: ["Sqft", "500"],
            price: "call us",
            picture: "",
            link: "page_url",
          },
        ],
      },
      expected: [
        {
          bedrooms: "Studio",
          baths: "1 Bath",
          area: "500 Sqft",
          price: null,
          image: "",
          apartment_link: "page_url",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: ["Name", "1 Bed / 1 Bath"],
            area: ["Sqft", ""],
            price: "2000",
            picture: "",
            link: "page_url",
          },
          {
            info: ["Name", "2 Beds / 2 Bath"],
            area: ["Sqft", "900"],
            price: "starts $4000/month",
            picture: "img_url2",
            link: "page_url2",
          },
        ],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: " Sqft",
          price: null,
          image: "",
          apartment_link: "page_url",
        },
        {
          bedrooms: "2 Beds",
          baths: "2 Baths",
          area: "900 Sqft",
          price: "$4000",
          image: "img_url2",
          apartment_link: "page_url2",
        },
      ],
    },
  ];
  data.forEach((item, index) => {
    const output = getApartmentsGantry(item.input);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartmentsGantry();

function testGetApartmentsOAM() {
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
          apartment_link:
            "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans",
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
          apartment_link:
            "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans",
        },
      ],
    },
    {
      input: {
        apartments: [{ info: ["1 Bed", "1 Bath"] }],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "",
          price: null,
          image: "",
          apartment_link:
            "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans",
        },
      ],
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
          image: "",
          apartment_link:
            "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: ["1 Bed", "1 Bath", "500 Sq. Ft."],
            price: "Starting at $2000",
            picture: 'background-image: url("http://www.example.com/img.png")',
            link: "",
          },
          {
            info: ["2 Bed", "2 Bath", "900 Sq. Ft."],
            price: "$4000",
            picture: "url('http://www.example.com/img.png')",
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
          image: "http://www.example.com/img.png",
          apartment_link:
            "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans",
        },
        {
          bedrooms: "2 Bed",
          baths: "2 Bath",
          area: "900 Sq. Ft.",
          price: null,
          image: "",
          apartment_link:
            "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans",
        },
      ],
    },
  ];
  data.forEach((item, index) => {
    const output = getApartmentsOAM(item.input);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartmentsOAM();

function testGetApartmentsWindsor() {
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
        apartments: [{ info: ["1 Bed", "1 Bath", "500 Sq. Ft."] }],
      },
      expected: [
        {
          bedrooms: "1 Bed",
          baths: "1 Bath",
          area: "500 Sq. Ft.",
          price: null,
          image: "",
          apartment_link: "https://www.windsoratdogpatch.com/floorplans/",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: ["1 Bed", "1 Bath", "500 Sq. Ft."],
            title: "Apartment1",
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
          apartment_link:
            "https://www.windsoratdogpatch.com/floorplans/apartment1",
        },
      ],
    },
    {
      input: {
        apartments: [
          {
            info: ["1 Bed", "1 Bath", "500 Sq. Ft."],
            title: "",
            price: "Starting at $2000",
            picture: "img_url",
            link: "page_url",
          },
          {
            info: ["2 Bed", "2 Bath", "900 Sq. Ft."],
            title: "apartment",
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
          apartment_link: "https://www.windsoratdogpatch.com/floorplans/",
        },
        {
          bedrooms: "2 Bed",
          baths: "2 Bath",
          area: "900 Sq. Ft.",
          price: "$4000",
          image: "img_url2",
          apartment_link:
            "https://www.windsoratdogpatch.com/floorplans/apartment",
        },
      ],
    },
  ];
  data.forEach((item, index) => {
    const output = getApartmentsWindsor(item.input);
    console.assert(
      JSON.stringify(output) === JSON.stringify(item.expected),
      `Test case ${index + 1} failed. ${JSON.stringify(
        output
      )}. expected: ${JSON.stringify(item.expected)}`
    );
  });
  console.log("Tests completed");
}

testGetApartmentsWindsor();
