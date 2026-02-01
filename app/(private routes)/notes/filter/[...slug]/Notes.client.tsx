'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './NotesClient.module.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import type { NoteTag, NotesResponse } from '@/types/note';

interface NotesClientProps {
  tag?: NoteTag;
}

function NotesPageClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const { data, isError, isFetching, isSuccess } = useQuery<NotesResponse>({
    queryKey: ['notes', query, currentPage, tag],
    queryFn: () => fetchNotes(currentPage, 12, query, tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox inputValue={query} onChange={debouncedSetQuery} />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <main className="notes-list">
        {isError && <p>Error. Try again.</p>}
        {isFetching && <p>Loading...</p>}

        {isSuccess && data?.notes.length === 0 && <p>Data not found.</p>}

        {isSuccess && data?.notes.length > 0 && (
          <>
            <NoteList notes={data.notes} />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onSelectPage={setCurrentPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default NotesPageClient;
