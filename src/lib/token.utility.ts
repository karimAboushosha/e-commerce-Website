import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken(){


    const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
    const decreptoken = await decode({token: encodedToken, secret :process.env.AUTH_SECRET!})
    const token = decreptoken?.token;

    return token
}