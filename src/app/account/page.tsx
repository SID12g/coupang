"use client";

import Header from "@/components/ui/header";
import { useUser } from "@/context/user-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { user, updateUser, orders, isAuthenticated, logout } = useUser();
  const [formValues, setFormValues] = useState(user);
  const [statusMessage, setStatusMessage] = useState("");
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setFormValues(user);
  }, [user]);

  useEffect(
    () => () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    },
    []
  );

  const handleChange =
    (field: "email" | "password" | "name" | "phone" | "age") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) =>
        prev
          ? {
              ...prev,
              [field]:
                field === "age"
                  ? Number(event.target.value)
                  : event.target.value,
            }
          : prev
      );
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValues) return;

    updateUser(formValues);
    setStatusMessage("정보가 저장되었습니다.");

    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }
    statusTimeoutRef.current = setTimeout(() => {
      setStatusMessage("");
      statusTimeoutRef.current = null;
    }, 3000);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !formValues) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Header />
        <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              마이쿠팡을 이용하려면 로그인이 필요해요
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              상단의 마이쿠팡 버튼을 눌러 이메일과 비밀번호로 로그인해 주세요.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="space-y-10">
          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-900/5">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                  사용자 정보
                </p>
                <h1 className="text-3xl font-bold text-slate-900">
                  내 계정 관리
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  정보를 최신 상태로 유지해 빠른 주문과 배송을 경험해 보세요.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-full px-6 py-2 text-sm font-semibold"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    이메일
                  </label>
                  <Input
                    type="email"
                    value={formValues.email}
                    onChange={handleChange("email")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    비밀번호
                  </label>
                  <Input
                    type="password"
                    value={formValues.password}
                    onChange={handleChange("password")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    이름
                  </label>
                  <Input
                    value={formValues.name}
                    onChange={handleChange("name")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    전화번호
                  </label>
                  <Input
                    value={formValues.phone}
                    onChange={handleChange("phone")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    나이
                  </label>
                  <Input
                    type="number"
                    value={formValues.age}
                    onChange={handleChange("age")}
                    min={0}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {statusMessage && (
                  <p className="text-sm font-semibold text-green-600">
                    {statusMessage}
                  </p>
                )}
                <Button className="rounded-full px-8 py-5 text-base font-semibold">
                  변경사항 저장
                </Button>
              </div>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-900/5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                  주문 내역
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  최근 주문을 확인하세요
                </h2>
              </div>
              <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
                총 {orders.length}건
              </span>
            </div>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition hover:border-blue-200 hover:bg-white"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        주문번호 {order.id}
                      </p>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {order.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <span>주문일 {order.date}</span>
                    <span>상품 {order.items}개</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
