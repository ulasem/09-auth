import { Note, NoteId } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesClient = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string,
): Promise<NotesResponse> => {
  const params = new URLSearchParams({ page: page.toString(), perPage: perPage.toString() });
  if (search) params.append('search', search);
  if (tag) params.append('tag', tag);

  const res = await fetch(`/api/notes?${params.toString()}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch notes');
  }
  return res.json();
};

export const createNote = async (newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
};

export const deleteNote = async (noteId: NoteId): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const fetchNoteById = async (noteId: NoteId): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
