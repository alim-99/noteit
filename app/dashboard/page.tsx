import { Metadata } from 'next';
import NotesCard from '@/components/NotesCard';
import { getNotes } from '@/lib/actions/notes.actions'
import React from 'react'

export const metadata: Metadata = {
    title: "Noteit - Dashboard",
    description: "Manage your notes in the Noteit dashboard.",
    keywords: ["notes", "noteit", "dashboard", "note management"],
    openGraph: {
        title: "Noteit Dashboard",
        description: "Manage your notes in the Noteit dashboard.",
        type: "website",
        images: [
            {
                url: "/notes-svgrepo-com.svg",
                width: 800,
                height: 600,
                alt: "Noteit Dashboard"
            }
        ]
    },
    twitter: {
        title: "Noteit Dashboard",
        description: "Manage your notes in the Noteit dashboard.",
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

export const revalidate = 0;

const page = async () => {
    const notes = await getNotes();

    return (
        <main className='container mx-auto px-4'>
            <section className='flex justify-between gap-4 max-sm:flex-col'>
                <h2 className='text-3xl font-bold px-4 py-5'>Notes Dashboard</h2>
            </section>
            <section className='flex flex-wrap justify-center gap-6 w-full'>
                {notes && notes.length > 0 ? (
                    notes.map((note) => (
                        <NotesCard key={note.id} {...note} />
                    ))
                ) : (
                    <div className='text-center py-10 w-full'>
                        <p className='text-gray-500'>No notes found. Create your first note to get started!</p>
                    </div>
                )}
            </section>
        </main>
    )
}

export default page
