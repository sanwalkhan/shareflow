import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { ArrowLeft, Lock, Eye, EyeOff, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // adjust the path if needed

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => console.log('Login pressed');
  const handleCreateAccount = () => navigation.navigate('ContactDetails');
  const handleBackToHome = () => console.log('Back to home pressed');
  const handleClose = () => console.log('Close pressed');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.outerCard}>
          {/* Top Left Back */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToHome}
          >
            <ArrowLeft color="#fff" size={20} />
            <Text style={styles.backButtonText}>Back To Home</Text>
          </TouchableOpacity>

          {/* Centered Logo */}
          <View style={styles.outerCenter}>
            <View style={styles.logoWithImage}>
              <View
                style={{
                  width: 149,
                  height: 117,
                  marginTop: -15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Bold',
                    fontSize: 39.57,
                    color: '#000',
                    opacity: 1,
                    textAlign: 'center',
                  }}
                >
                  Share
                  <Text
                    style={{
                      fontFamily: 'Bold',
                      fontSize: 39.57,
                      color: '#4CAF50',
                      opacity: 1,
                    }}
                  >
                    Flow
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Inner Card */}
          <View style={styles.card}>
            <View style={styles.innerTopRow}>
              <TouchableOpacity style={styles.signInBadge}>
                <Lock color="#fff" size={14} />
                <Text style={styles.signInBadgeText}>SECURE SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClose}>
                <X color="#4CAF50" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSubtitle}>
                Sign into your ShareFlow Enterprise account
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Work Email*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="testuser@example.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password*</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="••••••••••"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff color="#666" size={20} />
                    ) : (
                      <Eye color="#666" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  />
                  <Text style={styles.rememberMeText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Lock color="#fff" size={18} />
                <Text style={styles.loginButtonText}>Sign Into Dashboard</Text>
              </TouchableOpacity>

              <Text style={styles.dividerText}>
                Don't have an enterprise account?
              </Text>

              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={handleCreateAccount}
              >
                <Lock color="#333" size={18} />
                <Text style={styles.createAccountButtonText}>
                  Create Company Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, padding: 20, paddingTop: 20 },
  outerCard: {
    backgroundColor: '#E3EDF9',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
    maxWidth: 774,
    width: '100%',
    alignSelf: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d5a3d',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: { color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' },
  outerCenter: { alignItems: 'center', marginBottom: 20 },
  logoWithImage: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 28 },
  innerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d5a3d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  signInBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600', letterSpacing: 0.5 },
  welcomeContainer: { marginBottom: 30 },
  welcomeTitle: { fontSize: 24, fontWeight: '700', color: '#000', marginBottom: 6 },
  welcomeSubtitle: { fontSize: 14, color: '#666' },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#333' },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordInput: { flex: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#333' },
  eyeIcon: { paddingHorizontal: 16 },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rememberMeContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkbox: { width: 16, height: 16, borderRadius: 3, borderWidth: 2, borderColor: '#ccc' },
  checkboxChecked: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  rememberMeText: { fontSize: 13, color: '#666' },
  forgotPassword: { fontSize: 13, color: '#666' },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d5a3d',
    paddingVertical: 16,
    borderRadius: 10,
    gap: 10,
    marginTop: 10,
  },
  loginButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  dividerText: { textAlign: 'center', fontSize: 13, color: '#666', marginVertical: 10 },
  createAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8eef5',
    paddingVertical: 16,
    borderRadius: 10,
    gap: 10,
  },
  createAccountButtonText: { color: '#333', fontSize: 15, fontWeight: '600' },
});
