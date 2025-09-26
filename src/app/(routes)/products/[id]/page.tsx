import { getProductsDetails } from '@/app/actions/products.action';
import ProductsDetailsComp from '@/Components/products-component/productsDetails';
import React from 'react'

export default async function ProductDetails({params}:{params:{id:string}}) {
    const {id} = await params;
    const {data: ProductDetails} = await getProductsDetails(id) as any;
    console.log(ProductDetails, "Details");
  return (
    <div>
      <ProductsDetailsComp productDetails={ProductDetails}/>
    </div>
  )
}
