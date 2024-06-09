// layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";
import { inconsolata, garamond } from "@/ui/fonts";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Jayz",
    default: "Howie Jayz",
  },
  description: "Howie Jayz's Personal Website Built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${garamond.className} text-pretty antialiased flex flex-col justify-between items-center min-h-screen`}
      >
        <Header />
        <div className="flex flex-col items-center w-10/12 mt-6">
          <main>{children}</main>
        </div>
        <Footer />
        <ThemeToggleButton />
      </body>
    </html>
  );
}
