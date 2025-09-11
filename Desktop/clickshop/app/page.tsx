import { Carousel } from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <section className="rounded bg-neutral-200/60 py-8 sm:py-12">
        <div className="grid grid-cols-1 mx-auto items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4 ">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to my ecommerce
            </h2>
            <p className="text-gray-600 ">
              Discover the latest products at the best prices
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                className="inline-flex items-center justify-center rounded-full px-6 py-3 "
                href="/products"
              >
                Browse All Producst
              </Link>
            </Button>
          </div>

          <Image
            alt="banner image"
            src={products.data[0].images[0]}
            width={450}
            height={450}
            priority
          />
        </div>
      </section>

      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
