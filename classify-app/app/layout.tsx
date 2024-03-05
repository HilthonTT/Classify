import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Suspense } from "react";

import { Loading } from "@/components/auth/loading";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

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
    <html lang="en">
      <body className={font.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
