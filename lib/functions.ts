import { ApartmentProps } from "../components/Apartment";
import {
  dogpatchData,
  missionBayData,
  rinconHillData,
  LocationData,
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

export function getLocationData(host: string): LocationData {
  if (host === dogpatchData.domain) return dogpatchData;
  if (host === missionBayData.domain) return missionBayData;
  if (host === "localhost:3000") return rinconHillData;
}

interface Data {
  linkTitle: string;
  link: string;
}

export function getLinkingData(title: string): Data {
  var linkTitle = dogpatchData.title;
  var link = dogpatchData.linkHome;

  if (title === dogpatchData.title) {
    linkTitle = missionBayData.title;
    link = missionBayData.linkHome;
  }

  const data = {
    linkTitle: linkTitle,
    link: link,
  };
  return data;
}
