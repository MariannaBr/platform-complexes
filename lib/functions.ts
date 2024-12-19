import { ApartmentProps } from "../components/Apartment";
import {
  dogpatchData,
  missionBayData,
  rinconHillData,
  SFData,
  LocationData
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
  if (host === rinconHillData.domain) return rinconHillData;
  if (host === SFData.domain) return SFData;
  if (host === "localhost:3000") return SFData;
}

interface Data {
  linkTitle: string;
  link: string;
}

export function getLinkingData(title: string): Data[] {
  const dogpatchLinkingData = {
    linkTitle: dogpatchData.linkTitle,
    link: dogpatchData.linkHome
  };

  const missionBayLinkingData = {
    linkTitle: missionBayData.linkTitle,
    link: missionBayData.linkHome
  };

  const rinconHillLinkingData = {
    linkTitle: rinconHillData.linkTitle,
    link: rinconHillData.linkHome
  };

  // homepage is Mission Bay
  var data: Data[] = [dogpatchLinkingData, rinconHillLinkingData];

  // homepage is Dogpatch
  if (title === dogpatchData.title) {
    data = [missionBayLinkingData, rinconHillLinkingData];
  }

  // homepage is Rincon Hill
  if (title === rinconHillData.title) {
    data = [dogpatchLinkingData, missionBayLinkingData];
  }

  // homepage is SF
  if (title === SFData.title) {
    data = [dogpatchLinkingData, missionBayLinkingData, rinconHillLinkingData];
  }

  return data;
}
