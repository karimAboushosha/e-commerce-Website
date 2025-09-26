"use client"

import { useEffect, useState } from "react"
import getBrands from "@/app/actions/brands.action"
import BrandCard from "./BrandCard"

interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function BrandsList() {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    async function fetchBrands() {
      const response = await getBrands()
      if (response?.data) {
        setBrands(response.data)
      }
    }
    fetchBrands()
  }, [])

  return (
    <>
          <div className="text-center mb-10 mt-10 bg-[#5aaf06] p-10  text-white">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          All <span className=" text-white">Brands</span>
        </h1>
        <p className=" text-white text-lg">
          Discover the top brands you can shop from
        </p>
      </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
      {brands.map((brand) => (
        <BrandCard key={brand._id} brand={brand} />
      ))}
    </div>
    </>
  )
}
