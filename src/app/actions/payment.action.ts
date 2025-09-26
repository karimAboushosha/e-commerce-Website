    "use server"

    import { getUserToken } from "@/lib/token.utility";
    import axios from "axios";

    interface shippingAddressTypes {
        details:string,
        phone:string;
        city:string

    }

    async function getCashPayment(cartId:string, shippingAddress:{shippingAddress:shippingAddressTypes}) {
    try {
        const token = await getUserToken();
        const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress},
        {
            headers:{
                token:token as string
            }
        }
        );

        console.log(response.data, "cash payment");

        return {
        data: response?.data,
        status: response?.status,
        message: response?.data.message,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
        return {
            data: [],
            status: error.response?.status,
            message: error?.response?.data.message || "An error occured",
        };
        }
    }
    }

    async function getOnlinePayment(cartId:string, shippingAddress:{shippingAddress:shippingAddressTypes}) {
    try {
        const token = await getUserToken();
        const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress},
        {
            headers:{
                token:token as string
            }
        }
        );

        console.log(response.data, "Online payment");

        return {
        data: response?.data,
        status: response?.status,
        message: response?.data.message,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
        return {
            data: [],
            status: error.response?.status,
            message: error?.response?.data.message || "An error occured",
        };
        }
    }
    }

    export {getCashPayment, getOnlinePayment}