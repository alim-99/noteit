'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'


export const DeleteNoteButton = ({ noteId }: {noteId: string}) => {
      const router = useRouter()

      const handleDeleteNote = async () => {
            try {
                  const response = await fetch(`/api/notes/${noteId}`, {
                        method: 'DELETE',
                  })

                  if (!response.ok) {
                        throw new Error('Failed to delete note')
                  }

                  router.refresh()
            } catch (error) {
                  console.error(error)
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
            </Button>
      )
}
