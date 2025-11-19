import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/user-context";

export const metadata: Metadata = {
  title: "Coupang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
