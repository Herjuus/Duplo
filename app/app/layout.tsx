import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duplo",
  description: "Self-hosted deployment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col p-2`}>
        <ThemeProvider>
          <div className="space-y-2 px-10">
            <Header />
            <div className="flex-1 grow hidden flex-col justify-center md:flex items-center">
              {children}
            </div>
            <div className="flex-1 grow flex-col justify-center flex md:hidden p-2">
              <h1 className="text-center text-4xl font-bold">No support for mobile devices...</h1>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
