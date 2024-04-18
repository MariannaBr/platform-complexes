import { ApartmentProps } from "../components/Apartment";

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
): ApartmentProps[] | null {
  var sortedArray = null;
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
