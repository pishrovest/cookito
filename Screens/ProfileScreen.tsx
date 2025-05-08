import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuItem = ({ icon, title, subtitle }) => (
  <TouchableOpacity style={styles.menuItem}>
    <MaterialIcons name={icon} size={24} color="#666" />
    <View style={styles.menuItemText}>
      <Text style={styles.menuItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
    </View>
    <MaterialIcons name="chevron-left" size={24} color="#666" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=persian%20person%20portrait%20friendly%20smile&aspect=1:1' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>سارا احمدی</Text>
          <Text style={styles.email}>sara@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>تنظیمات حساب</Text>
          <MenuItem icon="person" title="اطلاعات شخصی" />
          <MenuItem icon="location-on" title="آدرس‌های من" />
          <MenuItem icon="credit-card" title="روش‌های پرداخت" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ترجیحات</Text>
          <MenuItem
            icon="favorite"
            title="علاقه‌مندی‌ها"
            subtitle="شکلات، آجیل، چای"
          />
          <MenuItem
            icon="restaurant"
            title="رژیم غذایی"
            subtitle="بدون قند، کم کالری"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>پشتیبانی</Text>
          <MenuItem icon="help" title="راهنما" />
          <MenuItem icon="chat" title="تماس با ما" />
          <MenuItem icon="info" title="درباره ما" />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>خروج از حساب</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    textAlign: 'right',
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});