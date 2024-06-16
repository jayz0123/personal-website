// layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";
import { garamond } from "@/ui/fonts";
import Theme from "@/app/Theme";
import NavBar from "@/components/NavBar";
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${garamond.className} bg-base-100 text-base-content transition duration-200 ease-in-out text-pretty antialiased flex flex-col items-center`}
      >
        <Theme>
          <div className="sticky top-0 z-30 flex h-16 w-full items-center backdrop-blur">
            <NavBar />
          </div>
          <div className="w-10/12 my-6">
            <main>{children}</main>
          </div>
          <div className="bottom-4">
            <Footer />
          </div>
        </Theme>
      </body>
    </html>
  );
}
