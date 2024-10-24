import { ApartmentProps } from "../components/Apartment";
import {
  domainDogpatch,
  domainMissionBay,
  locationDogpatch,
  locationMissionBay,
} from "./defaults";

export function getLocalStorageFavorites() {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favorites");
    const data = JSON.parse(storedFavorites);
    return data || [];
  }
}

export function getIsFavorite(id: string): boolean {
  const storedFavorites = getLocalStorageFavorites();
  if (storedFavorites) {
    return storedFavorites.includes(id);
  }
  return false;
}

export function getSortedApartments(
  ar: ApartmentProps[],
  property: string
): ApartmentProps[] {
  var sortedArray = [];
  if (ar.length > 0) {
    const withValue = ar.filter((apartment) => {
      if (apartment[property]) {
        return apartment;
      }
    });
    sortedArray = withValue.sort((a, b) =>
      a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
    );
  }
  return sortedArray;
}

export function parseCurrency(value) {
  return parseFloat(value.replace(/[\$,]/g, ""));
}

export function getLocation(host: string): string {
  let location = "";

  // Check the domain and set location accordingly
  if (host === domainDogpatch) {
    location = locationDogpatch;
  } else if (host === domainMissionBay) {
    location = locationMissionBay;
  } else if (host === "localhost:3000") {
    location = locationMissionBay;
  }
  return location;
}
