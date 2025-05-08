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

export default function AdminProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=persian%20admin%20portrait%20professional&aspect=1:1' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>مدیر سیستم</Text>
          <Text style={styles.email}>admin@cookito.com</Text>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>ادمین</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>مدیریت محصولات</Text>          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('AdminProductManagement', { category: 'شیرینی‌های سنتی' })}
          >
            <MaterialIcons name="cake" size={24} color="#666" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>مدیریت محصولات</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('AdminProductManagement', { category: 'نوشیدنی‌ها' })}
          >
            <MaterialIcons name="local-drink" size={24} color="#666" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>مدیریت نوشیدنی‌ها</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('AdminProductManagement', { category: 'تنقلات رژیمی' })}
          >
            <MaterialIcons name="restaurant" size={24} color="#666" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>مدیریت تنقلات رژیمی</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>          <Text style={styles.sectionTitle}>مدیریت سفارش‌ها</Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('OrderManagement')}
          >
            <MaterialIcons name="shopping-cart" size={24} color="#666" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>مدیریت سفارش‌ها</Text>
              <Text style={styles.menuItemSubtitle}>مشاهده و مدیریت همه سفارش‌ها</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color="#666" />
          </TouchableOpacity>
        </View>          <View style={styles.section}>
            <Text style={styles.sectionTitle}>مدیریت کاربران</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserList')} style={styles.menuItem}>
              <MaterialIcons name="people" size={24} color="#666" />
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>لیست کاربران</Text>
              </View>
              <MaterialIcons name="chevron-left" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddUser')} style={styles.menuItem}>
              <MaterialIcons name="person-add" size={24} color="#666" />
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>افزودن کاربر جدید</Text>
              </View>
              <MaterialIcons name="chevron-left" size={24} color="#666" />
            </TouchableOpacity>
          </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.replace('Auth')}
        >
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
    marginBottom: 10,
  },
  adminBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adminBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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