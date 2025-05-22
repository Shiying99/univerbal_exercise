import { List } from '@/ui/list';
import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { useEffect, useState, type ReactNode } from 'react';
import { Text, StyleSheet, View, ScrollView, SectionList } from 'react-native';
import { topRatedMovies$, topRatedTvSeries$ } from './state';
import { TVSeries } from 'domain/tv-series';
import { getTopRatedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { Loader } from '@/ui/loader';
import SortedList from '@/ui/sortedlist';
import { Rating } from '@/ui/rating';
import { Movie } from 'domain/movie';

function sortByAttribute<T, K extends keyof T>(
  array: T[],
  key: K,
  ascending: boolean = true,
): T[] {
  return [...array].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA === valB) return 0;

    if (ascending) {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });
}

// Displays movies with rating above 75%
export default function TopRatedScreen(): ReactNode {
  const [topRatedMoviesLoadable] = useAtom(loadable(topRatedMovies$));

  const [topRatedTvSeriesLoadable] = useAtom(loadable(topRatedTvSeries$));

  if (
    topRatedMoviesLoadable.state === 'loading' ||
    topRatedTvSeriesLoadable.state === 'loading'
  ) {
    return <Loader />;
  }

  // error
  if (topRatedMoviesLoadable.state === 'hasError') {
    return <Text>{JSON.stringify(topRatedMoviesLoadable.error)}</Text>;
  }

  if (topRatedTvSeriesLoadable.state === 'hasError') {
    return <Text>{JSON.stringify(topRatedTvSeriesLoadable.error)}</Text>;
  }

  if (
    topRatedMoviesLoadable.state === 'hasData' ||
    topRatedTvSeriesLoadable.state === 'hasData'
  ) {
    type MediaItem = Movie | TVSeries;
    type Section = {
      title: string;
      data: MediaItem[];
    };

    const sortedMoviesByRating = sortByAttribute(
      topRatedMoviesLoadable.data,
      'rating',
      false,
    );
    const sortedTVSeriesByRating = sortByAttribute(
      topRatedTvSeriesLoadable.data,
      'rating',
      false,
    );

    const constructData: Section[] = [
      {
        title: 'Top rated movies',
        data: sortedMoviesByRating,
      },
      {
        title: 'Top rated TVseries',
        data: sortedTVSeriesByRating,
      },
    ];
    return (
      <SectionList
        sections={constructData}
        keyExtractor={(item, index) => index + item.id}
        style={styles.root}
        renderItem={({ item, index }) => (
          <View style={styles.container}>
            <Text style={styles.index}>{index + '. '}</Text>
            <Text style={{ ...styles.item, marginRight: 100 - item.rating }}>
              {item.title}
            </Text>
            <Rating style={styles.rating} value={item.rating} />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: 'pink',
  },
  index: {
    fontWeight: 'bold',
    color: 'black',
    width: 20,
    flex: 1,
  },
  rating: {
    alignItems: 'flex-end',
    flex: 4,
  },

  item: {
    paddingLeft: 5,
    paddingBottom: 5,
    borderColor: 'black',
    borderWidth: 0,
    backgroundColor: 'gold',
    alignItems: 'flex-start',
    flex: 7,
  },
});
