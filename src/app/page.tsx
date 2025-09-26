import CategorySliderComponent from "@/Components/slider-component/CategorySliderComponent";
import MainSlider from "@/Components/slider-component/mainSlider";
import Image from "next/image";
import getCategories from "./actions/categories.action";
import getProducts from "./actions/products.action";
import ProductsGrid from "@/Components/products-component/productsGrid";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export default async function Home() {

      const session = await getServerSession(options);
      console.log("sessions",session);
      // if(!session){
      //   return <p>you need to login</p>
      // }

      const response = await getCategories();

      const {data} = await getProducts();
      console.log(data);
  return (
    <>
    <div>
    <MainSlider/>
      <div className="px-15">
    <div> <CategorySliderComponent category ={response?.data} /></div>
    <div> <ProductsGrid products ={data} /></div>
      </div>
    </div>
    </>
  );
}

