import { Metadata } from 'next';
import CreateNoteForm from '@/components/CreateNoteForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
  title: "Create New Note - Noteit",
  description: "Create a new note with Noteit's intuitive editor.",
  keywords: ["create note", "new note", "noteit", "note taking"],
  openGraph: {
    title: "Create New Note - Noteit",
    description: "Create a new note with Noteit's intuitive editor.",
    type: "website",
    images: [
      {
        url: "/notes-svgrepo-com.svg",
        width: 800,
        height: 600,
        alt: "Create Note - Noteit"
      }
    ]
  },
  twitter: {
    title: "Create New Note - Noteit",
    description: "Create a new note with Noteit's intuitive editor.",
    card: "summary_large_image",
    images: ["/notes-svgrepo-com.svg"]
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true
    }
  },
  icons: "/notes-svgrepo-com.svg"
};

const page = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    return (
        <main className="flex items-center justify-center">
            <article className="gap-4 flex flex-col mt-14">
                <h1 className="text-3xl font-bold mb-3">Note Builder</h1>
                <CreateNoteForm />
            </article>
        </main>
    )
}

export default page
