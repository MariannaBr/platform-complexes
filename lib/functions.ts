import { ApartmentProps } from "../components/Apartment";
import { dogpatchData, missionBayData } from "./defaults";

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

export interface LocationData {
  domain: string;
  location: string;
  title: string;
  linkHome: string;
  metaImageHome: string;
  metaLinkFavorites: string;
  metaLinkTable: string;
  metaLinkSignup: string;
  metaTitleHome: string;
  metaDescriptionHome: string;
  metaTitleFavorites: string;
  metaDescriptionFavorites: string;
  metaTitleComparison: string;
  metaDescriptionComparison: string;
  metaTitleSignup: string;
  metaDescriptionSignup: string;
}

export function getLocationData(host: string): LocationData {
  if (host === dogpatchData.domain) return dogpatchData;
  if (host === missionBayData.domain) return missionBayData;
  if (host === "localhost:3000") return missionBayData;
}
