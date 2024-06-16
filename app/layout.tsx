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
        className={`${garamond.className} bg-base-100 text-base-content transition duration-200 ease-in-out text-pretty antialiased flex flex-col justify-between items-center min-h-screen`}
      >
        <Theme>
          <div className="sticky top-0 z-30 flex h-16 w-full items-center backdrop-blur">
            <NavBar />
          </div>
          <div className="flex flex-row items-center w-10/12 my-6">
            <main>{children}</main>
          </div>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
