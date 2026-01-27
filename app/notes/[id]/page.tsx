import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

interface NoteDetailsProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: NoteDetailsProps
): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  const title = `Note: ${note.title}`;
  const description = note.content.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `/notes/${params.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/${params.id}`,
      type: 'article',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function NoteDetailsPage(
  { params }: NoteDetailsProps
) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} />
    </HydrationBoundary>
  );
}
