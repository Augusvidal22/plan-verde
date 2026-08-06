import type { Metadata } from "next";
import { Quicksand, Poppins, Caveat } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Plan Verde 🌿",
  description: "Un plan al azar para vos, sofff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${quicksand.variable} ${poppins.variable} ${caveat.variable} font-sans min-h-screen bg-crema text-negro antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
