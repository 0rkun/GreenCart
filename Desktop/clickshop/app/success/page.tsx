"use client";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

const SuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-green-600">
        Payment Successfully!
      </h1>
      <p className="text-xl font-semibold mt-5">Thank you for your shopping.</p>

      <Link
        className="mt-5 text-3xl flex items-center justify-center gap-4 text-blue-400 transform transition-transform duration-300 ease-in-out hover:translate-x-2 "
        href="/products"
      >
        Continue Shopping
        <FaArrowAltCircleRight className=" mt-1 text-2xl" />
      </Link>
    </div>
  );
};

export default SuccessPage;
