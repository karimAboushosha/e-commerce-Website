import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/route"; // adjust path

export async function getUserToken() {
  const session = await getServerSession(options);
  return session?.token ?? null;
}






// import { cookies } from "next/headers";
// import { decode } from "next-auth/jwt";

// export async function getUserToken() {
// //   const cookieStore = cookies(); 

//   const cookieStore: ReturnType<typeof cookies> = cookies();

//   const encodedToken =
//     cookieStore.get("next-auth.session-token")?.value ||
//     cookieStore.get("__Secure-next-auth.session-token")?.value;

//   if (!encodedToken) return null;

//   const decrypted = await decode({
//     token: encodedToken,    
//     secret: process.env.NEXTAUTH_SECRET!,
//   });

//   return (decrypted as any)?.token ?? null;
// }



// export async function getUserToken(){


//     const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
//     const decreptoken = await decode({token: encodedToken, secret :process.env.AUTH_SECRET!})
//     const token = decreptoken?.token;

//     return token
// }
