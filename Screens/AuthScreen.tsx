import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);  const handleAuth = () => {
    if (isLogin) {
      // Check credentials
      if (email === 'admin@cookito.com' && password === 'admin123') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdminProfile' }],
        });
      } else if (email === 'client@cookito.com' && password === 'client123') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      } else {
        Alert.alert(
          'خطا',
          'ایمیل یا رمز عبور اشتباه است',
          [{ text: 'باشه', style: 'default' }]
        );
      }
    } else {
      // For demo purposes, simulate successful registration
      Alert.alert(
        'موفقیت',
        'ثبت نام شما با موفقیت انجام شد',
        [
          {
            text: 'ورود',
            onPress: () => {
              setEmail('');
              setPassword('');
              setName('');
              setIsLogin(true);
            }
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://api.a0.dev/assets/image?text=persian%20cookie%20logo%20warm%20colors&aspect=1:1' }}
              style={styles.logo}
            />
            <Text style={styles.title}>کوکیتو</Text>
            <Text style={styles.subtitle}>
              {isLogin ? 'خوش آمدید' : 'ثبت نام کنید'}
            </Text>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="نام کامل"
                  value={name}
                  onChangeText={setName}
                  textAlign="right"
                />
                <MaterialIcons name="person" size={24} color="#666" style={styles.inputIcon} />
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ایمیل"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                textAlign="right"
              />
              <MaterialIcons name="email" size={24} color="#666" style={styles.inputIcon} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="رمز عبور"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textAlign="right"
              />
              <MaterialIcons name="lock" size={24} color="#666" style={styles.inputIcon} />
            </View>

            <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
              <Text style={styles.authButtonText}>
                {isLogin ? 'ورود' : 'ثبت نام'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchButtonText}>
                {isLogin ? 'حساب کاربری ندارید؟ ثبت نام کنید' : 'حساب کاربری دارید؟ وارد شوید'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  inputIcon: {
    marginLeft: 12,
  },
  authButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
});