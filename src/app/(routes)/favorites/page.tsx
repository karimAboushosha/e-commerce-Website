"use client";
import { useFavorites } from "@/app/context/FavoritesContext";
import ProductCard from "@/Components/productsCard-component/ProductCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          No favorites yet 💔
        </h2>
        <p className="text-gray-500 mt-2">
          Start exploring products and add them to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {favorites.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
