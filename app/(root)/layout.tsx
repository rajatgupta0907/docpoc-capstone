import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Docpoc",
  description: "Doctors Doctors Doctors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-egg-dark`}>
        <div className="body">{children}</div>
        <footer className="bg-blue-egg-dark text-center">Trademark &copy; DocPoc</footer>
      </body>
    </html>
  );
}
