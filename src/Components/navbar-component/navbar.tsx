"use client"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useCart } from "@/app/context/CartContext"
import Link from "next/link"
import { ShoppingBag, Heart } from "lucide-react"
import { Badge } from "../ui/badge"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/Components/ui/navigation-menu"
import { useFavorites } from "@/app/context/FavoritesContext"

export default function Navbar() {
  const { favorites } = useFavorites()
  const session = useSession()
  const { cartDetails } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <NavigationMenu className="p-5 flex justify-between items-center mx-auto max-w-7xl">
      <NavigationMenuList className="text-3xl font-bold tracking-tighter">
        <NavigationMenuItem>
          <Link href="/" className="relative w-[120px] h-[50px] block">
            <Image
              src="/Eiser-ecommerce/imgi_1_logo.png"
              alt="Eiser Logo"
              fill
              className="object-contain cursor-pointer"
            />
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className="gap-5 uppercase text-[13px] font-sans">
        <NavigationMenuItem className="hover:text-[#71CD14] transition-colors">
          <Link href="/">Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:text-[#71CD14] transition-colors">
          <Link href="/products">Products</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:text-[#71CD14] transition-colors">
          <Link href="/categories">Categories</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:text-[#71CD14] transition-colors">
          <Link href="/brands">Brands</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:text-[#71CD14] transition-colors">
          <Link href="/cart">Cart</Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className="gap-3 items-center">
        <NavigationMenuItem>
          <Link href="/cart">
            <button className="relative">
              {(cartDetails?.numOfCartItems ?? 0) > 0 && (
                <Badge className="absolute top-[-10px] right-[15px] bg-red-900 cursor-pointer">
                  {cartDetails?.numOfCartItems}
                </Badge>
              )}
              <ShoppingBag className="cursor-pointer hover:text-[#71CD14] transition-colors" />
            </button>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/favorites">
            <button className="relative">
              {favorites.length > 0 && (
                <Badge className="absolute top-[-10px] right-[15px] bg-blue-900">
                  {favorites.length}
                </Badge>
              )}
              <Heart className="cursor-pointer hover:text-[#71CD14] transition-colors" />
            </button>
          </Link>
        </NavigationMenuItem>

        {session.data ? (
          <NavigationMenuItem>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="hover:text-[#71CD14] transition-colors"
            >
              Logout
            </button>
          </NavigationMenuItem>
        ) : (
          <>
            <NavigationMenuItem>
              <Link
                href="/login"
                className="hover:text-[#71CD14] transition-colors"
              >
                Login
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/register"
                className="hover:text-[#71CD14] transition-colors"
              >
                Register
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
