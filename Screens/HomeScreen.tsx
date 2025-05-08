import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProducts, getCategories } from '../utils/database';
import { useNavigation } from '@react-navigation/native';

const FeaturedItem = ({ id, imageUrl, title, price, navigation }) => (
  <TouchableOpacity 
    style={styles.featuredItem}
    onPress={() => navigation.navigate('ProductDetail', { productId: id })}
  >
    <Image source={{ uri: imageUrl }} style={styles.featuredImage} />
    <Text style={styles.featuredTitle}>{title}</Text>
    <Text style={styles.featuredPrice}>{price} تومان</Text>
  </TouchableOpacity>
);

const CategoryCard = ({ title, imageUrl, navigation }) => (
  <TouchableOpacity 
    style={styles.categoryCard}
    onPress={() => navigation.navigate('Categories', { selectedCategory: title })}
  >
    <Image source={{ uri: imageUrl }} style={styles.categoryImage} />
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const navigation = useNavigation();  const { products, categories } = React.useMemo(() => {
    return {
      products: getProducts(),
      categories: getCategories()
    };
  }, []);

  const featuredItems = React.useMemo(() => {
    return products.slice(0, 3);
  }, [products]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>کوکیتو</Text>        {/* headerIcons removed as Orders button is no longer shown */}
        </View>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="جستجوی محصولات..."
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>پیشنهادات ویژه</Text>          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredItems.map((item) => (
              <FeaturedItem key={item.id} {...item} navigation={navigation} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>دسته‌بندی‌ها</Text>
          <View style={styles.categoriesGrid}>            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} navigation={navigation} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  cartButton: {
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  featuredSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  featuredItem: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    textAlign: 'right',
  },
  featuredPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    paddingHorizontal: 8,
    paddingBottom: 8,
    textAlign: 'right',
  },
  categoriesSection: {
    padding: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 12,
    textAlign: 'right',
  },
});