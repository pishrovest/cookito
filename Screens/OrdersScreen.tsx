import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const orders = [
  {
    id: '1',
    date: '۱۴۰۴/۰۱/۱۸',
    items: ['شیرینی خانگی', 'قهوه ترک'],
    total: '۱۷.۹۸',
    status: 'در حال تحویل',
    imageUrl: 'https://api.a0.dev/assets/image?text=homemade%20persian%20sweets%20and%20coffee&aspect=1:1',
  },
  {
    id: '2',
    date: '۱۴۰۴/۰۱/۱۷',
    items: ['کیک شکلاتی', 'چای'],
    total: '۲۹.۹۸',
    status: 'تحویل شده',
    imageUrl: 'https://api.a0.dev/assets/image?text=chocolate%20cake%20and%20persian%20tea&aspect=1:1',
  },
];

const OrderCard = ({ order }) => (
  <View style={styles.orderCard}>
    <Image source={{ uri: order.imageUrl }} style={styles.orderImage} />
    <View style={styles.orderDetails}>
      <Text style={styles.orderDate}>{order.date}</Text>
      <Text style={styles.orderItems}>{order.items.join(' ، ')}</Text>
      <Text style={styles.orderTotal}>مجموع: ${order.total}</Text>
      <View style={[
        styles.statusBadge,
        { backgroundColor: order.status === 'تحویل شده' ? '#4CAF50' : '#FF9800' }
      ]}>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>
    </View>
  </View>
);

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>سفارش‌های من</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 16,
  },
  orderCard: {
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
  orderImage: {
    width: 100,
    height: 100,
  },
  orderDetails: {
    flex: 1,
    padding: 12,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  orderItems: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
    textAlign: 'right',
  },
  orderTotal: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
    textAlign: 'right',
  },
  statusBadge: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});