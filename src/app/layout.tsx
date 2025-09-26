import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/navbar-component/navbar";
import AuthProvider from "./context/AuthProvider";
import { FavoritesProvider } from "./context/FavoritesContext";
import Footer from "@/Components/footer-component/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "This app is created by Karim Aboushosha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
            <Navbar/>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
            <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
