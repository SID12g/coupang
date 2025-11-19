import Header from "@/components/ui/header";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
              추천 상품
            </p>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              지금 가장 인기 있는 상품을 만나보세요
            </h2>
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
            더 많은 상품 보기
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  priority={index <= 3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold text-slate-900">
                  {product.title}
                </p>
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
