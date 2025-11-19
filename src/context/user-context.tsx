"use client";

import { createContext, useContext, useMemo, useState } from "react";

type UserProfile = {
  email: string;
  password: string;
  name: string;
  phone: string;
  age: number;
};

type Order = {
  id: string;
  title: string;
  date: string;
  status: "배송 준비중" | "배송 완료" | "주문 완료";
  total: number;
  items: number;
};

type LoginResult = {
  success: boolean;
  message?: string;
};

type UserContextValue = {
  user: UserProfile | null;
  orders: Order[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
};

const defaultOrders: Order[] = [
  {
    id: "ORD-20231101",
    title: "애플 에어팟 프로 2세대",
    date: "2023-11-01",
    status: "배송 완료",
    total: 329000,
    items: 1,
  },
  {
    id: "ORD-20231024",
    title: "삼성 비스포크 청소기 세트",
    date: "2023-10-24",
    status: "배송 준비중",
    total: 589000,
    items: 1,
  },
  {
    id: "ORD-20231010",
    title: "유기농 식품 정기배송",
    date: "2023-10-10",
    status: "주문 완료",
    total: 89000,
    items: 6,
  },
];

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders] = useState(defaultOrders);

  const login = (email: string, password: string): LoginResult => {
    if (!email || !password) {
      return { success: false, message: "이메일과 비밀번호를 입력해 주세요." };
    }

    setUser({
      email,
      password,
      name: "홍길동",
      phone: "010-1234-5678",
      age: 32,
    });

    return { success: true };
  };

  const logout = () => setUser(null);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      orders,
      isAuthenticated: Boolean(user),
      login,
      logout,
      updateUser,
    }),
    [user, orders]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
