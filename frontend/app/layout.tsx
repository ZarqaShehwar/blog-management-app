import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner"


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // optional: choose weights you need
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blog App",
  description:  "A modern blog management platform where users can explore public blogs and create, update, or delete their own posts securely with authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/exp4.svg" sizes="any" />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <StoreProvider>
          <Toaster/>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
