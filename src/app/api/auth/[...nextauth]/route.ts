import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import { DefaultSession, DefaultUser } from "next-auth";
// import { JWT as DefaultJWT } from "next-auth/jwt";



declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    token?: string;
    user?: DefaultUser & {
      id?: string;
      email?: string;
    };
  }

  interface User extends DefaultUser {
    token?: string; // backend token
    
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}



export const options :NextAuthOptions = {

    providers: [
  CredentialsProvider({
    name: 'Credentials',

    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: 'POST',
        body: JSON.stringify({
            email:credentials?.email,
            password:credentials?.password
        }),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {

        // return user;

        return {
      id: user.user._id,
      email: user.user.email,
      name: user.user.name,
      token: user.token,  // backend token
    };
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
],

session :{
    strategy:"jwt"
},
pages:{
    signIn: '/login',
},

// callbacks:{
//   async session({ session, token, user }) {
//     return {...session, ...token, ...user}
//   },
//   async jwt({ token, user }) {
//     return {...token, ...user}
// }
// },


callbacks: {
  async jwt({ token, user }) {
    if (user?.token) {
      token.accessToken = user.token;  // store backend token
    }
    return token;
  },
  async session({ session, token }) {
    session.token = token.accessToken; // expose it to client
    return session;
  },
},


// secret:process.env.AUTH_SECRET

secret: process.env.NEXTAUTH_SECRET


}

const handler = NextAuth(options);

export {handler as GET , handler as POST}

