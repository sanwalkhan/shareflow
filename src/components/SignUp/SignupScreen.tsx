import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Outer Card */}
          <View
            className="bg-[#E3EDF9] rounded-3xl shadow-2xl p-4"
            style={{ width: 800, height: 1050 }}
          >
            {/* Top Bar */}
            <View className="flex-row items-center justify-center mb-6 w-full relative">
              <View className="flex-row items-center">
               <Image
  source={require('../../assets/image.png')}
  className="w-10 h-10 mr-2"
  style={{ marginTop: 60 }}
/>

                <Text className="text-2xl font-bold text-gray-800" style={{ marginTop: 60 }}>
                  ShareFlow
                </Text>
              </View>

              {/* Back Button */}
              <TouchableOpacity
                className="absolute top-4 left-4 z-10"
                onPress={() => navigation.goBack()}
              >
                <LinearGradient
                  colors={["#2A2F50", "#28A745"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: 183,
                    height: 41,
                    borderRadius: 12.77,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text className="text-white font-bold">← Back To Home</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Inner Card */}
            <View className="bg-white rounded-3xl shadow-2xl p-6" style={{ alignSelf: "center", width: "90%" }}>
              
             {/* Progress Stepper */}
<View className="flex-row items-center justify-between mb-6 w-full px-4">
  {/* Step 1 - Active */}
  <View className="items-center">
    <LinearGradient
      colors={["#2A2F50", "#28A745"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-white font-bold text-lg">1</Text>
    </LinearGradient>
  </View>

  {/* Line 1 - Active */}
  <View
    style={{
      width: 100,
      height: 2,
      backgroundColor: "#2A2F50", // optional: active line color
      marginTop: 19,
    }}
  />

  {/* Step 2 - Inactive */}
  <View className="items-center">
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#9CA3AF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-gray-500 font-bold text-lg">2</Text>
    </View>
  </View>

  {/* Line 2 - Inactive */}
  <View
    style={{
      width: 100,
      height: 2,
      backgroundColor: "#9CA3AF",
      marginTop: 19,
    }}
  />

  {/* Step 3 - Inactive */}
  <View className="items-center">
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#9CA3AF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-gray-500 font-bold text-lg">3</Text>
    </View>
  </View>

  {/* Line 3 - Inactive */}
  <View
    style={{
      width: 100,
      height: 2,
      backgroundColor: "#9CA3AF",
      marginTop: 19,
    }}
  />

  {/* Step 4 - Inactive */}
  <View className="items-center">
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#9CA3AF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-gray-500 font-bold text-lg">4</Text>
    </View>
  </View>
</View>


              {/* Heading */}
              <Text className="text-xl font-bold mb-2 text-center text-gray-800">
                Contact Details
              </Text>
              <Text className="text-sm text-gray-500 mb-6 text-center">
                Where can we reach your company?
              </Text>

              {/* Form Fields */}
              <View className="mb-4">
                <Text className="text-sm font-bold text-gray-700 mb-1">
                  Business Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="contact@company.com"
                  className="bg-gray-200 rounded-lg px-4 py-3"
                />
              </View>

              <View className="mb-4">
                <Text className="text-sm font-bold text-gray-700 mb-1">
                  Phone Number
                </Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+1 (123) 456-7890"
                  className="bg-gray-200 rounded-lg px-4 py-3"
                />
              </View>

              <View className="mb-4">
                <Text className="text-sm font-bold text-gray-700 mb-1">
                  Street Address
                </Text>
                <TextInput
                  value={street}
                  onChangeText={setStreet}
                  placeholder="Enter company headquarters"
                  className="bg-gray-200 rounded-lg px-4 py-3"
                />
              </View>

              <View className="mb-4">
                <Text className="text-sm font-bold text-gray-700 mb-1">
                City
                </Text>
                <TextInput
                  value={street}
                  onChangeText={setStreet}
                  placeholder="Enter company headquarters"
                  className="bg-gray-200 rounded-lg px-4 py-3"
                />
             
                <View className="flex-1 mt-6">
                  <Text className="text-sm font-bold text-gray-700 mb-1">Postal Code</Text>
                  <TextInput
                    value={postalCode}
                    onChangeText={setPostalCode}
                    placeholder="ZIP/Postal Code"
                    className="bg-gray-200 rounded-lg px-4 py-3"
                  />
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-sm font-bold text-gray-700 mb-1">Country</Text>
                <TextInput
                  value={country}
                  onChangeText={setCountry}
                  placeholder="Enter Country"
                  className="bg-gray-200 rounded-lg px-4 py-3"
                />
              </View>

              {/* Buttons */}
              <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                  className="flex-1 mr-2 rounded-lg items-center justify-center"
                  style={{ height: 50, backgroundColor: "#D1D5DB" }}
                  onPress={() => navigation.goBack()}
                >
                  <Text className="text-gray-700 font-bold">← Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 ml-2 rounded-lg items-center justify-center"
                  style={{ height: 50 }}
                  onPress={() => navigation.navigate("ContactDetails")}
                >
                  <LinearGradient
                    colors={["#2A2F50", "#28A745"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 12.77,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text className="text-white font-bold">Complete →</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Horizontal Line */}
             <View
                style={{
                  height: 3,
                  backgroundColor: "#000000",
                  width: "90%",
                  alignSelf: "center",
                  marginVertical: 20,
                  marginTop:28,
                }}
              />
             {/* Already Have Account */}
<View className="flex-row justify-center mt-4">
  <Text className="text-sm text-gray-500">
    Already have an Account?{" "}
  </Text>
  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <Text className="text-sm text-green-600 font-medium">Sign in here</Text>
  </TouchableOpacity>
</View>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
