import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchProducts, createProduct, updateProduct, deleteProduct, uploadProductImage } from '../utils/supabaseClient';
import * as ImagePicker from 'expo-image-picker';

export default function AdminProductManagement({ navigation, route }) {  const { category } = route.params;
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [''],
    price: '',
    flavor: '',
    calories: '',
    category: category
  });  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data.filter(p => p.category === category));
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('خطا', 'خطا در بارگذاری محصولات');
    } finally {
      setLoading(false);
    }
  };  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setUploading(true);
        // Upload image to Supabase storage
        const imageUrl = await uploadProductImage(result.assets[0].uri);
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, imageUrl].filter(Boolean)
        }));
        
        Alert.alert('موفق', 'تصویر با موفقیت آپلود شد');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('خطا', 'خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };  const handleSubmit = async () => {
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        images: formData.images.filter(img => img), // Remove empty strings
        price: Number(formData.price),
        flavor: formData.flavor,
        calories: Number(formData.calories),
        category_id: formData.category,
        in_stock: true
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        Alert.alert('موفق', 'محصول با موفقیت بروزرسانی شد');
      } else {
        await createProduct(productData);
        Alert.alert('موفق', 'محصول با موفقیت اضافه شد');
      }

      await loadProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('خطا', 'خطا در ذخیره محصول');
      return;
    }
    setFormData({
      name: '',
      description: '',
      images: [''],
      price: '',
      flavor: '',
      calories: '',
      category: ''
    });
    setIsAddingProduct(false);
  };  const handleDelete = async (productId) => {
    Alert.alert(
      'تایید حذف',
      'آیا از حذف این محصول اطمینان دارید؟',
      [
        {
          text: 'خیر',
          style: 'cancel'
        },
        {
          text: 'بله',          onPress: async () => {
            try {
              await deleteProduct(productId);
              await loadProducts();
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('خطا', 'خطا در حذف محصول');
            }
          }
        }
      ]
    );
  };

  const ProductForm = () => (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="نام محصول"
        value={formData.name}
        onChangeText={(text) => setFormData({...formData, name: text})}
        textAlign="right"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="توضیحات"
        value={formData.description}
        onChangeText={(text) => setFormData({...formData, description: text})}
        multiline
        textAlign="right"
      />      <View style={styles.imageUploadContainer}>
        <ScrollView horizontal>
          {formData.images.map((image, index) => (
            <View key={index} style={styles.imagePreview}>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <TouchableOpacity 
                style={styles.removeImageBtn}
                onPress={() => {
                  setFormData(prev => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index)
                  }));
                }}
              >
                <MaterialIcons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleImagePick}
          disabled={uploading}
        >
          <MaterialIcons name="add-photo-alternate" size={24} color="#fff" />
          <Text style={styles.uploadButtonText}>
            {uploading ? 'در حال آپلود...' : 'افزودن تصویر'}
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="قیمت (تومان)"
        value={formData.price}
        onChangeText={(text) => setFormData({...formData, price: text})}
        keyboardType="numeric"
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder="طعم"
        value={formData.flavor}
        onChangeText={(text) => setFormData({...formData, flavor: text})}
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder="کالری"
        value={formData.calories}
        onChangeText={(text) => setFormData({...formData, calories: text})}
        keyboardType="numeric"
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder="دسته‌بندی"
        value={formData.category}
        onChangeText={(text) => setFormData({...formData, category: text})}
        textAlign="right"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          {editingProduct ? 'ویرایش محصول' : 'افزودن محصول'}
        </Text>
      </TouchableOpacity>
    </View>
  );  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>مدیریت {category}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddingProduct(!isAddingProduct)}
          >
            <MaterialIcons name={isAddingProduct ? 'close' : 'add'} size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {isAddingProduct && <ProductForm />}

        <View style={styles.productsList}>          {products.filter(product => product.category === category).map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.images[0] }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price.toLocaleString()} تومان</Text>
              </View>
              <View style={styles.productActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => {
                    setFormData(product);
                    setEditingProduct(product);
                    setIsAddingProduct(true);
                  }}
                >
                  <MaterialIcons name="edit" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(product.id)}
                >
                  <MaterialIcons name="delete" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageUploadContainer: {
    marginBottom: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeImageBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#4ECDC4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  uploadButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 16,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  productsList: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
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
  productImage: {
    width: 80,
    height: 80,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'right',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  productActions: {
    flexDirection: 'row',
    padding: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: '#4ECDC4',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
  },
});