// Footer.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const Footer: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: '#001867ff', // dark blue background
        paddingHorizontal: 24,
        paddingVertical: 40, // more space on top
      }}
    >
      {/* Top section */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>
        {/* Logo & Social */}
        <View style={{ width: '45%', marginBottom: 16 }}>
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
        <View style={{ width: '20%', marginBottom: 16 }}>
          <Text style={{ color: '#ffffff', fontWeight: '600', marginBottom: 8 }}>Company</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>About us</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Blog</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Contact us</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Pricing</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Testimonials</Text>
        </View>

        {/* Support */}
        <View style={{ width: '20%', marginBottom: 16 }}>
          <Text style={{ color: '#ffffff', fontWeight: '600', marginBottom: 8 }}>Support</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Help center</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Terms of service</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Legal</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Privacy policy</Text>
          <Text style={{ color: '#ffffff', marginBottom: 4 }}>Status</Text>
        </View>

        {/* Stay up to date */}
        <View style={{ width: '15%', marginBottom: 16 }}>
          <Text style={{ color: '#ffffff', fontWeight: '600', marginBottom: 8 }}>Stay up to date</Text>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 999,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#ffffff',
              alignItems: 'center', // keep button aligned with input
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
                backgroundColor: '#FFC20E', // yellow button
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 16,
                height: '100%', // make button same height as input
              }}
            >
              <Text style={{ color: '#001867ff', fontWeight: 'bold', fontSize: 16 }}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer;
