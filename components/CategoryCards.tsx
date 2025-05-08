import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, shadows, typography } from './theme';

type CategoryCardProps = {
  title: string;
  image: string;
  onPress: () => void;
};

export default function CategoryCard({ title, image, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    height: 160,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
  },
  title: {
    ...typography.bodyLarge,
    color: 'white',
    textAlign: 'center',
  },
});