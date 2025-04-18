'use client'

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Ore food",
//   description: "A recipe website",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-300`}
      >
        <QueryClientProvider client={queryClient}>
          <Navbar />
        <div className='bg-[url(/bg.jpg)] bg-cover w-full h-70 md:h-100'>
          <div className='bg-purple-500 h-50 w-full md:h-70 md:w-100 lg:h-70 lg:w-120 flex flex-col relative top-20 lg:top-20 md:left-20 rounded-lg p-6 gap-7'> 
            <h1 className="font-semibold text-2xl lg:text-4xl ">Ready to create that special memory from your kitchen</h1>
            <p className="text-xl">Dive into our encyclopedia of recipes now </p>
          </div>
        </div>
        {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
