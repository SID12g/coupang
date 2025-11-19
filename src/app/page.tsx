import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.png";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Bell, ChevronDown, Search, ShoppingCart, User } from "lucide-react";

export default function Home() {
  const navItems = ["오늘의 특가", "로켓프레시", "로켓배송", "쿠팡플레이"];
  const featuredProducts = [
    {
      id: 1,
      title: "프리미엄 무선 이어폰",
      price: 129000,
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
      href: "/products/1",
    },
    {
      id: 2,
      title: "데일리 커피머신",
      price: 89000,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
      href: "/products/2",
    },
    {
      id: 3,
      title: "미니 공기청정기",
      price: 64000,
      image:
        "https://images.unsplash.com/photo-1506569422755-c3626428521a?auto=format&fit=crop&w=900&q=80",
      href: "/products/3",
    },
    {
      id: 4,
      title: "북유럽 감성 조명",
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      href: "/products/4",
    },
    {
      id: 5,
      title: "에센셜 린넨 침구세트",
      price: 159000,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
      href: "/products/5",
    },
    {
      id: 6,
      title: "감성 블루투스 스피커",
      price: 72000,
      image:
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80",
      href: "/products/6",
    },
    {
      id: 7,
      title: "프리미엄 키친 나이프",
      price: 38000,
      image:
        "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?auto=format&fit=crop&w=900&q=80",
      href: "/products/7",
    },
    {
      id: 8,
      title: "라이프스타일 요가 매트",
      price: 56000,
      image:
        "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80",
      href: "/products/8",
    },
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[auto,minmax(0,1fr),auto] lg:items-center lg:gap-6">
          <div className="flex items-center gap-3 lg:gap-4">
            <Image
              src={Logo}
              width={110}
              alt="logo"
              className="h-10 w-auto"
              priority
            />
            <div className="hidden flex-col text-xs font-medium text-slate-500 sm:flex">
              <span className="text-sm font-semibold text-slate-800">쿠팡</span>
              <span>로켓배송으로 내일 도착</span>
            </div>
          </div>

          <InputGroup className="h-12 w-full rounded-full border-slate-200 bg-slate-50/70 px-2 text-base shadow-inner shadow-slate-100">
            <InputGroupAddon className="text-slate-500">
              <Search className="size-5" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="찾으시는 상품을 검색해 보세요"
              className="text-sm lg:text-base"
            />
            <InputGroupAddon
              align="inline-end"
              className="text-xs font-semibold text-blue-500"
            >
              실시간 인기 검색어
            </InputGroupAddon>
          </InputGroup>

          <div className="flex items-center justify-end gap-4 lg:justify-normal">
            <button className="flex flex-col items-center text-xs font-semibold text-slate-600">
              <span className="rounded-full bg-blue-50 p-2 text-blue-600 shadow-sm">
                <User className="size-5" />
              </span>
              마이쿠팡
            </button>
            <button className="flex flex-col items-center text-xs font-semibold text-slate-600">
              <span className="relative rounded-full bg-blue-50 p-2 text-blue-600 shadow-sm">
                <Bell className="size-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  5
                </span>
              </span>
              알림
            </button>
            <button className="flex flex-col items-center text-xs font-semibold text-slate-600">
              <span className="rounded-full bg-blue-600 p-2 text-white shadow-sm shadow-blue-200">
                <ShoppingCart className="size-5" />
              </span>
              장바구니
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 lg:col-span-3 lg:justify-between">
            <div className="flex flex-wrap items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  className="rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
              전체 카테고리
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
      </header>
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
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  priority={product.id <= 4}
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
