import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, shadows } from './theme';

export default function SearchBar({ placeholder = 'جستجو...' }) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color={colors.text} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={colors.text + '80'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    ...shadows.small,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
});