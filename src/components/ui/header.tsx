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
  const { isAuthenticated, login, signup } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    age: "",
    role: "buyer" as "buyer" | "seller",
  });
  const [authError, setAuthError] = useState("");

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
      setAuthError(result.message ?? "로그인에 실패했습니다.");
      return;
    }

    resetAuthState();
    router.push("/account");
  };

  const handleSignupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      setAuthError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.name ||
      !signupForm.phone ||
      !signupForm.age
    ) {
      setAuthError("모든 필드를 입력해 주세요.");
      return;
    }

    const result = signup({
      email: signupForm.email,
      password: signupForm.password,
      name: signupForm.name,
      phone: signupForm.phone,
      age: Number(signupForm.age),
      role: signupForm.role,
    });

    if (!result.success) {
      setAuthError(result.message ?? "회원가입에 실패했습니다.");
      return;
    }

    resetAuthState();
    router.push("/account");
  };

  const resetAuthState = () => {
    setIsLoginOpen(false);
    setAuthMode("login");
    setAuthError("");
    setCredentials({ email: "", password: "" });
    setSignupForm({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      age: "",
      role: "buyer",
    });
  };

  const closeModal = () => {
    resetAuthState();
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
                  {authMode === "login"
                    ? "마이쿠팡 로그인"
                    : "마이쿠팡 회원가입"}
                </p>
                <h3 className="text-xl font-bold text-slate-900">
                  {authMode === "login"
                    ? "이메일과 비밀번호를 입력해 주세요"
                    : "필수 정보를 입력해 계정을 만들어 보세요"}
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
            {authMode === "login" ? (
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
                {authError && (
                  <p className="text-sm font-medium text-red-500">
                    {authError}
                  </p>
                )}
                <Button className="w-full rounded-full py-5 text-base font-semibold">
                  로그인
                </Button>
                <p className="text-center text-sm text-slate-500">
                  아직 계정이 없다면{" "}
                  <button
                    type="button"
                    className="font-semibold text-blue-600 underline-offset-2 hover:underline"
                    onClick={() => {
                      setAuthError("");
                      setAuthMode("signup");
                    }}
                  >
                    회원가입
                  </button>{" "}
                  해 주세요.
                </p>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSignupSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      이메일
                    </label>
                    <Input
                      type="email"
                      placeholder="example@coupang.com"
                      value={signupForm.email}
                      onChange={(event) =>
                        setSignupForm((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      비밀번호
                    </label>
                    <Input
                      type="password"
                      value={signupForm.password}
                      onChange={(event) =>
                        setSignupForm((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      비밀번호 확인
                    </label>
                    <Input
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={(event) =>
                        setSignupForm((prev) => ({
                          ...prev,
                          confirmPassword: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      이름
                    </label>
                    <Input
                      value={signupForm.name}
                      onChange={(event) =>
                        setSignupForm((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      전화번호
                    </label>
                    <Input
                      value={signupForm.phone}
                      onChange={(event) =>
                        setSignupForm((prev) => ({
                          ...prev,
                          phone: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      나이
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={signupForm.age}
                      onChange={(event) =>
                        setSignupForm((prev) => ({
                          ...prev,
                          age: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      권한 선택
                    </label>
                    <div className="flex gap-3">
                      {[
                        { value: "buyer", label: "구매자" },
                        { value: "seller", label: "판매자" },
                      ].map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={
                            signupForm.role === option.value
                              ? "default"
                              : "outline"
                          }
                          className="flex-1 rounded-full py-4 font-semibold"
                          onClick={() =>
                            setSignupForm((prev) => ({
                              ...prev,
                              role: option.value as "buyer" | "seller",
                            }))
                          }
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                {authError && (
                  <p className="text-sm font-medium text-red-500">
                    {authError}
                  </p>
                )}
                <Button className="w-full rounded-full py-5 text-base font-semibold">
                  회원가입 완료
                </Button>
                <p className="text-center text-sm text-slate-500">
                  이미 계정이 있다면{" "}
                  <button
                    type="button"
                    className="font-semibold text-blue-600 underline-offset-2 hover:underline"
                    onClick={() => {
                      setAuthError("");
                      setAuthMode("login");
                    }}
                  >
                    로그인
                  </button>{" "}
                  해 주세요.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
