import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const offers = [
  {
    id: '1',
    title: 'تخفیف ویژه عید',
    discount: '۳۰٪',
    description: 'تخفیف ویژه روی تمام شیرینی‌های سنتی',
    validUntil: '۱۴۰۴/۰۱/۳۱',
    imageUrl: 'https://api.a0.dev/assets/image?text=persian%20sweets%20variety%20festive%20display&aspect=16:9',
  },
  {
    id: '2',
    title: 'پیشنهاد هفته',
    discount: '۲۰٪',
    description: 'تخفیف روی نوشیدنی‌های گرم',
    validUntil: '۱۴۰۴/۰۱/۲۵',
    imageUrl: 'https://api.a0.dev/assets/image?text=hot%20drinks%20coffee%20tea%20special%20offer&aspect=16:9',
  },
  {
    id: '3',
    title: 'خرید اول',
    discount: '۱۵٪',
    description: 'تخفیف برای اولین خرید شما',
    validUntil: '۱۴۰۴/۰۲/۳۱',
    imageUrl: 'https://api.a0.dev/assets/image?text=first%20purchase%20special%20desserts%20display&aspect=16:9',
  },
];

const OfferCard = ({ offer }) => (
  <TouchableOpacity style={styles.offerCard}>
    <Image source={{ uri: offer.imageUrl }} style={styles.offerImage} />
    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>{offer.discount}</Text>
      <Text style={styles.discountLabel}>تخفیف</Text>
    </View>
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle}>{offer.title}</Text>
      <Text style={styles.offerDescription}>{offer.description}</Text>
      <Text style={styles.offerValidity}>اعتبار تا: {offer.validUntil}</Text>
      <TouchableOpacity style={styles.useOfferButton}>
        <Text style={styles.useOfferButtonText}>استفاده از تخفیف</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default function OffersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>تخفیف‌های ویژه</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {offers.map(offer => (
          <OfferCard key={offer.id} offer={offer} />
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
  offerCard: {
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
  offerImage: {
    width: '100%',
    height: 200,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  discountText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  discountLabel: {
    color: '#fff',
    fontSize: 12,
  },
  offerInfo: {
    padding: 16,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'right',
  },
  offerValidity: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
    textAlign: 'right',
  },
  useOfferButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  useOfferButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});