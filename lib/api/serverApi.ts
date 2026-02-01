import { Note, NoteId } from '@/types/note';
import { nextServer } from './api';
import { CheckSessionRequest, NotesResponse } from './clientApi';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

export const fetchNotesServer = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string,
): Promise<NotesResponse> => {
  const cookieStore = await cookies();

  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const { data } = await nextServer.get<NotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNoteById = async (noteId: NoteId): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
