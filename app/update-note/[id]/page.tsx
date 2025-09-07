import UpdateNoteForm from '@/components/UpdateNoteForm';
import { getNoteDetails } from '@/lib/actions/notes.actions';
import { notFound } from 'next/navigation';
import { Note, PageProps } from '@/types';

const UpdateNotePage = async ({ params }: PageProps) => {
      const note = await getNoteDetails(params.id);

      if (!note) {
            notFound();
      }

      // Transform the note to match the expected type
      const noteData: Note = {
            id: note.id,
            title: note.title,
            content: note.content,
            tags: note.tags || [],
            category: note.category,
            summary: note.summary,
            created_at: note.created_at,
            updated_at: note.updated_at
      };

      return (
            <main className='flex items-center justify-center py-10'>
                  <UpdateNoteForm note={noteData} />
            </main>
      );
};

export default UpdateNotePage;
