import type { Metadata } from "next";
import "@/app/globals.css";



export const metadata: Metadata = {
  title: "Multi Event",
  description: "We provide Live Music with our outstanding team",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

