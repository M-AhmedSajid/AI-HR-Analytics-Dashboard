import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardShell from "../components/DashboardShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HR Analytics Dashboard",
  description: "SaaS-style HR analytics dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
