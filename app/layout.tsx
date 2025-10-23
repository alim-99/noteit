import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";


const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noteit",
  description: "Create notes, update and summarize notes with ai model.",
  keywords: ["notes", "noteit", "note builder", "note summarizer", "note"],
  openGraph: {
    title: "Best Ai-Note Builder",
    description: "Create notes, update and summarize notes with ai model.",
    type: "website",
    images: [
      {
        url: "/notes-svgrepo-com.svg",
        width: 800,
        height: 600,
        alt: "Noteit"
      }
    ]
  },
  twitter: {
    title: "Best Ai-Note Builder",
    description: "Create notes, update and summarize notes with ai model.",
    card: "summary_large_image",
    images: ["/notes-svgrepo-com.svg"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    }
  },
  alternates: {
    canonical: "/",
  },
  icons: "/notes-svgrepo-com.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up"
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${bricolage.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NavBar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

