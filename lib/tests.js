const data = {
  apartments: [
    {
      info: ["Beds / Baths", "1 bd / 1 ba"],
      price: "$3,353/month",
      area: ["Sq. Ft", "598"],
      picture:
        "https://medialibrarycfo.entrata.com/fit-in/300x212/14034/MLv3/4/22/2022/04/21/014517/6261b44d4941a1.45609447650.jpg",
      link: "https://www.thegantryapts.com/san-francisco/the-gantry/floorplans/a1-1014724/fp_name/occupancy_type/conventional/",
    },
    {
      info: ["Beds / Baths", "1 bd / 1 ba"],
      price: "Starting from $3,297/month",
      area: ["Sq. Ft", "627"],
      picture:
        "https://medialibrarycfo.entrata.com/fit-in/300x129/14034/MLv3/4/22/2022/04/21/014632/6261b498975584.14404372531.jpg",
      link: "https://www.thegantryapts.com/san-francisco/the-gantry/floorplans/a2-1014725/fp_name/occupancy_type/conventional/",
    },
    {
      info: ["Beds / Baths", "2 bd / 1 ba"],
      price: "Starting from $3,659/month",
      area: ["Sq. Ft", "833"],
      picture:
        "https://medialibrarycfo.entrata.com/fit-in/300x185/14034/MLv3/4/22/2022/04/21/014827/6261b50b8d7252.43084787287.jpg",
      link: "https://www.thegantryapts.com/san-francisco/the-gantry/floorplans/b1-1014727/fp_name/occupancy_type/conventional/",
    },
    {
      info: ["Beds / Baths", "2 bd / 2 ba"],
      price: "Starting from $4,057/month",
      area: ["Sq. Ft", "921"],
      picture:
        "https://medialibrarycfo.entrata.com/fit-in/300x245/14034/MLv3/4/22/2022/04/21/015014/6261b5761465c1.50056942702.jpg",
      link: "https://www.thegantryapts.com/san-francisco/the-gantry/floorplans/b3-1014729/fp_name/occupancy_type/conventional/",
    },
  ],
};

function cleaning(apartmentsData) {
  var apartments = apartmentsData.apartments.map((item) => {
    const bedBath = item.info[1].split("/");
    const beds = bedBath[0].trim().split(" ")[0];
    const bath = bedBath[1].trim().split(" ")[0];
    var bedrooms = beds + " Beds";
    if (beds === "1") {
      bedrooms = beds + " Bed";
    }
    var baths = bath + " Baths";
    if (bath === "1") {
      baths = bath + " Bath";
    }
    const area = item.area[1] + " " + item.area[0];
    var price = null;
    if (item.price.includes("$")) {
      const index = item.price.indexOf("$");
      const priceMonth = item.price.slice(index);
      price = priceMonth.split("/")[0];
    }
    var image = item.picture;
    var apartment_link = item.link;
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  console.log(apartments);
}

cleaning(data);
