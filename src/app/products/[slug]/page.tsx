import Header from "@/components/ui/header";
import { getAllProductSlugs, getProductBySlug } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value);

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 shadow-inner">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                Product
              </p>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                {product.title}
              </h1>
              <p className="text-base leading-relaxed text-slate-600">
                {product.description}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">가격</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrency(product.price)}
              </p>
            </div>

            <dl className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-slate-500">판매자</dt>
                <dd className="text-base font-medium text-slate-900">
                  {product.seller}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500">재고</dt>
                <dd className="text-base font-medium text-slate-900">
                  {product.stock.toLocaleString("ko-KR")}개 남음
                </dd>
              </div>
            </dl>

            <button className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700">
              구매하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
