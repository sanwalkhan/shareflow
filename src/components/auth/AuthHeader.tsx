import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// --- Type Definitions ---
// Define a type for your main navigation stack (adjust route names as needed)
type RootStackParamList = {
    Home: undefined; 
    Login: undefined;
    // ... add all your main routes
};
type AuthNavigationProp = NavigationProp<RootStackParamList>;

// Props Interface
interface AuthHeaderProps {
  onBack?: () => void;
  title?: string;
}

// Assuming COLORS and isMobile are correctly imported from your theme file
import { COLORS, isMobile } from "../../constants/theme"; 

// --- Component ---
export default function AuthHeader({ onBack, title = "ShareFlow" }: AuthHeaderProps) {
  const navigation = useNavigation<AuthNavigationProp>();

  const handleBack = () => {
    if (typeof onBack === "function") {
      // 1. Prioritize custom handler
      onBack();
    } else if (navigation.canGoBack()) {
      // 2. Fallback to native navigation back
      navigation.goBack();
    } else {
      // 3. Fallback to a specific route (e.g., 'Home' or 'Login') if at the root of a stack
      // @ts-ignore - Ignore if route definition is incomplete
      navigation.navigate('Home'); 
    }
  };

  const hasBackButton = onBack || navigation.canGoBack();

  return (
    // Conditional padding for responsiveness
    <View style={[styles.headerContainer, isMobile ? styles.paddingMobile : styles.paddingDesktop]}>
      
      <View style={styles.topRow}>
        {/* 1. Minimal Back Button */}
        {hasBackButton && (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            // Add hitSlop for easier tapping on small icons
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} 
          >
            {/* Use system arrow style for maximum clarity */}
            <Feather name="arrow-left" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        )}

        {/* Placeholder View to push the logo to the center when the back button is present */}
        {hasBackButton && <View style={styles.spacer} />} 
        <View style={!hasBackButton && { flex: 1 }} /> {/* Centering logic */}

        {/* 2. Modern Logo/Title - Always Centered */}
        <View style={styles.logoContainer}>
          <View
            style={[
              styles.logoCircle,
              { 
                // Simple, contained accent style
                backgroundColor: COLORS.accent, 
              }
            ]}
          >
            <Feather name="trending-up" size={24} color={COLORS.white} />
          </View>
          <Text style={[styles.logoText, { color: COLORS.textLight }]}>
            {title.slice(0, 5)}
            <Text style={{ color: COLORS.accent }}>{title.slice(5)}</Text>
          </Text>
        </View>

        {/* Spacer View to ensure centering of the logo/title */}
        <View style={styles.spacer} />
      </View>
    </View>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Better handling of iOS status bar
    marginBottom: 30, // Increased spacing for visual breathing room
  },
  paddingMobile: {
    paddingHorizontal: 20,
  },
  paddingDesktop: {
    paddingHorizontal: 40,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative', // Context for absolute positioning if needed, though flex is used here
  },

  // Back Button Styles
  backButton: {
    // Position the back button absolutely on the left for true centering of the logo
    // If you prefer to keep it in the flow (which is simpler for flex), remove this positioning
    position: 'absolute',
    left: 0,
    zIndex: 10,
    padding: 5, // Tappable area
  },

  // Centering Spacer - Equal width to back button to maintain symmetry
  spacer: {
    width: 34, // Approximate width of the button
    height: 1, // Minimal height
  },

  // Logo/Title Styles
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, 
    // This allows the logo container to be naturally centered
    flex: 1, 
    justifyContent: 'center',
  },
  logoCircle: {
    width: 40, // Smaller, less dominant circle
    height: 40,
    borderRadius: 8, // Sharp corners feel more modern than fully rounded
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28, // Slightly smaller and cleaner
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});