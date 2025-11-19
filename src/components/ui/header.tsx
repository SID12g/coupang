"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/../public/logo.png";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { Bell, ChevronDown, Search, ShoppingCart, User, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const navItems = ["오늘의 특가", "로켓프레시", "로켓배송", "쿠팡플레이"];
  const { isAuthenticated, login } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleMyCoupangClick = () => {
    if (isAuthenticated) {
      router.push("/account");
      return;
    }

    setIsLoginOpen(true);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = login(credentials.email, credentials.password);

    if (!result.success) {
      setLoginError(result.message ?? "로그인에 실패했습니다.");
      return;
    }

    setLoginError("");
    setIsLoginOpen(false);
    setCredentials({ email: "", password: "" });
    router.push("/account");
  };

  const closeModal = () => {
    setIsLoginOpen(false);
    setLoginError("");
  };

  return (
    <>
      <header className="border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[auto,minmax(0,1fr),auto] lg:items-center lg:gap-6">
          <Link href="/">
            <div className="flex items-center gap-3 lg:gap-4">
              <Image
                src={Logo}
                width={110}
                alt="logo"
                className="h-10 w-auto"
                priority
              />
              <div className="hidden flex-col text-xs font-medium text-slate-500 sm:flex">
                <span className="text-sm font-semibold text-slate-800">
                  쿠팡
                </span>
                <span>로켓배송으로 내일 도착</span>
              </div>
            </div>
          </Link>

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
            <button
              type="button"
              onClick={handleMyCoupangClick}
              className="flex flex-col items-center text-xs font-semibold text-slate-600"
            >
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

      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-500">
                  마이쿠팡 로그인
                </p>
                <h3 className="text-xl font-bold text-slate-900">
                  이메일과 비밀번호를 입력해 주세요
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1 block text-sm font-semibold text-slate-700"
                >
                  이메일
                </label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@coupang.com"
                  value={credentials.email}
                  onChange={(event) =>
                    setCredentials((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="mb-1 block text-sm font-semibold text-slate-700"
                >
                  비밀번호
                </label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="비밀번호를 입력하세요"
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                />
              </div>
              {loginError && (
                <p className="text-sm font-medium text-red-500">{loginError}</p>
              )}
              <Button className="w-full rounded-full py-5 text-base font-semibold">
                로그인
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
