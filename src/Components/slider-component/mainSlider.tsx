"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { EffectFade, Navigation, Pagination } from "swiper/modules"
import { CircleArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link" 

export default function MainSlider() {
  return (
    <div className="w-full relative">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        modules={[EffectFade, Navigation, Pagination]}
        className="mainSwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[600px] md:h-[650px]">
            <Image
              src="/Eiser-ecommerce/imgi_21_banner-bg.jpg"
              fill
              alt="Hero Banner"
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute flex flex-col gap-4 top-1/2 left-[8%] -translate-y-1/2 max-w-lg">
              <p className="text-white uppercase text-sm font-bold tracking-wide">
                Men Collection
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-white drop-shadow-lg">
                <span className="text-[#71CD14]">Show</span> Your Personal{" "}
                <span className="text-[#71CD14]">Style</span>
              </h1>
              <p className="text-white/90 text-base md:text-lg">
                Discover unique designs to express yourself every day.
              </p>
              <Link href="/categories"> 
                <Button className="px-8 w-fit mt-4 bg-[#71CD14] text-white rounded-lg h-12 uppercase font-semibold hover:bg-transparent hover:text-[#71CD14] hover:border hover:border-[#71CD14] transition-all flex items-center gap-2">
                  View Collection <CircleArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[600px] md:h-[650px]">
            <Image
              src="/Eiser-ecommerce/imgi_23_offer-bg.png"
              fill
              alt="Hero Banner 2"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute flex flex-col gap-4 top-1/2 left-[8%] -translate-y-1/2 max-w-lg">
              <p className="text-white uppercase text-sm font-bold tracking-wide">
                Women Collection
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-white drop-shadow-lg">
                <span className="text-[#71CD14]">Elevate</span> Your Everyday{" "}
                <span className="text-[#71CD14]">Look</span>
              </h1>
              <p className="text-white/90 text-base md:text-lg">
                Elegant and bold pieces for a modern lifestyle.
              </p>
              <Link href="/categories"> 
                <Button className="px-8 w-fit mt-4 bg-[#71CD14] text-white rounded-lg h-12 uppercase font-semibold hover:bg-transparent hover:text-[#71CD14] hover:border hover:border-[#71CD14] transition-all flex items-center gap-2">
                  Explore Now <CircleArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <style jsx global>{`
        .mainSwiper .swiper-pagination {
          position: static !important;
          margin-top: 1rem;
          display: flex;
          justify-content: center;
        }
        .mainSwiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 0.8;
          margin: 0 6px !important;
        }
        .mainSwiper .swiper-pagination-bullet-active {
          background: #71cd14;
          transform: scale(1.2);
        }
        .mainSwiper .swiper-button-next,
        .mainSwiper .swiper-button-prev {
          color: #71cd14 !important;
        }
      `}</style>
    </div>
  )
}
