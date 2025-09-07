'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Pencil, Sparkles } from 'lucide-react'
import { NotesCardProps } from '@/types'
import { DeleteNoteButton } from './DeleteNoteButton'
import { useRouter } from 'next/navigation';
import { addSummary } from '@/lib/actions/notes.actions';

const NotesCard: React.FC<NotesCardProps> = ({
      id,
      title,
      content,
      tags,
      category,
      summary,
      createdAt,
      className,
}) => {
      const dateLabel = createdAt
            ? new Date(createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
            })
            : undefined;

      const router = useRouter();

      const handleSummarize = async () => {
            // Prevent summarizing if a summary already exists
            if (summary) {
                  return;
            }

            try {
                  const res = await fetch("api/notes/summarize", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ note: content }),
                  });

                  if(!res.ok) {
                        throw new Error('Error Summarizing Note');
                  }

                  const { summary: generatedSummary } = await res.json();

                  if (generatedSummary) {
                        // Update the note with the generated summary
                        await addSummary({
                              noteId: id,
                              summary: generatedSummary
                        });
                        
                        // Refresh the page to show the updated note
                        router.refresh();
                  }
            } catch (error) {
                  console.error('Error in handleSummarize:', error);
            }
      }


      return (
            <Card
                  className={cn('group cursor-pointer border w-full max-w-sm dark:bg-card text-card-foreground backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-out hover:ring-1 hover:ring-primary/30', className)}
                  onClick={(e) => {
                        if (e.target === e.currentTarget) {
                              router.push(`/note-details/${id}`);
                        }
                  }}
            >
                  <CardHeader className="border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                    <CardTitle className="truncate text-base sm:text-lg">{title}</CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                                                {category}
                                          </span>
                                          {dateLabel && <span className="text-xs text-muted-foreground">• {dateLabel}</span>}
                                    </CardDescription>
                              </div>
                        </div>
                  </CardHeader>

                  <CardContent className="pt-4">
                        {summary ? (
                              <p className="whitespace-pre-line text-muted-foreground line-clamp-4">{summary}</p>
                        ) : (
                              <p className="line-clamp-4 text-xl text-muted-foreground">{content}</p>
                        )}
                  </CardContent>

                  <CardFooter className="border-t border-neutral-200 dark:border-neutral-800">
                        <div className="flex w-full items-center gap-2">
                              {tags?.slice(0, 5).map((t) => (
                                    <span
                                          key={t}
                                          className="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] leading-5 text-muted-foreground"
                                    >
                                          #{t}
                                    </span>
                              ))}
                              {tags && tags.length > 5 && (
                                    <span className="text-[11px] text-muted-foreground">+{tags.length - 5} more</span>
                              )}

                              <div className="ml-auto flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="size-8" onClick={() => router.push(`/update-note/${id}`)}>
                                          <Pencil className="size-4" />
                                    </Button>
                                    <DeleteNoteButton noteId={id} />
                                    <Button
                                          variant="ghost"
                                          className="px-10 size-fit"
                                          onClick={handleSummarize}
                                    >
                                          <span>Summarize</span>
                                          <Sparkles className="size-4 text-purple-500" />
                                    </Button>
                              </div>
                        </div>
                  </CardFooter>
            </Card>
      )
}

export default NotesCard
