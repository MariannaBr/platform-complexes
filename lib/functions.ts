export function getLocalStorageFavorites() {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favorites");
    const data = JSON.parse(storedFavorites);
    return data || [];
  }
}

export function getIsFavorite(id: string) {
  const storedFavorites = getLocalStorageFavorites();
  if (storedFavorites) {
    return storedFavorites.includes(id);
  }
  return false;
}
