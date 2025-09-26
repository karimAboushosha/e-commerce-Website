"use client"
import React, { useState } from 'react'
import { Input } from "@/Components/ui/input"
import { Button } from '@/Components/ui/button'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import { getCashPayment, getOnlinePayment } from '@/app/actions/payment.action'
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"



export default function CheckoutPage() {
    const [errorMessage, seterrorMessage] = useState(null);
    const router = useRouter();
    const {cartDetails, setcartDetails } = useCart();
    const cartId = cartDetails?.cartId;
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null)
    console.log(cartDetails, "Card Detailsssssssssssssss");

    interface Inputs {

        details: string,
        phone: number,
        city: string,

    }

const {register, handleSubmit,formState:{errors}} = useForm<Inputs>()

async function onSubmit(values:Inputs){
    console.log(paymentMethod," checkout");
    if(paymentMethod == "cash"){
            try {
        
            const response = await getCashPayment(cartId as string, values as any);
        console.log(response?.data?.status);
        console.log("Payment response:", response);

        if(cartDetails?.status === "success"){

            // setcart to null
            setcartDetails(null)
            // redirect home page 
            router.push("/")
        } 
        else {
            seterrorMessage(response?.message || "Payment failed, please try again.");
}

    } catch (error) {
        console.log(error);
    }      
    } else if (paymentMethod == "online"){
        try {
        
            const response = await getOnlinePayment(cartId as string, values as any);

            // console.log(response?.data, "ttttttttttt");
            // console.log("Online Payment response:", response);
            console.log("Full Online Payment response:", response?.data);

        if(cartDetails?.status === "success"){

            // // setcart to null  
            // setcartDetails(null)
            // // redirect home page 
            // router.push("/")
            window.location.href = response?.data.session.url
        } 
        else {
            seterrorMessage(response?.message || "Payment failed, please try again.");
}

    } catch (error) {
        console.log(error);
    } 
    }


}

  return (
    <div className='mx-auto w-1/2 my-10'>
      <h2 className='font-bold text-3xl tracking-tighter my-5'>Payment</h2>
      {errorMessage && <p className='text-red-800'>{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input type='text' placeholder='write your Details' className='p-5 m-3' 
            {...register("details",{required:"Details is required"})}
            />
            {errors.details && <p className='text-red-800'>{errors.details.message}</p>}
            
            <Input type='tel' placeholder='write your Phone' className='p-5 m-3' 
            {...register("phone",{required:"Phone is required"})}
            />
            {errors.phone && <p className='text-red-800'>{errors.phone.message}</p>}
            <Input type='text' placeholder='write your City' className='p-5 m-3' 
            {...register("city",{required:"City is required"})}
            />
            {errors.city && <p className='text-red-800'>{errors.city.message}</p>} 

           <RadioGroup onValueChange={(val)=>setPaymentMethod(val as "online" | "cash")} className='my-5'>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online Payment</Label>
                </div>
            </RadioGroup>         
                  
            <Button type='submit' className='py-5 cursor-pointer mt-3'>Checkout</Button>         
        </form>
    </div>
  )
}
