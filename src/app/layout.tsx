import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "세계사 마스터맵",
  description: "고등 세계사 사건 학습 프로토타입"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
