"use client"
import { Category } from '@/app/types/category.model'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

export default function CategorySliderComponent({ category }: { category: Category[] }) {
  return (
    <div className="mx-auto px-4 py-10 max-w-7xl">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-6 tracking-tight">
        <span className="text-gray-900">Shop by</span>{" "}
        <span className="text-[#71CD14]">Categories</span>
        <div className="w-24 h-1 bg-[#71CD14] mx-auto mt-3 rounded-full" />
      </h2>

      {/* Swiper */}
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        modules={[Navigation, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 18 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="mySwiper"
      >
        {category.map((cat) => (
          <SwiperSlide key={cat._id}>
            <Link href={`/categories/${cat._id}`} className="block">
              <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                <div className="relative w-full h-[260px] md:h-[300px]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-4 pb-6 text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {cat.name}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination styling below */}
      <style jsx global>{`
        .mySwiper .swiper-pagination {
          position: static !important;
          margin-top: 1rem;
          display: flex;
          justify-content: center;
        }
        .mySwiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 0.9;
          margin: 0 6px !important;
        }
        .mySwiper .swiper-pagination-bullet-active {
          background: #71cd14;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}
