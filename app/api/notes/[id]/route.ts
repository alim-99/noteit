import { createSupbaseClient } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function DELETE(
      _req: Request,
      { params }: { params: { id: string } }
) {
      try {
            const { userId } = await auth()
            if (!userId) {
                  return new NextResponse('Unauthorized', { status: 401 })
            }

            const supabase = await createSupbaseClient()

            const { error } = await supabase
                  .from('notes')
                  .delete()
                  .eq('id', params.id)
                  .eq('user_id', userId) // Ensure users can only delete their own notes

            if (error) {
                  console.error('Error deleting note:', error)
                  return new NextResponse('Internal Server Error', { status: 500 })
            }

            return NextResponse.json({ success: true })
      } catch (error) {
            console.error('[DELETE_NOTE_ERROR]', error)
            return new NextResponse('Internal Server Error', { status: 500 })
      }
}
