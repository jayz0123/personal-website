// layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";
import { inconsolata, garamond } from "@/ui/fonts";
import Theme from "@/app/Theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeSwitch from "@/components/ThemeSwitch";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${garamond.className} text-pretty antialiased flex flex-col justify-between items-center min-h-screen`}
      >
        <Theme>
          <Header />
          <div className="flex flex-col items-center w-10/12 mt-6">
            <main>{children}</main>
          </div>
          <Footer />
          <ThemeSwitch />
        </Theme>
      </body>
    </html>
  );
}
