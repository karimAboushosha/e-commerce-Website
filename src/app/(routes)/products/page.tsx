import getProducts from '@/app/actions/products.action';
import ProductsGrid from '@/Components/products-component/productsGrid';
import React from 'react'

// export default async function Products() {

//   const {data} = await getProducts() as any;
//   return (
//     <div>
//       <div> <ProductsGrid products ={data} /></div>
//     </div>
//   )
// }

export default async function Products() {
  const { data } = await getProducts() as any;

  return (
    <div>
      <div>
        <ProductsGrid />
      </div>
    </div>
  );
}