import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/Appnavigator';

type AdminRoute = 'Shareholder' | 'Expenses';

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  activeRoute: AdminRoute;
  children: ReactNode;
}

const sidebarNav: Array<{ label: string; icon: keyof typeof Ionicons.glyphMap; route: AdminRoute }> = [
  { label: 'Shareholder', icon: 'person-outline', route: 'Shareholder' },
  { label: 'Expenses', icon: 'wallet-outline', route: 'Expenses' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  subtitle,
  activeRoute,
  children,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const isCompact = width < 900;

  const renderNavButton = (route: AdminRoute, label: string, icon: keyof typeof Ionicons.glyphMap) => (
    <TouchableOpacity
      key={route}
      className={`flex-row items-center rounded-2xl px-4 py-3 ${
        route === activeRoute ? 'bg-white/15' : 'bg-transparent'
      }`}
      onPress={() => navigation.navigate(route)}
    >
      <Ionicons name={icon} size={20} color="#ffffff" />
      <Text className="ml-3 text-base font-medium text-white">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 flex-row">
        {!isCompact && (
          <LinearGradient
            colors={['#2A2F50', '#28A745']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ width: 260 }}
          >
            <View className="h-full px-5 py-8 space-y-8">
              <View className="flex-row items-center">
                <Image
                  source={require('../../assets/image.png')}
                  className="h-10 w-10 rounded-lg"
                />
                <Text className="ml-3 text-2xl font-semibold text-white">
                  ShareFlow
                </Text>
              </View>

              <View className="space-y-2">
                {sidebarNav.map((item) =>
                  renderNavButton(item.route, item.label, item.icon),
                )}
              </View>
            </View>
          </LinearGradient>
        )}

        <View className="flex-1 bg-[#F5F5F5]">
          <View className="px-5 py-4 bg-[#F5F5F5] shadow-sm">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-semibold text-[#111827]">
                  {title}
                </Text>
                {subtitle ? (
                  <Text className="text-sm text-gray-500">{subtitle}</Text>
                ) : null}
              </View>

              <View className="flex-row items-center gap-3">
                <TouchableOpacity className="flex-row items-center rounded-2xl bg-white px-3 py-2">
                  <Ionicons name="search-outline" size={18} color="#6B7280" />
                  {!isCompact && (
                    <Text className="ml-2 text-sm font-medium text-gray-600">
                      Search
                    </Text>
                  )}
                </TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color="#6B7280" />
              </View>
            </View>

            {isCompact && (
              <View className="mt-4 flex-row gap-3">
                {sidebarNav.map((item) => (
                  <TouchableOpacity
                    key={item.route}
                    className={`flex-1 items-center rounded-2xl border px-3 py-2 ${
                      item.route === activeRoute
                        ? 'border-[#2A2F50] bg-white'
                        : 'border-transparent bg-white/60'
                    }`}
                    onPress={() => navigation.navigate(item.route)}
                  >
                    <Text className="text-sm font-semibold text-[#1F2937]">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View className="flex-1 px-5 py-6">{children}</View>
        </View>
      </View>
    </View>
  );
};

export default AdminLayout;

