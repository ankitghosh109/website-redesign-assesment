import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0c192c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Xntrova Technologies | Digital Marketing & Technology Agency",
  description:
    "We combine creative thinking, marketing expertise and modern technology to help brands achieve real growth in the digital world.",
  keywords: [
    "Digital Marketing",
    "Technology Agency",
    "SEO",
    "Web Development",
    "Branding & Design",
    "Paid Advertising",
    "Growth Agency",
  ],
  authors: [{ name: "Xntrova Technologies" }],
  openGraph: {
    title: "Xntrova Technologies | Build Your Brand. Grow Your Business.",
    description:
      "We combine creative thinking, marketing expertise and modern technology to help brands achieve real growth in the digital world.",
    url: "https://www.xntrova.com",
    siteName: "Xntrova Technologies",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
