import React, { useState } from "react";
import { View, ScrollView, Text, Dimensions, TextInput, TouchableOpacity, Alert } from "react-native";

// HRPanel Components
import Header2 from "./Header2";
import Sidebar2 from "./Sidebar2";

const { width } = Dimensions.get("window");

const ContactDetails2: React.FC = () => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    // Simple validation
    if (!name || !email || !phone || !address) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // For now, just log the data
    console.log({ name, email, phone, address });
    Alert.alert("Success", "Contact details submitted!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      {/* Header */}
      <Header2 />

      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Sidebar only on large screens */}
        {width >= 768 && <Sidebar2 />}

        {/* Main content */}
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            Contact Details
          </Text>

          {/* Profile Section */}
      

          {/* Contact Form */}
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Name</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
                backgroundColor: "#fff"
              }}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Email</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
                backgroundColor: "#fff"
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Phone</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
                backgroundColor: "#fff"
              }}
              placeholder="Enter your phone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Address</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
                backgroundColor: "#fff"
              }}
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: "#4CAF50",
                padding: 14,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 8
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactDetails2;
