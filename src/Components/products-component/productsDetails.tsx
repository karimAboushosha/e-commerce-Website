"use client";

import { ProductDetails } from "@/app/types/productDetails";
import React from "react";
import { StarRating } from "react-flexible-star-rating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";
import { addProductToCart } from "@/app/actions/Cartaction";

export default function ProductsDetailsComp({
  productDetails,
}: {
  productDetails: ProductDetails;
}) {
  const { getCardDetails } = useCart();

  async function handleAddToCart(productId: string) {
    const response = await addProductToCart(productId);
    toast.success(response?.message || "Added to cart");
    await getCardDetails();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="rounded-lg overflow-hidden"
        >
          {productDetails.images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src={src}
                  fill
                  alt={productDetails.title}
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 50vw"
                  priority
                  loading="eager"
                  className="object-contain bg-white rounded-lg"
                  quality={100}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {productDetails.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {productDetails.description}
          </p>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">{productDetails.category.name}</p>
              <p className="text-2xl font-semibold text-green-700">
                {productDetails.price} EGP
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StarRating
                initialRating={Math.floor(productDetails.ratingsAverage)}
                dimension={20}
              />
              <span className="text-gray-700 text-sm">
                {productDetails.ratingsAverage.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <button
          className="bg-green-700 text-white text-lg font-medium rounded-lg py-3 px-6 hover:bg-green-800 transition-all"
          onClick={() => handleAddToCart(productDetails._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
