export function getApartmentsChase(apartmentsData) {
  // needs to be added when complex has some apartments on web
  const apartments = [];
  return apartments;
}

export function getApartmentsAvalon(apartmentsData) {
  if (!apartmentsData.apartments) return [];
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
  if (!apartmentsData.apartments) return [];
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
      area = item.area + " Sq. Ft.";
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
  if (!apartmentsData.apartments) return [];
  const apartments = apartmentsData.apartments
    .filter((item) => {
      if (item.info && item.info.length === 3) {
        return item;
      }
    })
    .map((item) => {
      var bedrooms = "";
      var baths = "";
      var area = "";
      var price = null;
      var image = "";
      var apartment_link = "";
      if (item.info) {
        if (item.info[0]) {
          bedrooms = item.info[0];
        }
        if (item.info[1]) {
          baths = item.info[1];
        }
        if (item.info[2]) {
          area = item.info[2];
        }
      }
      if (item.price && item.price.includes("$")) {
        const index = item.price.indexOf("$");
        price = item.price.slice(index);
      }
      if (item.picture) {
        image = item.picture;
      }
      if (item.link) {
        apartment_link = "https://www.live777tenn.com" + item.link;
      }
      return { bedrooms, baths, area, price, image, apartment_link };
    });
  return apartments;
}

export function getApartmentsPotrero(apartmentsData) {
  const dataDecoded = JSON.parse(apartmentsData.apartments);
  const apartments = dataDecoded.map((item) => {
    const beds = item.Beds;
    var bedrooms = beds + " Beds";
    if (beds === "0") {
      bedrooms = "Studio";
    }
    if (beds === "1") {
      bedrooms = beds + " Bed";
    }

    const bath = item.Baths;
    const bathArray = Array.from(bath);
    var bathCleaned = bathArray[0];
    if (bathArray[2] !== "0") {
      bathCleaned = bath.slice(0, 3);
    }
    var baths = bathCleaned + " Baths";
    if (bathCleaned === "1") {
      baths = bathCleaned + " Bath";
    }

    const area = item.MinimumSQFT + " Sq. Ft.";
    var price = null;
    const rentArray = Array.from(item.MinimumRent);
    if (item.MinimumRent !== "-1") {
      price = "$" + rentArray[0] + "," + item.MinimumRent.slice(1);
    }
    var image = item.FloorplanImageURL;
    var apartment_link = item.AvailabilityURL;
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsMartin(apartmentsData) {
  const apartments = apartmentsData.apartments
    .filter((item) => {
      if (item.info.length === 3) {
        return item;
      }
    })
    .map((item) => {
      const bedrooms = item.info[0];
      const baths = item.info[1];
      const area = item.info[2];
      var price = null;
      if (item.price.includes("$")) {
        const index = item.price.indexOf("$");
        price = item.price.slice(index);
      }
      const picture = item.picture;
      var apartment_link = "https://www.themartinsf.com/" + item.link;
      return { bedrooms, baths, area, price, picture, apartment_link };
    });
  return apartments;
}

export function getApartmentsGantry(apartmentsData) {
  const apartments = apartmentsData.apartments.map((item) => {
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
  return apartments;
}

export function getApartmentsOAM(apartmentsData) {
  const apartments = apartmentsData.apartments.map((item) => {
    const bedrooms = item.info[0];
    const baths = item.info[1];
    const area = item.info[2];
    var price = null;
    if (item.link.length === 0 && item.price.includes("$")) {
      const index = item.price.indexOf("$");
      price = item.price.slice(index);
    }
    var image = null;
    const regex = /url\("([^"]+)"\)/;
    const match = item.picture.match(regex);
    if (match && match[1]) {
      image = match[1];
    }
    var apartment_link =
      "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans";
    return { bedrooms, baths, area, price, image, apartment_link };
  });
  return apartments;
}

export function getApartmentsWindsor(apartmentsData) {
  const apartments = apartmentsData.apartments
    .filter((item) => {
      if (item.info.length === 3) {
        return item;
      }
    })
    .map((item) => {
      const titel = item.title.toLowerCase();
      const bedrooms = item.info[0];
      const baths = item.info[1];
      const area = item.info[2];
      var price = null;
      if (item.price.includes("$")) {
        const index = item.price.indexOf("$");
        price = item.price.slice(index);
      }
      const picture = item.picture;
      var apartment_link =
        "https://www.windsoratdogpatch.com/floorplans/" + titel;
      return { bedrooms, baths, area, price, picture, apartment_link };
    });
  return apartments;
}
