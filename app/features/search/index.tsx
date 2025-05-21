import React, { ReactNode, useRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import { inputValue$, suggestions$ } from './state';
import { useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';

export type SearchProps = {
  style?: StyleProp<ViewStyle>;
};

export function Search({ style }: SearchProps): ReactNode {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useAtom(inputValue$);
  const suggestions = useAtomValue(loadable(suggestions$));

  const [isDropDownVisible, setDropdownVisible] = useState(true);

  const onOptionPress = (option: string) => {
    setInputValue(option);
    setDropdownVisible(false);
  };

  const handleSearch = () => {};

  return (
    <View style={[searchStyles.root, style]}>
      <TextInput
        ref={inputRef}
        style={searchStyles.input}
        placeholder="type to search..."
        onChangeText={setInputValue}
        value={inputValue}
      />

      {inputValue && suggestions.state === 'hasData' && suggestions.data && (
        <View
          style={[
            searchStyles.suggestions,
            { display: isDropDownVisible ? 'flex' : 'none' },
          ]}
        >
          {suggestions.data.map((it, index) => (
            <View key={index} style={searchStyles.suggestionEntry}>
              <TouchableOpacity onPress={() => onOptionPress(it.title)}>
                <Text>{it.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={searchStyles.searchButton}
        onPress={handleSearch}
      >
        <Text style={searchStyles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const searchStyles = StyleSheet.create({
  root: {},

  input: {
    height: 40,
    borderColor: 'black',
    backgroundColor: 'lavender',
    borderWidth: 2,
    paddingLeft: 12,
    borderRadius: 10,
  },

  suggestions: {
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'relative',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    paddingLeft: 12,
  },

  suggestionEntry: {},

  searchButton: {
    backgroundColor: '#007BFF',
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
