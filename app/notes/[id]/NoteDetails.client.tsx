'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient(
  { id }: NoteDetailsClientProps
) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !note) {
    return <p>Failed to load note</p>;
  }

  return (
    <article>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </article>
  );
}
