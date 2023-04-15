import "./globals.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokecollect",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
