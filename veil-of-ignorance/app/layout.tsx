import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/app/components/CookieConsent";
import CursorEffects from "@/app/components/CursorEffects";
import PageTransition from "@/app/components/PageTransition";
import ScrollIndicator from "@/app/components/ScrollIndicator";

export const metadata: Metadata = {
  title: "Thought Laboratory",
  description: "Philosophy experiments. For people who think.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorEffects />
        <PageTransition />
        <ScrollIndicator />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
