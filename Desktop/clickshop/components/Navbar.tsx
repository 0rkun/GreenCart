"use client";

import Link from "next/link";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handle = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handle);

    return () => window.removeEventListener("resize", handle);
  }, []);

  return (
    <nav className="sticky top-0 z-50 shadow bg-white/70 backdrop-blur-md">
      <div className="flex items-center justify-evenly p-4 text-xl">
        <Link href="/" className=" text-2xl hover:text-blue-600">
          ClickShop
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4  ">
          <Link href="/checkout" className="relative flex items-center">
            <ShoppingCartIcon className="h-7 w-7 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full  ">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden hover:cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav>
          <ul className="flex flex-col items-center mb-1 space-y-4 text-lg ">
            <li className="hover:text-blue-600">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link href="/products">Products</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link href="/checkout">Checkout</Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
