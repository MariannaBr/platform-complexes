// DOGPATCH

export function getApartmentsChase(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = item.beds ?? "";
    var baths = item.baths ?? "";
    var area = item.area ?? "";
    var price = null;
    var image = "";
    var apartment_link = "";

    if (item.price && item.price.includes("$")) {
      const index = item.price.indexOf("$");
      price = item.price.slice(index);
    }
    if (item.picture) {
      image = item.picture;
    }
    if (item.link) {
      apartment_link = "https://www.chasesf.com" + item.link;
    }
    return { bedrooms, baths, area, price, image, apartment_link };
  });
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
    const image = info.floorplanImageURL[1] ?? info.FloorplanImageURL[1];
    const areaInfo = info.sqft[1] ?? info.SQFT[1];
    const area = areaInfo + " Sq. Ft.";
    const bathsInfo = info.baths[1] ?? info.Baths[1];
    const bathsInfoString = bathsInfo.toString();
    const baths =
      bathsInfoString === "1"
        ? bathsInfoString + " Bath"
        : bathsInfoString + " Baths";
    const priceInfo = info.minimumRent[1] ?? info.MinimumRent[1];
    const formattedNumber = Number(priceInfo).toLocaleString();
    const price = "$" + formattedNumber;
    const apartment_link = info.applyOnlineURL[1] ?? info.ApplyOnlineURL[1];
    const bedsInfo = info.beds[1] ?? info.Beds[1];
    const bedsInfoString = bedsInfo.toString();
    let bedrooms = "Studio";
    if (bedsInfoString === "1") bedrooms = bedsInfoString + " Bed";
    if (
      bedsInfoString === "2" ||
      bedsInfoString === "3" ||
      bedsInfoString === "4"
    )
      bedrooms = bedsInfoString + " Beds";
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

// Rincon Hill

export function getApartments333Fremont(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const info = item.info ? item.info[1] : "";
    const bedBaths = info.split("/");
    const bedsInfo = bedBaths[0].trim().split(" ")[0].trim();
    const bathInfo = bedBaths[1].trim().split(" ")[0].trim();
    const bedrooms = bedsInfo === "1" ? bedsInfo + " Bed" : bedsInfo + " Beds";
    const baths = bathInfo === "1" ? bathInfo + " Bath" : bathInfo + " Baths";
    const image = item.picture ?? "";
    const areaInfo = item.area ? item.area.split(" ").pop() : "";
    const area = areaInfo + " Sq. Ft.";
    const price = item.price ? item.price.split(" ")[1] : "";
    const apartment_link = item.link ?? "";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartments340Fremont(apartmentsData) {
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
      "https://www.equityapartments.com/san-francisco/rincon-hill/340-fremont-apartments##unit-availability-tile";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsSomaSquare(apartmentsData) {
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
      "https://www.equityapartments.com/san-francisco-bay/soma/soma-square-apartments##unit-availability-tile";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartments399Fremont(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.beds ?? "";
    const baths = item.baths ?? "";
    const area = item.area ?? "";
    const price = item.price ?? null;
    const image = "https://www.udr.com" + item.picture;
    const apartment_link =
      "https://www.udr.com/san-francisco-bay-area-apartments/san-francisco/399-fremont/apartments-pricing/";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsArcLight(apartmentsData) {
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

export function getApartmentsSBMarina(apartmentsData) {
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
        ? "https://www.sbma-sf.com" + item.link
        : "";

      return { bedrooms, baths, area, price, image, apartment_link };
    });
  return apartments;
}

export function getApartmentsCentralApartments(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.beds ?? "";
    const baths = item.baths ?? "";
    const area = "";
    var price = item.price ?? null;
    const image = "";
    var apartment_link =
      "https://5743rdstcentralapartments.com/available-units/";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsBaysideVillage(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    var bedrooms = "";
    if (item.beds) {
      const beds = item.beds;
      bedrooms = beds + " Beds";
      if (beds === "0") {
        bedrooms = "Studio";
      }
      if (beds === "1") {
        bedrooms = beds + " Bed";
      }
    }
    const baths = item.baths ?? "";
    const area = item.area ? item.area + " Sq. Ft." : "";
    var price = null;
    const priceInfo = item.price ? item.price.split(".")[0] : null;
    if (priceInfo) {
      const rentArray = Array.from(priceInfo);
      if (rentArray[0]) {
        price = "$" + rentArray[0] + "," + priceInfo.slice(1);
      }
    }
    const image = item.picture ?? "";
    var apartment_link = item.link
      ? "https://rent.brookfieldproperties.com/" + item.link
      : "";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsJasper(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedBathInfo = item.bedsBaths ? item.bedsBaths.split("/") : null;
    const bedInfo = bedBathInfo ? bedBathInfo[1].split(" ")[1].trim() : null;
    const bathInfo = bedBathInfo ? bedBathInfo[2].trim() : null;
    var bedrooms = "";
    if (bedInfo) {
      if (bedInfo === "Studio") {
        bedrooms = bedInfo;
      } else if (bedInfo === "1") {
        bedrooms = bedInfo + " Bed";
      } else {
        bedrooms = bedInfo + " Beds";
      }
    }
    var baths = "";
    if (bathInfo) {
      if (bathInfo === "1") {
        baths = bathInfo + " Bath";
      } else {
        baths = bathInfo + " Baths";
      }
    }
    const areaInfo = item.area ? item.area.split(" ") : null;
    const area = areaInfo ? areaInfo[0] + " Sq. Ft." : "";
    var price = item.price ? item.price.split(" ")[2] : null;
    const image = item.picture ?? "";
    const linkInfo = item.link ?? null;
    const link = linkInfo ? linkInfo.split("&") : null;
    const propertyId = link ? link[0].split("?")[1] : "";
    const floorplanId = link ? link[3].split("';")[0].trim() : "";
    const apartment_link = link
      ? "https://rentjasper.securecafe.com/onlineleasing/jasper-1/availableunits.aspx?" +
        propertyId +
        "&" +
        floorplanId
      : "https://rentjasper.securecafe.com/onlineleasing/jasper-1/floorplans.aspx";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsModera(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const info = item.info ? item.info[1] : "";
    const bedBaths = info.split("/");
    const bedsInfo = bedBaths[0].trim().split(" ")[0].trim();
    const bathInfo = bedBaths[1].trim().split(" ")[0].trim();
    var bedrooms = "";
    if (bedsInfo) {
      if (bedsInfo === "Studio") {
        bedrooms = bedsInfo;
      } else if (bedsInfo === "1") {
        bedrooms = bedsInfo + " Bed";
      } else {
        bedrooms = bedsInfo + " Beds";
      }
    }
    const baths = bathInfo === "1" ? bathInfo + " Bath" : bathInfo + " Baths";
    const image = item.picture ?? "";
    const areaInfo = item.area ? item.area.split(" ")[2] : "";
    const area = areaInfo + " Sq. Ft.";
    const price = item.price ? item.price.split(" ").pop().split("/")[0] : null;
    const apartment_link = item.link ?? "";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsRinconGreen(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedsInfo = item.beds ?? null;
    var bedrooms = "";
    if (bedsInfo) {
      if (bedsInfo.includes("Studio")) {
        bedrooms = "Studio";
      } else {
        bedrooms = bedsInfo;
      }
    }
    const baths = item.baths ?? null;
    const area = item.area ?? null;
    const price = item.price.includes("$")
      ? item.price.split("-")[0].trim()
      : null;
    const image = item.picture ?? "";
    const apartment_link = "https://www.rincongreen.com/Floor-plans.aspx";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartments500Folsom(apartmentsData) {
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
      "https://www.essexapartmenthomes.com/apartments/san-francisco/500-folsom/floor-plans-and-pricing";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsAvery450(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedsBaths = item.bedsBaths ? item.bedsBaths.split(" ") : null;
    const bedInfo = bedsBaths ? bedsBaths[0][0] : null;
    var bedrooms = "";
    if (bedInfo) {
      if (bedInfo === "0") {
        bedrooms = "Studio";
      } else if (bedInfo === "1") {
        bedrooms = bedInfo + " Bed";
      } else {
        bedrooms = bedInfo + " Beds";
      }
    }
    const bathInfo = bedsBaths ? bedsBaths[1][0] : null;
    const baths = bathInfo === "1" ? bathInfo + " Bath" : bathInfo + " Baths";
    const area = item.area ?? "";
    const priceInfo = item.price ?? null;
    var price = null;
    if (priceInfo && priceInfo != "0") {
      const rentArray = Array.from(priceInfo);
      if (rentArray[0]) {
        price = "$" + rentArray[0] + "," + priceInfo.slice(1);
      }
    }
    const image = item.picture
      ? "https://www.relatedrentals.com/" + item.picture
      : "";
    const apartment_link = item.link
      ? "https://www.relatedrentals.com/" + item.link
      : "";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsParamount(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedsBaths = item.bedsBaths ? item.bedsBaths.split(" ") : null;
    const bedInfo = bedsBaths ? bedsBaths[0][0] : null;
    var bedrooms = "";
    if (bedInfo) {
      if (bedInfo === "0") {
        bedrooms = "Studio";
      } else if (bedInfo === "1") {
        bedrooms = bedInfo + " Bed";
      } else {
        bedrooms = bedInfo + " Beds";
      }
    }
    const bathInfo = bedsBaths ? bedsBaths[1][0] : null;
    const baths = bathInfo === "1" ? bathInfo + " Bath" : bathInfo + " Baths";
    const area = item.area ?? "";
    const priceInfo = item.price ?? null;
    var price = null;
    if (priceInfo && priceInfo != "0") {
      const rentArray = Array.from(priceInfo);
      if (rentArray[0]) {
        price = "$" + rentArray[0] + "," + priceInfo.slice(1);
      }
    }
    const image = item.picture
      ? "https://www.relatedrentals.com/" + item.picture
      : "";
    const apartment_link = item.link
      ? "https://www.relatedrentals.com/" + item.link
      : "";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsSolaire(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.beds ?? "";
    const baths = item.baths ?? "";
    const area = item.area ?? "";
    var price = null;
    const priceInfo = item.price ?? null;
    if (priceInfo && priceInfo.includes("$")) {
      price = "$" + priceInfo.split("$")[1];
    }
    const image = item.picture ?? "";
    const apartment_link = item.link
      ? "https://solairesf.com" + item.link
      : "https://solairesf.com/floorplans/";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsTheTowersAtRincon(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedBaths = item.bedsBaths ?? "";
    const bedBathsInfo = bedBaths.includes("/")
      ? bedBaths.split("/")
      : bedBaths;
    const bedrooms = Array.isArray(bedBathsInfo)
      ? bedBathsInfo[0].trim()
      : bedBathsInfo;
    const baths = Array.isArray(bedBathsInfo)
      ? bedBathsInfo[1].trim()
      : "1.0 BA";
    const area = item.area ?? "";
    var price = null;
    const priceInfo = item.price ?? null;
    if (priceInfo && priceInfo.includes("$")) {
      price = "$" + priceInfo.split("$")[1];
    }
    const image = item.picture ?? "";
    const apartment_link = item.link
      ? "https://www.thetowersatrincon.com" + item.link
      : "https://www.thetowersatrincon.com/floorplans";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsSomaAt788(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.beds ?? "";
    const baths = item.baths ?? "";
    const area = item.area ?? "";
    var price = null;
    const priceInfo = item.price ?? null;
    if (priceInfo && priceInfo.includes("$")) {
      price = "$" + priceInfo.split("$")[1];
    }
    const image = item.picture ?? "";
    const apartment_link = item.link
      ? "https://somaat788.com" + item.link
      : "https://somaat788.com/floorplans/";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsRitchStreet(apartmentsData) {
  if (!apartmentsData.apartments) return null;
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.beds ?? "";
    const baths = item.baths ? item.baths + " BA" : "";
    const areainfo = item.area ?? "";
    const area = areainfo.includes("-")
      ? areainfo.split("-")[0].trim() + " Sq. Ft."
      : areainfo;
    var price = null;
    const priceInfo = item.price ?? null;
    if (priceInfo && priceInfo.includes("$")) {
      price = "$" + priceInfo.split("$")[1].trim();
    }
    const image = item.picture ?? "";
    const apartment_link = item.link
      ? "https://www.ritchstreet.com" + item.link
      : "https://www.ritchstreet.com/floorplans/";

    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}
