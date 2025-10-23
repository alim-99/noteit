import React from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getNoteDetails } from '@/lib/actions/notes.actions';
import { PageProps } from '@/types';
import { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = params;
    if (!id) return {};

    const note = await getNoteDetails(id);

    if (!note) {
        return {
            title: "Note Not Found - Noteit",
            description: "The requested note could not be found.",
            robots: {
                index: false,
                follow: true
            }
        };
    }

    return {
        title: `${note.title} - Noteit`,
        description: note.summary || `View details of ${note.title}`,
        keywords: [note.title, ...(note.tags || []), "note details", "noteit"],
        openGraph: {
            title: `${note.title} - Noteit`,
            description: note.summary || `View details of ${note.title}`,
            type: "article",
            images: [
                {
                    url: "/notes-svgrepo-com.svg",
                    width: 800,
                    height: 600,
                    alt: note.title
                }
            ]
        },
        alternates: {
            canonical: `https://noteit-pied.vercel.app/note-details/${note.id}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true
            }
        },
        icons: "/notes-svgrepo-com.svg"
    };
}

export default async function NoteDetailsPage({ params }: PageProps) {
    const { id } = params
    if (!id) return notFound();

    const noteDetails = await getNoteDetails(id);

    const { title, category, tags, createdAt, summary, content } = noteDetails;

    return (
        <section className="flex min-h-[calc(100vh-4rem)] items-start justify-center p-4 sm:p-8">
            <Card className="w-full max-w-3xl bg-card text-card-foreground">
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <CardTitle className="break-words text-3xl font-semibold">{title}</CardTitle>
                            <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                                    {category}
                                </span>
                                {createdAt && (
                                    <span className="text-xs text-muted-foreground">• {createdAt}</span>
                                )}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                    <div className='text-lg mb-4'>{content}</div>
                    {summary && (
                        <p className="text-muted-foreground">{summary}</p>
                    )}
                </CardContent>
                <CardFooter>
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(tags) && tags.length > 0 &&
                            tags.map((t: string) => (
                                <span key={t} className="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] leading-5 text-muted-foreground">
                                    #{t}
                                </span>
                            ))}
                    </div>
                </CardFooter>
            </Card>
        </section>
    )
}
