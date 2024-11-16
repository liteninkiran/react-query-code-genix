import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import { getProjects, getTodo, getTodosIds } from './api';

export const useTodosIds = () => useQuery({
  queryKey: ['todos'],
  queryFn: getTodosIds,
});

export const useTodos = (ids: (number | undefined)[] | undefined) => useQueries({
  queries: (ids ?? []).map((id) => ({
    queryKey: ['todo', { id }],
    queryFn: () => getTodo(id!),
  })),
});

export const useProjects = (page: number) => useQuery({
  queryKey: ['projects', { page }],
  queryFn: () => getProjects(page),
  placeholderData: keepPreviousData,
});
