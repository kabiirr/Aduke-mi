import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Happy 25th Birthday, Azeezah! 🤍",
  description: "An interactive cinematic scrapbook celebrating 25 sweet things and unforgettable chapters of Azeezah's life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="bg-cream-200 text-charcoal-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
