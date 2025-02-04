import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const rob = Roboto({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "ТануСофт | Админ ",
  description: "ТануСофт  Админ ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={rob.className}>{children}</div>
      </body>
    </html>
  );
}
