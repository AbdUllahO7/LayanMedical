'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from 'nextjs-toploader';
import { Provider } from "react-redux";
import store from "../../store";
import QueryProvider from "../../store/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
      <Provider store={store}>
                <Toaster/>
                <NextTopLoader color="text-primary" showSpinner={false} />

              <NavbarDemo />
              <QueryProvider>{children}</QueryProvider>
              <Footer/>
      </Provider>
      </body>
    </html>
  );
}
