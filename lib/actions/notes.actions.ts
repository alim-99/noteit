"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupbaseClient } from "../supabase";
import { CreateNoteParams, UpdateNoteParams } from "@/types";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";


export const createNote = async (formData: CreateNoteParams) => {
      const { userId } = await auth();

      const supabase = await createSupbaseClient();

      const { title, content, tags, category, summary } = formData;

      const { data, error } = await supabase
            .from('notes')
            .insert({
                  title,
                  content,
                  tags,
                  category,
                  user_id: userId,
                  ...(typeof summary !== 'undefined' ? { summary } : {}),
            })
            .select();

      if (error || !data) {
            console.error('Supabase insert error:', error);
            throw new Error(`[Supabase Insert] ${error?.code ?? ''} ${error?.message ?? 'Failed to create a note'}`.trim());
      }

      return data[0];

}

export const getNotes = async () => {
      try {
            const { userId } = await auth();
            
            if (!userId) {
                  console.log('No user ID found, returning empty notes array');
                  return [];
            }

            const supabase = await createSupbaseClient();

      const { data, error } = await supabase.from('notes').select('*').eq('user_id', userId);

            if (error) {
                  console.error('Error fetching notes:', error);
                  return [];
            }

            return data || [];
      } catch (error) {
            console.error('Error in getNotes:', error);
            return [];
      }
}

export const updateNote = async ({ noteId, updates }: UpdateNoteParams) => {
      const supabase = await createSupbaseClient();

      const { data, error } = await supabase
            .from('notes')
            .update({
                  title: updates.title,
                  content: updates.content,
                  tags: updates.tags,
                  category: updates.category,
                  summary: updates.summary,
                  updated_at: new Date().toISOString(),
            })
            .eq('id', noteId)
            .select();

      if (error || !data) {
            console.error('Error updating note:', error);
            throw new Error(error?.message || 'Error updating note');
      }

      revalidatePath('/dashboard');
      return data[0];
}

export const addSummary = async ({ noteId, summary }: { noteId: string, summary: string }) => {
      const supabase = await createSupbaseClient();

      const { data, error } = await supabase
            .from('notes')
            .update({ summary })
            .eq('id', noteId)
            .select();

      if (error || !data) {
            throw new Error(`Failed to update note: ${error?.message}`);
      }

      revalidatePath('/dashboard');

      return data[0];
}

export const deleteNote = async (noteId: string) => {
      const { userId } = await auth();
      if (!userId) {
            throw new Error('Unauthorized');
      }

      const supabase = await createSupbaseClient();

      const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', noteId)
            .eq('user_id', userId);

      if (error) {
            console.error('Error deleting note:', error)
            throw new Error(`Failed to delete note`);
      }

      revalidatePath('/dashboard');
}

export const getNoteDetails = async (noteId: string) => {
      const { userId } = await auth();
      if (!userId) return notFound();

      const supabase = await createSupbaseClient()
      const { data: note, error } = await supabase
            .from('notes')
            .select('*')
            .eq('id', noteId)
            .eq('user_id', userId)
            .single();

      if (error || !note) return notFound()

      const createdAt = note.created_at ? new Date(note.created_at).toLocaleString() : undefined;

      return {
            ...note,
            createdAt
      }
}