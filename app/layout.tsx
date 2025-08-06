import { Lato } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-lato", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nota",
  description: "Nota Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className={lato.className}>{children}</body>
    </html>
  );
}
