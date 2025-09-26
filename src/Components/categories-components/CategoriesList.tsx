"use client"

import { useEffect, useState } from "react"
import getCategories from "@/app/actions/categories.action"
import CategoryCard from "./CategoryCard"

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories()
      if (response?.data) {
        setCategories(response.data)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
    <div className="text-center mb-10 mt-10 bg-[#5aaf06] p-10  text-white">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          All <span className=" text-white">Categories</span>
        </h1>
        <p className=" text-white text-lg">
          Shop from a big variety of products' categories
        </p>
      </div>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
    </>
  )
}
