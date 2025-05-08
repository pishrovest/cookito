import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, shadows } from './theme';

type FeaturedItemProps = {
  title: string;
  price: string;
  image: string;
  description: string;
  onPress: () => void;
};

export default function FeaturedItem({ title, price, image, description, onPress }: FeaturedItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <Text style={styles.price}>{price} تومان</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    marginRight: 16,
    ...shadows.medium,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 12,
  },
  title: {
    ...typography.titleSmall,
    color: colors.text,
    marginBottom: 4,
    textAlign: 'right',
  },
  description: {
    ...typography.bodySmall,
    color: colors.text + '80',
    marginBottom: 8,
    textAlign: 'right',
  },
  price: {
    ...typography.bodyMedium,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'right',
  },
});