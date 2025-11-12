import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Eye, EyeOff, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View className="flex-1 bg-[#E8EDF5]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center px-6 py-12">

          {/* Outer Card */}
          <View
            className="bg-[#E3EDF9] rounded-3xl shadow-2xl p-6"
            style={{ width: 800, height: 860 }}
          >

            {/* Top Bar */}
            <View className="flex-row items-center justify-center mb-6 w-full relative">
              <View className="flex-row items-center">
                <Image
                  source={require('../assets/image.png')}
                  className="w-10 h-10 mr-2"
                  style={{ marginTop: 60 }}
                />
                <Text
                  className="text-2xl font-bold text-gray-800"
                  style={{ marginTop: 60 }}
                >
                  ShareFlow
                </Text>
              </View>

              {/* Back Button */}
              <TouchableOpacity
                className="absolute top-4 left-4 z-10"
                onPress={() => navigation.goBack()}
              >
                <LinearGradient
                  colors={['#2A2F50', '#28A745']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: 183,
                    height: 41,
                    borderRadius: 12.77,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text className="text-white font-bold">← Back To Home</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Inner Card */}
            <View
              className="bg-white rounded-3xl shadow-2xl p-8"
              style={{ width: '90%', alignSelf: 'center', height: 620 }}
            >

              {/* Welcome Text */}
              <Text className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
                Welcome Back
              </Text>
              <Text className="text-base text-gray-500 mb-6 text-center">
                Sign into your ShareFlow account
              </Text>

              {/* Email Field */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </Text>
                <TextInput
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800"
                  placeholder="yourname@work.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Field */}
              <View className="mb-5 relative">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </Text>
                <TextInput
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-800"
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  className="absolute right-4 top-6"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Remember Me */}
              <TouchableOpacity
                className="flex-row items-center mb-6"
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  className={`w-4 h-4 rounded border-2 mr-2 items-center justify-center ${
                    rememberMe
                      ? 'bg-[#34D399] border-[#34D399]'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {rememberMe && (
                    <Text className="text-white text-xs font-bold">✓</Text>
                  )}
                </View>
                <Text className="text-sm text-gray-600">Keep me signed in</Text>
              </TouchableOpacity>

              {/* Sign-In Button */}
              <TouchableOpacity className="rounded-xl py-4 mb-6">
                <LinearGradient
                  colors={['#2A2F50', '#28A745']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: '100%',
                    paddingVertical: 14,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text className="text-white font-bold text-base">
                    Sign Into Dashboard
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Create Account Text */}
              <Text className="text-center text-sm text-gray-500 mb-4">
                Don't have a ShareFlow account?
              </Text>

              {/* Register Button */}
              <TouchableOpacity
                className="mt-2"
                onPress={() => navigation.navigate('Signup')}
              >
                <LinearGradient
                  colors={['#2A2F50', '#28A745']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 px-6 rounded-2xl items-center justify-center shadow-lg"
                >
                  <Text className="text-white font-bold text-base">
                    Create Company Account
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
