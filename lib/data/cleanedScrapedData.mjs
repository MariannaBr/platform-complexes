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
      var apartment_link = item.link
        ? "https://www.themartinsf.com" + item.link
        : "";
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
  const apartments = apartmentsData.apartments
    .filter((item) => {
      if (item.info && item.info.length === 3) {
        return item;
      }
    })
    .map((item) => {
      const title = item.title ? item.title.toLowerCase() : "";
      const bedrooms = item.info[0] ?? "";
      const baths = item.info[1] ?? "";
      const area = item.info[2] ?? "";
      var price = null;
      if (item.price && item.price.includes("$")) {
        const index = item.price.indexOf("$");
        price = item.price.slice(index);
      }
      const image = item.picture ?? "";
      var apartment_link =
        "https://www.windsoratdogpatch.com/floorplans/" + title;
      return { bedrooms, baths, area, price, image, apartment_link };
    });
  return apartments;
}
