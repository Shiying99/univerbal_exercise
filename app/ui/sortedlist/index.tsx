import { ReactNode } from 'react';
import {
  FlatList,
  StyleProp,
  View,
  ViewStyle,
  Text,
  StyleSheet,
} from 'react-native';

import { Rating } from '../rating';

type ListProps = {
  style?: StyleProp<ViewStyle>;
  data: { id: string; rating: number }[];
};

export default function SortedList({ style, data }: ListProps): ReactNode {
  const sortedData = [...data].sort((a, b) => b.rating - a.rating);

  return (
    <FlatList
      style={style}
      data={sortedData}
      keyExtractor={(it) => it.id}
      renderItem={(it) => {
        return (
          <ListEntry
            style={undefined}
            rating={(it.item as any).rating}
            title={(it.item as any).title}
            id={(it.item as any).id}
          />
        );
      }}
    />
  );
}

type ListEntryProps = {
  style: any | undefined;
  title: string;
  rating: number;
  id: number;
};

function ListEntry({ style, title, rating, id }: ListEntryProps): ReactNode {
  // top rated has to have a rating above 75%
  const styles = getListEntryStyle(rating > 75);

  return (
    <View style={[styles.root, style]}>
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Rating value={rating} />
    </View>
  );
}

const getListEntryStyle = (isHighlighted: boolean) => {
  return StyleSheet.create({
    root: isHighlighted
      ? {
          padding: 12,
          backgroundColor: 'gold',
        }
      : { padding: 12 },
  });
};
