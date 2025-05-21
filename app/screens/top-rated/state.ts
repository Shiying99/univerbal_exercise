import { getTopRatedMoviesQuery } from '@/infrastructure/repositories/movie';
import { Movie } from 'domain/movie';
import { atom } from 'jotai';

export const topRatedMovies$ = atom(async (_, { signal }): Promise<Movie[]> => {
  return await getTopRatedMoviesQuery();
});
