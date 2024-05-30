import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CosmoTax",
  description: "Des taxes intergalactiques.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/alien.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}