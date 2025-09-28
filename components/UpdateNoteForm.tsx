"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { SelectContent, SelectItem, SelectTrigger, Select, SelectValue } from "./ui/select"
import { updateNote } from "@/lib/actions/notes.actions"
import { useRouter } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast';
import { Note } from '@/types';

const formSchema = z.object({
      title: z.string().min(2, {
            message: "Username must be at least 2 characters.",
      }),
      content: z.string().min(10, {
            message: "Content must be at least 10 characters.",
      }),
      tags: z.array(z.string()).min(1, {
            message: "Tags must be at least 1 character",
      }),
      category: z.string().min(1, {
            message: "Category must be at least 1 character"
      }),
      summary: z.string().optional(),
})

interface UpdateNoteFormProps {
      note: Note;
}

const UpdateNoteForm = ({ note }: UpdateNoteFormProps) => {
      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  title: note.title,
                  content: note.content,
                  tags: note.tags,
                  category: note.category,
                  summary: note.summary || '',
            },
      });

      const router = useRouter();

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                  const updatedNote = await updateNote({
                        noteId: note.id,
                        updates: {
                              title: values.title,
                              content: values.content,
                              tags: values.tags,
                              category: values.category,
                              summary: values.summary,
                        },
                  });

                  if (updatedNote) {
                        toast.success('Note updated successfully', {
                              style: {
                                    border: '1px solid hsl(142.1 76.2% 36.3%)',
                                    background: 'hsl(0 0% 100%)',
                                    color: 'hsl(142.1 76.2% 36.3%)',
                                    padding: '12px 16px',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                              },
                              iconTheme: {
                                    primary: 'hsl(142.1 76.2% 36.3%)',
                                    secondary: 'white',
                              },
                        });
                        router.push('/dashboard');
                        router.refresh();
                  }
            } catch (e) {
                  console.error(e);
                  toast.error('Failed to update a note', {
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
            }
      }

      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Title</FormLabel>
                                          <FormControl>
                                                <Input placeholder="Enter the note title" {...field} className="h-10" />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />
                        <FormField
                              control={form.control}
                              name="content"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Content</FormLabel>
                                          <FormControl>
                                                <Textarea 
                                                placeholder="Enter the content you want to add" 
                                                {...field} className="w-100 h-fit" 
                                                />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />
                        <FormField
                              control={form.control}
                              name="tags"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Tag Name</FormLabel>
                                          <FormControl>
                                                <Input
                                                      placeholder="Enter tags separated by commas"
                                                      className="h-10"
                                                      value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                                                      onChange={(e) => {
                                                            const arr = e.target.value
                                                                  .split(',')
                                                                  .map((s) => s.trim())
                                                                  .filter(Boolean)
                                                            field.onChange(arr)
                                                      }}
                                                      onBlur={field.onBlur}
                                                      name={field.name}
                                                      ref={field.ref}
                                                />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />
                        <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Category Name</FormLabel>
                                          <FormControl>
                                                <Select
                                                      onValueChange={field.onChange}
                                                      value={field.value}
                                                >
                                                      <SelectTrigger className="capitalize">
                                                            <SelectValue placeholder="Select the category" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                            <SelectItem value="work">Work</SelectItem>
                                                            <SelectItem value="personal">Personal</SelectItem>
                                                            <SelectItem value="study">Study</SelectItem>
                                                            <SelectItem value="training">Training</SelectItem>
                                                      </SelectContent>
                                                </Select>
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />
                        {note.summary && (
                              <FormField
                                    control={form.control}
                                    name="summary"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Summary</FormLabel>
                                                <FormControl>
                                                      <Textarea
                                                            placeholder="Enter a summary of your note"
                                                            {...field}
                                                            className="w-100 h-fit"
                                                      />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                        )}
                        <Button className="bg-white hover:bg-gray-300" type="submit">Update Note</Button>
                        <Toaster position="top-center" reverseOrder={false} />
                  </form>
            </Form>
      )
}

export default UpdateNoteForm;
