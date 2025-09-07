'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from './ui/button'

interface DeleteNoteButtonProps {
      noteId: string
}

export const DeleteNoteButton = ({ noteId }: DeleteNoteButtonProps) => {
      const router = useRouter()

      const handleDeleteNote = async () => {
            try {
                  const response = await fetch(`/api/notes/${noteId}`, {
                        method: 'DELETE',
                  })

                  if (!response.ok) {
                        throw new Error('Failed to delete note')
                  }

                  toast.success('Note deleted successfully', {
                        style: {
                              border: '1px solid hsl(0 84.2% 60.2%)',
                              background: 'hsl(0 0% 100%)',
                              color: 'hsl(0 84.2% 60.2%)',
                              padding: '12px 16px',
                              borderRadius: '0.5rem',
                              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                        },
                        iconTheme: {
                              primary: 'hsl(0 84.2% 60.2%)',
                              secondary: 'white',
                        },
                  });
                  router.refresh()
            } catch (error) {
                  console.error(error)
                  toast.error('Failed to delete note', {
                        style: {
                              border: '1px solid hsl(0 84.2% 60.2%)',
                              background: 'hsl(0 0% 100%)',
                              color: 'hsl(0 84.2% 60.2%)',
                              padding: '12px 16px',
                              borderRadius: '0.5rem',
                              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                        },
                        iconTheme: {
                              primary: 'hsl(0 84.2% 60.2%)',
                              secondary: 'white',
                        },
                  })
            }
      }

      return (
            <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-red-500 hover:text-red-600"
                  onClick={handleDeleteNote}
            >
                  <Trash2 className="size-4" />
                  <Toaster position='top-center' reverseOrder={false} />
            </Button>
      )
}
