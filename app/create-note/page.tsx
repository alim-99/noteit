import CreateNoteForm from '@/components/CreateNoteForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

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
