import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, shadows } from './theme';

export default function BottomTabBar({ activeTab = 'home' }) {
  const tabs = [
    { key: 'home', icon: 'home', label: 'خانه' },
    { key: 'search', icon: 'search', label: 'جستجو' },
    { key: 'cart', icon: 'shopping-bag', label: 'سبد خرید' },
    { key: 'profile', icon: 'user', label: 'پروفایل' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab,
          ]}
        >
          <Feather
            name={tab.icon}
            size={24}
            color={activeTab === tab.key ? colors.primary : colors.text}
          />
          <Text
            style={[
              styles.label,
              activeTab === tab.key && styles.activeLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...shadows.medium,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    transform: [{scale: 1.1}],
  },
  label: {
    ...typography.bodySmall,
    color: colors.text,
    marginTop: 4,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});