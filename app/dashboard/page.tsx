import NotesCard from '@/components/NotesCard';
import { getNotes } from '@/lib/actions/notes.actions'
import React from 'react'

export const revalidate = 0;

const page = async () => {
    const notes = await getNotes();

    return (
        <main className='container mx-auto px-4'>
            <section className='flex justify-between gap-4 max-sm:flex-col'>
                <h2 className='text-3xl font-bold px-4 py-5'>Notes Dashboard</h2>
            </section>
            <section className='flex flex-wrap justify-center gap-6 w-full'>
                {notes.map((note) => (
                    <NotesCard key={note.id} {...note} />
                ))}
            </section>
        </main>
    )
}

export default page
