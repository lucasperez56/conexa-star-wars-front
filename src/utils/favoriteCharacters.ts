export const addFavorite = (characterId: number): void => {
    let favorites = getFavorites();
    if (!favorites.includes(characterId)) {
      favorites.push(characterId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  
  export const removeFavorite = (characterId: number): void => {
    const favorites = getFavorites().filter(id => id !== characterId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  export const getFavorites = (): number[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
  
  export const isFavorite = (characterId: number): boolean => {
    return getFavorites().includes(characterId);
  }