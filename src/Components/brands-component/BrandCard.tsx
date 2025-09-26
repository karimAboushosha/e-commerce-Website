"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import Image from "next/image"

interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      
      <CardHeader>
        <CardTitle className="text-lg font-semibold group-hover:text-primary">
          {brand.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[150px] w-full flex items-center justify-center">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardContent>
    </Card>
  )
}
