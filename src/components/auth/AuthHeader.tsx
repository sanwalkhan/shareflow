import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";

// --- Type Definitions ---
type RootStackParamList = {
    Home: undefined; 
    Login: undefined;
    Landing: undefined;
    Signin: undefined;
    Auth: undefined;
};
type AuthNavigationProp = NavigationProp<RootStackParamList>;

// Props Interface
interface AuthHeaderProps {
  onBack?: () => void;
  title?: string;
}

// --- Component ---
export default function AuthHeader({ onBack, title = "ShareFlow" }: AuthHeaderProps) {
  const navigation = useNavigation<AuthNavigationProp>();

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Landing' as never);
    }
  };

  const hasBackButton = onBack || navigation.canGoBack();

  return (
    <View className="pt-6 pb-2 px-5">
      <View className="flex-row items-center justify-between">
        {/* Back Button */}
        {hasBackButton && (
          <TouchableOpacity
            onPress={handleBack}
            className="w-10 h-10 justify-center items-center"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="arrow-left" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        )}

        {/* Logo/Title - Centered */}
        <View className={`flex-1 flex-row items-center justify-center ${hasBackButton ? 'ml-[-40px]' : ''}`}>
          <View 
            className="w-10 h-10 rounded-lg justify-center items-center mr-3"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Feather name="trending-up" size={20} color={COLORS.white} />
          </View>
          <Text className="text-white text-2xl font-bold">
            {title.slice(0, 5)}
            <Text style={{ color: COLORS.accent }}>{title.slice(5)}</Text>
          </Text>
        </View>

        {/* Spacer to balance the back button */}
        {hasBackButton && <View className="w-10" />}
      </View>
    </View>
  );
}