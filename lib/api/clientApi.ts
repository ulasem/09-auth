import { nextServer } from './api';
import { User } from '@/types/user';
import type { Note, NoteTag } from '@/types/note.ts';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = '',
  tag?: string,
): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag && tag !== 'all' && { tag }),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (userData: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/register', userData);
  return data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (userData: LoginRequest): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/login', userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

interface CheckSessionRequest {
  message: string;
}

export const checkSession = async (): Promise<User | CheckSessionRequest> => {
  const { data } = await nextServer.get<User | CheckSessionRequest>('/auth/session');
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export interface UpdateUserRequest {
  username?: string;
}

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};
