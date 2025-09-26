"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import { Badge } from "../ui/badge"
import Image from "next/image"
import { useCart } from "@/app/context/CartContext"
import { removeProduct, updateProduct } from "@/app/actions/Cartaction"
import toast from "react-hot-toast"
import Link from "next/link"

export default function TableCart() {
  const { cartDetails, getCardDetails } = useCart()

  async function removeProductFromCart(productId: string) {
    const response = await removeProduct(productId)
    console.log(response)
    toast.success("Product removed from Cart")
    getCardDetails()
  }

  async function updateProductInCart(productId: string, count: number) {
    if (count < 1) return
    const response = await updateProduct(productId, count)
    console.log(response)
    toast.success("Cart updated")
    getCardDetails()
  }

  return (
    <>
      {cartDetails ? (
        <div className="mx-auto w-full md:w-4/5 lg:w-3/4 bg-white shadow-lg rounded-lg p-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="p-3 text-center font-semibold">
                  Product
                </TableHead>
                <TableHead className="p-3 text-center font-semibold">
                  Price
                </TableHead>
                <TableHead className="p-3 text-center font-semibold">
                  Quantity
                </TableHead>
                <TableHead className="p-3 text-center font-semibold">
                  Subtotal
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartDetails?.data?.products?.map((product) => (
                <TableRow key={product._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium p-3">
                    <div className="flex gap-4 items-center justify-center relative">
                      <div className="relative">
                        <Badge
                          onClick={() =>
                            removeProductFromCart(product.product._id)
                          }
                          className="absolute top-[-10px] left-[-10px] bg-red-600 text-white cursor-pointer hover:bg-red-700"
                        >
                          ✕
                        </Badge>
                        <Image
                          src={product.product.imageCover}
                          width={60}
                          height={60}
                          alt="Image"
                          className="rounded-md shadow-sm"
                        />
                      </div>
                      <p className="text-gray-700 font-medium">
                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="p-3 text-center text-gray-700 font-semibold">
                    {product.price} EGP
                  </TableCell>

                  <TableCell className="p-3 text-center">
                    <div className="flex text-center items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          updateProductInCart(
                            product.product._id,
                            product.count + 1
                          )
                        }
                        className="border border-gray-400 rounded-md px-3 py-1 cursor-pointer hover:bg-[#71CD14] hover:text-white transition-all"
                      >
                        +
                      </button>
                      <p className="font-semibold">{product.count}</p>
                      <button
                        onClick={() =>
                          updateProductInCart(
                            product.product._id,
                            product.count - 1
                          )
                        }
                        className="border border-gray-400 rounded-md px-3 py-1 cursor-pointer hover:bg-[#71CD14] hover:text-white transition-all"
                      >
                        -
                      </button>
                    </div>
                  </TableCell>

                  <TableCell className="p-3 text-center text-gray-700 font-semibold">
                    {product.price * product.count} EGP
                  </TableCell>
                </TableRow>
              ))}

              {/* Total row */}
              <TableRow className="bg-gray-100 font-bold">
                <TableCell className="text-center p-6">
                  Total Price
                </TableCell>
                <TableCell
                  className="text-center p-6"
                  colSpan={2}
                >
                  {cartDetails?.data?.totalCartPrice} EGP
                </TableCell>
                <TableCell className="text-center p-6">
                  <Link href="/checkout">
                    <button className="bg-[#71CD14] px-8 py-3 rounded-md text-white font-semibold hover:bg-transparent hover:text-[#71CD14] hover:border hover:border-[#71CD14] transition-all">
                      Check Out
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border border-[#71CD14] rounded-md text-center mx-auto max-w-lg py-16 mt-10 shadow-md">
          <h2 className="text-2xl font-bold text-gray-700">
            Your cart is empty 🛒
          </h2>
          <p className="text-gray-500 mt-3">
            Browse our products and add items to your cart.
          </p>
          <Link href="/products">
            <button className="mt-6 bg-[#71CD14] px-6 py-3 rounded-md text-white font-semibold hover:bg-transparent hover:text-[#71CD14] hover:border hover:border-[#71CD14] transition-all">
              Go to Products
            </button>
          </Link>
        </div>
      )}
    </>
  )
}
