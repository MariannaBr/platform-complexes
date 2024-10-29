// DOGPATCH

export function getApartmentsChase(apartmentsData) {
  // needs to be added when complex has some apartments on web
  const apartments = null;
  return apartments;
}

export function getApartmentsAvalon(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = "";
    var baths = "";
    var area = "";
    var price = null;
    var image = "";
    var apartment_link = "";
    if (item.info) {
      const info = item.info.split("•");
      if (info[0]) {
        bedrooms = info[0].trim();
      }
      if (info[1]) {
        baths = info[1].trim();
      }
      if (info[2]) {
        area = info[2].trim();
      }
    }
    if (item.price && item.price.includes("$")) {
      price = item.price;
    }
    if (item.picture) {
      image = item.picture;
    }
    if (item.link) {
      apartment_link = item.link;
    }
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsMariposa(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = "";
    var baths = "";
    var area = "- Sq. Ft.";
    var price = null;
    var image = "";
    var apartment_link = "";
    if (item.info) {
      const bedBath = item.info;
      const bedBathArray = bedBath.split("|");
      if (bedBathArray[0]) {
        bedrooms = bedBathArray[0].trim();
      }
      if (bedrooms.includes("0")) {
        bedrooms = "Studio";
      }
      if (bedBathArray[1]) {
        baths = bedBathArray[1].trim();
      }
    }
    if (item.area) {
      area = item.area;
    }
    if (item.price && item.price.includes("$")) {
      const index = item.price.indexOf("$");
      price = item.price.substring(index);
    }
    if (item.picture) {
      image = "https://www.themariposa.com" + item.picture;
    }
    if (item.link) {
      apartment_link = item.link;
    }
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsTenn(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments
    .filter((item) => {
      if (item.info && item.info.length === 3) {
        return item;
      }
    })
    .map((item) => {
      const bedrooms = item.info[0] ?? "";
      const baths = item.info[1] ?? "";
      const area = item.info[2] ?? "";
      var price = null;
      if (item.price && item.price.includes("$")) {
        const index = item.price.indexOf("$");
        price = item.price.slice(index);
      }
      const image = item.picture ?? "";
      const apartment_link = item.link
        ? "https://www.live777tenn.com" + item.link
        : "";

      return { bedrooms, baths, area, price, image, apartment_link };
    });
  return apartments;
}

export function getApartmentsPotrero(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  try {
    const dataDecoded = JSON.parse(apartmentsData.apartments);
    const apartments = dataDecoded.map((item) => {
      var bedrooms = "";
      var baths = "";
      var area = "";
      var price = null;
      var image = "";
      var apartment_link = "";
      if (item.Beds) {
        const beds = item.Beds;
        bedrooms = beds + " Beds";
        if (beds === "0") {
          bedrooms = "Studio";
        }
        if (beds === "1") {
          bedrooms = beds + " Bed";
        }
      }
      if (item.Baths) {
        const bath = item.Baths;
        const bathArray = Array.from(bath);
        var bathCleaned = "";
        if (bathArray[0]) {
          bathCleaned = bathArray[0];
        }
        if (bathArray[2] && bathArray[2] !== "0") {
          bathCleaned = bath.slice(0, 3);
        }
        if (bathCleaned) {
          baths = bathCleaned + " Baths";
          if (bathCleaned === "1") {
            baths = bathCleaned + " Bath";
          }
        }
      }
      if (item.MinimumSQFT) {
        area = item.MinimumSQFT + " Sq. Ft.";
      }
      if (item.MinimumRent) {
        const rentArray = Array.from(item.MinimumRent);
        if (item.MinimumRent !== "-1" && rentArray[0]) {
          price = "$" + rentArray[0] + "," + item.MinimumRent.slice(1);
        }
      }
      if (item.FloorplanImageURL) {
        image = item.FloorplanImageURL;
      }
      if (item.AvailabilityURL) {
        apartment_link = item.AvailabilityURL;
      }
      return { bedrooms, baths, area, price, image, apartment_link };
    });
    return apartments;
  } catch {
    return null;
  }
}

export function getApartmentsMartin(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.beds ?? "";
    const baths = item.baths ?? "";
    const area = item.area ?? "";
    var price = null;
    if (item.price && item.price.includes("$")) {
      const index = item.price.indexOf("$");
      price = item.price.slice(index);
    }
    const image = item.picture ?? "";
    var apartment_link = "https://www.themartinsf.com/floor-plans";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsGantry(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = "";
    var baths = "";
    var area = "";
    var price = null;
    if (item.info && item.info[1]) {
      const bedBath = item.info[1].split("/");
      const beds = bedBath[0].trim().split(" ")[0];
      const bath = bedBath[1].trim().split(" ")[0];
      if (beds === "2" || beds === "3") {
        bedrooms = beds + " Beds";
      } else if (beds === "1") {
        bedrooms = beds + " Bed";
      } else {
        bedrooms = beds;
      }
      baths = bath + " Baths";
      if (bath === "1") {
        baths = bath + " Bath";
      }
    }
    if (item.area && item.area.length > 1) {
      area = item.area[1] + " " + item.area[0];
    }
    if (item.price && item.price.includes("$")) {
      const index = item.price.indexOf("$");
      const priceMonth = item.price.slice(index);
      price = priceMonth.split("/")[0];
    }
    const image = item.picture ?? "";
    const apartment_link = item.link ?? "";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsOAM(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = "";
    var baths = "";
    var area = "";
    if (item.info) {
      bedrooms = item.info[0] ?? "";
      baths = item.info[1] ?? "";
      area = item.info[2] ?? "";
    }
    var price = null;
    if (item.price && (!item.link || item.link.length === 0)) {
      if (item.link.length === 0 && item.price.includes("$")) {
        const index = item.price.indexOf("$");
        price = item.price.slice(index);
      }
    }
    var image = "";
    const regex = /url\("([^"]+)"\)/;
    if (item.picture) {
      const match = item.picture.match(regex);
      if (match && match[1]) {
        image = match[1];
      }
    }
    var apartment_link =
      "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsWindsor(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = "";
    var baths = "";
    var area = "";
    var price = null;
    var image = "";
    if (item.beds && item.beds[1]) {
      if (item.beds[1] === "2" || item.beds[1] === "3") {
        bedrooms = item.beds[1] + " Beds";
      } else if (item.beds[1] === "1") {
        bedrooms = item.beds[1] + " Bed";
      } else {
        bedrooms = item.beds[1];
      }
    }
    if (item.baths && item.baths[1]) {
      baths = item.baths[1] + " Baths";
      if (item.baths[1] === "1") {
        baths = item.baths[1] + " Bath";
      }
    }
    if (item.area && item.area[1]) {
      area = item.area[1];
    }
    if (item.price && item.price.includes("$")) {
      price = item.price.split("/")[0].trim();
    }
    if (item.picture && item.picture[0]) {
      image = item.picture[0];
    }
    const apartment_link = item.link
      ? "https://www.windsorcommunities.com/properties/windsor-at-dogpatch/floorplans/" +
        item.link
      : "";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

// MISSION BAY

export function getApartmentsWindsorMissionBay(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = "";
    var baths = "";
    var area = "";
    var price = null;
    var image = "";
    if (item.beds && item.beds[1]) {
      if (item.beds[1] === "2" || item.beds[1] === "3") {
        bedrooms = item.beds[1] + " Beds";
      } else if (item.beds[1] === "1") {
        bedrooms = item.beds[1] + " Bed";
      } else {
        bedrooms = item.beds[1];
      }
    }
    if (item.baths && item.baths[1]) {
      baths = item.baths[1] + " Baths";
      if (item.baths[1] === "1") {
        baths = item.baths[1] + " Bath";
      }
    }
    if (item.area && item.area[1]) {
      area = item.area[1];
    }
    if (item.price && item.price.includes("$")) {
      price = item.price.split("/")[0].trim();
    }
    if (item.picture && item.picture[0]) {
      image = item.picture[0];
    }
    const apartment_link = item.link
      ? "https://www.windsorcommunities.com/properties/mission-bay-by-windsor/floorplans/" +
        item.link
      : "";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsAvalonMissionBay(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = "";
    var baths = "";
    var area = "";
    var price = null;
    var image = "";
    var apartment_link = "";
    if (item.info) {
      const info = item.info.split("•");
      if (info[0]) {
        bedrooms = info[0].trim();
      }
      if (info[1]) {
        baths = info[1].trim();
      }
      if (info[2]) {
        area = info[2].trim();
      }
    }
    if (item.price && item.price.includes("$")) {
      price = item.price;
    }
    if (item.picture) {
      image = item.picture;
    }
    if (item.link) {
      apartment_link = item.link;
    }
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsVenue(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments
    .filter((item) => {
      if (item.info && item.info.length === 3) {
        return item;
      }
    })
    .map((item) => {
      const bedrooms = item.info[0] ?? "";
      const baths = item.info[1] ?? "";
      const area = item.info[2] ?? "";
      var price = null;
      if (item.price && item.price.includes("$")) {
        const index = item.price.indexOf("$");
        price = item.price.slice(index);
      }
      const image = item.picture ?? "";
      const apartment_link = item.link
        ? "https://www.venuesf.com" + item.link
        : "";

      return { bedrooms, baths, area, price, image, apartment_link };
    });
  return apartments;
}

export function getApartmentsStrata(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments
    .filter((item) => {
      if (item.info && item.info.length === 3) {
        return item;
      }
    })
    .map((item) => {
      const bedrooms = item.info[0] ?? "";
      const baths = item.info[1] ?? "";
      const area = item.info[2] ?? "";
      var price = null;
      if (item.price && item.price.includes("$")) {
        const index = item.price.indexOf("$");
        price = item.price.slice(index);
      }
      const image = item.picture ?? "";
      const apartment_link = item.link
        ? "https://www.stratasf.com" + item.link
        : "";

      return { bedrooms, baths, area, price, image, apartment_link };
    });
  return apartments;
}

export function getApartmentsAzure(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedsBaths = item.info[7] ? item.info[7].split("/") : [];
    const bedrooms = bedsBaths[0] ? bedsBaths[0].trim() : "";
    const baths = bedsBaths[1] ? bedsBaths[1].trim() : "";
    const area = item.info[9] ?? "";
    var price = null;
    if (item.price && item.price.includes("$")) {
      price = item.price;
    }
    const image = item.picture ?? "";
    const apartment_link =
      "https://www.equityapartments.com/san-francisco-bay/mission-bay/azure-apartments##unit-availability-tile";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsVerde(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = JSON.parse(
    apartmentsData.apartments[0]
  ).preloadedApartments[1].map((item) => {
    const info = item[1];
    const image = info.FloorplanImageURL[1];
    const area = info.SQFT[1] + " Sq. Ft.";
    const bathsInfo = info.Baths[1].toString();
    const baths =
      bathsInfo === "1" ? bathsInfo + " Bath" : bathsInfo + " Baths";
    const priceInfo = info.MinimumRent[1].split(".")[0];
    const formattedNumber = Number(priceInfo).toLocaleString();
    const price = "$" + formattedNumber;
    const apartment_link = info.ApplyOnlineURL[1];
    const bedsInfo = info.Beds[1].toString();
    let bedrooms = "Studio";
    if (bedsInfo === "1") bedrooms = bedsInfo + " Bed";
    if (bedsInfo === "2" || bedsInfo === "3" || bedsInfo === "4")
      bedrooms = bedsInfo + " Beds";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsCanyon(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const image = item.picture;
    let area = "";
    let bedrooms = "";
    let baths = "";
    let price = "";
    if (item.info[1]) {
      area = item.info[1].split(" ")[0] + " sqft";
    }
    if (item.info[2]) {
      const beds = item.info[2].split(" ")[0];
      if (beds === "0") {
        bedrooms = "Studio";
      } else if (beds === "1") {
        bedrooms = "1 Bed";
      } else {
        bedrooms = beds + " Beds";
      }
    }
    if (item.info[3]) {
      const bathsInfo = item.info[3].split(" ")[0];
      if (bathsInfo === "1") {
        baths = "1 Bath";
      } else {
        baths = bathsInfo + " Baths";
      }
    }
    if (item.info[4]) {
      const priceInfo = item.info[4].split("$")[1];
      const formattedNumber = Number(priceInfo).toLocaleString();
      price = "$" + formattedNumber;
    }
    const apartment_link = "https://www.thecanyonsf.com" + item.link;

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsEdgewater(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.beds ?? "";
    const baths = item.baths ?? "";
    const area = item.area ?? "";
    const price = item.price ?? null;
    const image = "https://www.udr.com" + item.picture;
    const apartment_link =
      "https://www.udr.com/san-francisco-bay-area-apartments/san-francisco/edgewater/apartments-pricing/";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsChannel(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.beds ?? "";
    const baths = item.baths ?? "";
    const area = item.area ?? "";
    const price = item.price ?? null;
    const image = "https://www.udr.com" + item.picture;
    const apartment_link =
      "https://www.udr.com/san-francisco-bay-area-apartments/san-francisco/channel-mission-bay/apartments-pricing/";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsMb360(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const info = item.info ? item.info.split("\\\n") : [];
    const bedsBaths = info[0].split("/");
    const bedrooms = bedsBaths[0] ? bedsBaths[0].trim() : "";
    const baths = bedsBaths[1] ? bedsBaths[1].trim() : "";
    const area = info[1].split(" ")[0] + " sqft";
    var price = null;
    if (item.price && item.price.includes("$")) {
      price = "$" + item.price.split("$")[1];
    }
    const image = item.picture ?? "";
    const apartment_link =
      "https://www.essexapartmenthomes.com/apartments/san-francisco/mb360/floor-plans-and-pricing";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}
