// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../../App';

// type ContactDetailsScreenProp = NativeStackNavigationProp<RootStackParamList, 'ContactDetails'>;

// const ContactDetails: React.FC = () => {
//   const navigation = useNavigation<ContactDetailsScreenProp>();

//   // Form state
//   const [businessEmail, setBusinessEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [streetAddress, setStreetAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [country, setCountry] = useState('');
//   const [postalCode, setPostalCode] = useState('');

//   const handlePrevious = () => {
//     navigation.goBack();
//   };

//   const handleComplete = () => {
//     console.log('Form submitted:', {
//       businessEmail,
//       phoneNumber,
//       streetAddress,
//       city,
//       country,
//       postalCode,
//     });
//     // Yahan aap next step ya success screen navigate kar sakte ho
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Welcome!</Text>
//       <Text style={styles.subtitle}>Please enter your contact details</Text>

//       <View style={styles.form}>
//         <Text style={styles.label}>Business Email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="example@company.com"
//           value={businessEmail}
//           onChangeText={setBusinessEmail}
//           keyboardType="email-address"
//         />

//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="+92 300 1234567"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           keyboardType="phone-pad"
//         />

//         <Text style={styles.label}>Street Address</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="123 Main Street"
//           value={streetAddress}
//           onChangeText={setStreetAddress}
//         />

//         <Text style={styles.label}>City</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Karachi"
//           value={city}
//           onChangeText={setCity}
//         />

//         <Text style={styles.label}>Country</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Pakistan"
//           value={country}
//           onChangeText={setCountry}
//         />

//         <Text style={styles.label}>Postal Code</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="12345"
//           value={postalCode}
//           onChangeText={setPostalCode}
//           keyboardType="numeric"
//         />
//       </View>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
//           <Text style={styles.buttonText}>Previous</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
//           <Text style={styles.buttonText}>Complete</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.footerText}>
//         Already have an account? <Text style={styles.signInText}>Sign in</Text>
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 40,
//     flexGrow: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   title: { fontSize: 28, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
//   subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
//   form: { width: '100%', marginBottom: 30 },
//   label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
//   input: {
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderRadius: 10,
//     marginBottom: 16,
//     fontSize: 15,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 20,
//   },
//   prevButton: {
//     flex: 1,
//     backgroundColor: '#aaa',
//     paddingVertical: 16,
//     borderRadius: 10,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   completeButton: {
//     flex: 1,
//     backgroundColor: '#2d5a3d',
//     paddingVertical: 16,
//     borderRadius: 10,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
//   footerText: { fontSize: 13, color: '#666', textAlign: 'center' },
//   signInText: { color: '#2d5a3d', fontWeight: '600' },
// });

// export default ContactDetails;
