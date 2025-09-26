"use client";
import { addProductToCart } from "@/app/actions/Cartaction";
import { useCart } from "@/app/context/CartContext";
import { useFavorites } from "@/app/context/FavoritesContext";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "react-flexible-star-rating";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const { getCardDetails } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  async function handleAddToCart(productId: string) {
    const response = await addProductToCart(productId);
    toast.success(response?.message);
    await getCardDetails();
  }

  return (
    <Card className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image */}
      <div className="relative h-[250px] w-full overflow-hidden">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
          {/* Add to cart */}
          <button
            onClick={() => handleAddToCart(product._id)}
            className="p-2 bg-white rounded-full shadow hover:bg-[#71CD14] hover:text-white transition-colors"
          >
            <ShoppingCart size={18} />
          </button>

          {/* Add/remove favorites */}
          <button
            onClick={() =>
              isFavorite(product._id)
                ? removeFromFavorites(product._id)
                : addToFavorites(product)
            }
            className={`p-2 rounded-full shadow transition-colors ${
              isFavorite(product._id)
                ? "bg-[#71CD14] text-white"
                : "bg-white hover:bg-[#71CD14] hover:text-white"
            }`}
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.title.split(" ").slice(0, 3).join(" ")}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description.split(" ").slice(0, 6).join(" ")}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center px-4 pb-4">
        <div>
          <p className="text-xl font-bold text-gray-900">
            {product.price} <span className="text-sm text-gray-600">EGP</span>
          </p>
          <div className="flex items-center gap-1">
            <StarRating
              initialRating={Math.floor(product.ratingsAverage)}
              dimension={5}
            />
            <span className="text-xs text-gray-500">
              ({product.ratingsAverage})
            </span>
          </div>
        </div>
        <Link
          href={`/products/${product._id}`}
          className="px-4 py-2 bg-[#71CD14] text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
