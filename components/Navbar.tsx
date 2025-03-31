"use client";

import Link from "next/link";
import { useState } from "react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky left-0 top-0 bg-white transition all  z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between h-14">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-purple-600 font-bold text-xl" onClick={() => setIsOpen(false)}>
              Ore
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:text-purple-800 focus:outline-none"
            >
              <svg
                className="h-10 w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6 text-lg font-medium ">
            <Link href="/restaurants" className="text-purple-600 hover:text-purple-800">
             Nearby Restaurants
            </Link>
          </div>

          
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isOpen && (
        <div className="lg:hidden absolute z-10 bg-white h-screen w-full">
          <div className="px-8 pt-2 pb-3 space-y-1 sm:px-3 gap-3 flex flex-col">
            <Link
              href="/restaurants"
              className="block text-purple-600 hover:text-purple-800"
              onClick={() => setIsOpen(!isOpen)}
            >
            Nearby Restaurants
            </Link>

           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
