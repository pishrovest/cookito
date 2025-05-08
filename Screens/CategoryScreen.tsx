import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCategories } from '../utils/database';

const categories = getCategories();

const CategoryCard = ({ category, navigation }) => (
  <TouchableOpacity 
    style={styles.categoryCard}
    onPress={() => navigation.navigate('ProductDetail', { category: category.title })}
  >
    <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
    <View style={styles.categoryInfo}>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <Text style={styles.categoryDescription}>{category.description}</Text>
      <Text style={styles.categoryItems}>{category.items}</Text>
    </View>
  </TouchableOpacity>
);

export default function CategoriesScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>دسته‌بندی‌ها</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>        {categories.map(category => (
          <CategoryCard key={category.id} category={category} navigation={navigation} />
        ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'right',
  },
  scrollContent: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: 150,
  },
  categoryInfo: {
    padding: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'right',
  },
  categoryItems: {
    fontSize: 12,
    color: '#FF6B6B',
    textAlign: 'right',
  },
});