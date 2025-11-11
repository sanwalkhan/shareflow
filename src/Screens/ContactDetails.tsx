import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // adjust path if needed

type ContactDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ContactDetails'>;

const ContactDetails: React.FC = () => {
  const navigation = useNavigation<ContactDetailsNavigationProp>();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    console.log({
      companyName,
      contactPerson,
      email,
      phone,
    });
    alert('Contact details submitted!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#fff" size={20} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Contact Details</Text>
        <Text style={styles.subtitle}>Enter your company information</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company Name*</Text>
            <TextInput
              style={styles.input}
              placeholder="Your company name"
              value={companyName}
              onChangeText={setCompanyName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Person*</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={contactPerson}
              onChangeText={setContactPerson}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email*</Text>
            <TextInput
              style={styles.input}
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone*</Text>
            <TextInput
              style={styles.input}
              placeholder="+1234567890"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3EDF9' },
  scrollContent: { padding: 20, paddingTop: 40 },
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
  title: { fontSize: 28, fontWeight: '700', marginBottom: 6, color: '#000' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#2d5a3d',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
