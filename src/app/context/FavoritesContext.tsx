"use client";

import { createContext, useContext, useState } from "react";
import { Product } from "@/app/types/product.model";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  function addToFavorites(product: Product) {
    setFavorites((prev) =>
      prev.find((p) => p._id === product._id) ? prev : [...prev, product]
    );
  }

  function removeFromFavorites(productId: string) {
    setFavorites((prev) => prev.filter((p) => p._id !== productId));
  }

  function isFavorite(productId: string) {
    return favorites.some((p) => p._id === productId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
