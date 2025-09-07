import FeatureSection from "@/components/Features";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowTos";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6">
      <section className="max-w-3xl text-center space-y-6 py-32">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Capture ideas. Organize thoughts. Summarize with AI.
        </h1>
        <p className="text-lg text-[var(--text-muted)]">
          Noteit helps you create, edit, and automatically summarize your notes using
          smart AI. Stay focused and keep everything tidy in one place.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/sign-up"
            className="px-5 py-2.5 rounded-md bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <SignedOut>
            <Link href="/sign-in">
              Sign In
            </Link>
          </SignedOut>
        </div>
      </section>
          <FeatureSection />
          <HowItWorksSection />
          <Footer />
    </main>
  );
}
