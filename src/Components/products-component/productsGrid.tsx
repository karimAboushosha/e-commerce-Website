"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../productsCard-component/ProductCard";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import { Product } from "@/app/types/product.model";

interface ProductsGridProps {
  products: Product[];  
}


export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchProducts(pageNum: number) {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}&limit=12`
    );
    setProducts(response.data.data);
    setTotalPages(response.data.metadata.numberOfPages);
  }

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-10">
        <span className="text-gray-900">Our</span>{" "}
        <span className="text-[#71CD14]">Products</span>
        <div className="w-24 h-1 bg-[#71CD14] mx-auto mt-3 rounded-full"></div>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-[#71CD14] text-white"
        >
          Previous
        </Button>
        <span className="self-center">
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-[#71CD14] text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
