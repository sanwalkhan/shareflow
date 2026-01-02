import React from 'react';
import { View, Text, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { COLORS } from "../../Constants/theme";
const Footer: React.FC = () => {
  const { width: sw } = useWindowDimensions();
  const isDesktop = sw >= 1200;
  const isTablet = sw >= 768 && sw < 1200;
 
  // Widths dynamically based on screen
  const logoWidth = isDesktop ? '30%' : isTablet ? '45%' : '100%';
  const sectionWidth = isDesktop ? '15%' : isTablet ? '30%' : '100%';
  const stayWidth = isDesktop ? '15%' : isTablet ? '30%' : '100%';
 
  return (
   <View
  style={{
    backgroundColor: COLORS.heroBackground, // theme color
    paddingHorizontal: isDesktop ? 80 : isTablet ? 40 : 16,
    paddingVertical: 40,
  }}
>
      {/* Top section */}
      <View
        style={{
          flexDirection: isDesktop || isTablet ? 'row' : 'column',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Logo & Social */}
        <View style={{ width: logoWidth, marginBottom: 24 }}>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
            Nexcent
          </Text>
          <Text style={{ color: '#ffffff', fontSize: 12, marginBottom: 12 }}>
            Copyright © 2020 Lanthy UK Ltd.{"\n"}All rights reserved
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <FontAwesome name="facebook" size={20} color="#ffffff" />
            <FontAwesome name="twitter" size={20} color="#ffffff" />
            <FontAwesome name="instagram" size={20} color="#ffffff" />
            <Entypo name="youtube" size={20} color="#ffffff" />
          </View>
        </View>
 
        {/* Company */}
        <View style={{ width: sectionWidth, marginBottom: 24 }}>
          <Text style={{ color: '#ffffff', fontWeight: '600', marginBottom: 8 }}>Company</Text>
          {['About us', 'Blog', 'Contact us', 'Pricing', 'Testimonials'].map((item, i) => (
            <Text key={i} style={{ color: '#ffffff', marginBottom: 4 }}>{item}</Text>
          ))}
        </View>
 
        {/* Support */}
        <View style={{ width: sectionWidth, marginBottom: 24 }}>
          <Text style={{ color: '#ffffff', fontWeight: '600', marginBottom: 8 }}>Support</Text>
          {['Help center', 'Terms of service', 'Legal', 'Privacy policy', 'Status'].map((item, i) => (
            <Text key={i} style={{ color: '#ffffff', marginBottom: 4 }}>{item}</Text>
          ))}
        </View>
 
        {/* Stay up to date */}
        <View style={{ width: stayWidth, marginBottom: 24 }}>
          <Text style={{ color: '#ffffff', fontWeight: '600', marginBottom: 8 }}>Stay up to date</Text>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 999,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#ffffff',
              alignItems: 'center',
            }}
          >
            <TextInput
              placeholder="Your email address"
              placeholderTextColor="#ffffff99"
              style={{
                flex: 1,
                paddingHorizontal: 12,
                paddingVertical: 10,
                color: '#ffffff',
              }}
            />
            <TouchableOpacity
  style={{
    backgroundColor: COLORS.button, // theme yellow
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  }}
>
  <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>→</Text>
</TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
 
export default Footer;