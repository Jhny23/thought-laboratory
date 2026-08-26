import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/app/components/CookieConsent";

export const metadata: Metadata = {
  title: "Thought Laboratory",
  description: "Philosophy experiments. For people who think.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
// clean
