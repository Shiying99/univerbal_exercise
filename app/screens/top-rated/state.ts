import { getTopRatedMoviesQuery } from '@/infrastructure/repositories/movie';
import { getTopRatedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { Movie } from 'domain/movie';
import { TVSeries } from 'domain/tv-series';
import { atom } from 'jotai';

export const topRatedMovies$ = atom(async (_, { signal }): Promise<Movie[]> => {
  return await getTopRatedMoviesQuery();
});

export const topRatedTvSeries$ = atom(async (_, { signal }): Promise<TVSeries[]> => {
  return await getTopRatedTvSeriesQuery();
});
