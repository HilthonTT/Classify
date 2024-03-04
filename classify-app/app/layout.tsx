import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const font = Open_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Classify",
  description: "Sort out your items simply.",
  icons: ["/logo.svg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
