import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { getProduct } from '../utils/database';
import { useCart } from '../utils/CartContext';
import { Alert } from 'react-native';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const product = getProduct(productId);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>محصول یافت نشد</Text>
      </SafeAreaView>
    );
  }  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <View style={styles.backHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {product.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()} تومان</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MaterialIcons name="local-fire-department" size={24} color="#FF6B6B" />
              <Text style={styles.infoText}>{product.calories} کالری</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="restaurant" size={24} color="#FF6B6B" />
              <Text style={styles.infoText}>{product.flavor}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>توضیحات</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            addToCart(product, 1);
            Alert.alert(
              'افزوده شد',
              'محصول به سبد خرید اضافه شد',
              [
                { text: 'ادامه خرید', style: 'cancel' },
                { text: 'مشاهده سبد خرید', onPress: () => navigation.navigate('Cart') },
              ]
            );
          }}
        >
          <MaterialIcons name="shopping-cart" size={24} color="#fff" />
          <Text style={styles.addToCartText}>افزودن به سبد خرید</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backHeader: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  price: {
    fontSize: 20,
    color: '#FF6B6B',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'right',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'right',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
});