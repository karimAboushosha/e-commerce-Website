import { createContext, useContext, useEffect, useState } from "react";
import { getUserCart } from "../actions/Cartaction";
import { CartData } from "../types/cart.model";

interface CartContextType{
    cartDetails: CartData | null
    getCardDetails: ()=> Promise<void>
    setcartDetails: (cart: CartData | null) => void
}


const CartContext = createContext<CartContextType>({
    cartDetails: null,
    getCardDetails: async()=>{},
    setcartDetails: ()=>{}
});

export default function CartContextProvider({children}:{children: React.ReactNode}){

    const [cartDetails, setcartDetails] = useState<CartData | null>(null);

    async function getCardDetails(){
          
        const response = await getUserCart();
        
        // console.log(response?.data,"cart")

        console.log(response, "cart");

        setcartDetails(response?.data);
        
    }

    useEffect(()=>{

        getCardDetails()    

    },[])


return(     
    <CartContext.Provider value={{cartDetails, setcartDetails ,getCardDetails}}>{children}</CartContext.Provider>
    )
}

export function useCart(){  
    
    const myContext = useContext(CartContext);
    return myContext
}