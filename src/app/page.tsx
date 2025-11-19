import Image from "next/image";
import Logo from "@/../public/logo.png";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Bell, ChevronDown, Search, ShoppingCart, User } from "lucide-react";

export default function Home() {
  const navItems = ["오늘의 특가", "로켓프레시", "로켓배송", "쿠팡플레이"];

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
    </div>
  );
}
