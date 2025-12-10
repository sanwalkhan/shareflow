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
import { COLORS } from "../../Constants/theme"; // Make sure COLORS has: primary (blue), button (yellow), success (green), white

const Administrator: React.FC = () => {
  const navigation = useNavigation<any>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Outer Card */}
          <View className="bg-[#E6F0FF] rounded-3xl shadow-2xl p-6" style={{ width: 800, height: 960 }}>
            {/* Top Bar */}
            <View className="flex-row items-center justify-center mb-8 w-full relative">
              <View className="flex-row items-center">
                <Image
                  source={require('../../assets/image.png')}
                  className="w-10 h-10 mr-2"
                  style={{ marginTop: 60 }}
                />
                <Text className="text-2xl font-bold" style={{ marginTop: 60, color: COLORS.primary }}>
                  ShareFlow
                </Text>
              </View>

              {/* Back Button */}
              <TouchableOpacity
                className="absolute top-4 left-4 z-10"
                onPress={() => navigation.goBack()}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
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
            <View className="bg-white rounded-3xl shadow-2xl px-10 pt-10 pb-16 space-y-10" style={{ alignSelf: "center", width: "90%" }}>
              {/* Heading */}
              <View>
                <Text className="text-2xl font-extrabold text-center mb-3" style={{ color: COLORS.primary }}>
                  Administrator Details
                </Text>
                <Text className="text-base text-gray-500 text-center">
                  Primary account administrator information
                </Text>
              </View>

              {/* Stepper */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 24, paddingHorizontal: 16 }}>
  {[1, 2, 3, 4].map((step, idx) => {
    const isActive = step <= 3; // First three steps active
    return (
      <React.Fragment key={step}>
        <View style={{ alignItems: "center" }}>
          {isActive ? (
            <LinearGradient
              colors={["#193288", "#FFC20E"]} // Blue-to-yellow gradient for active steps
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>{step}</Text>
            </LinearGradient>
          ) : (
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
              <Text style={{ color: "#9CA3AF", fontWeight: "bold" }}>{step}</Text>
            </View>
          )}
        </View>
        {idx < 3 && (
          <View
            style={{
              flex: 1,
              height: 2,
              backgroundColor: isActive ? "#193288" : "#9CA3AF",
              marginHorizontal: 4,
              marginTop: 19,
            }}
          />
        )}
      </React.Fragment>
    );
  })}
</View>

              {/* Form Fields */}
              <View className="space-y-8">
                <View className="flex-row space-x-6">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-2">First Name</Text>
                    <TextInput
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="Enter First Name"
                      className="bg-gray-200 rounded-xl px-4 py-4 text-base"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-2">Last Name</Text>
                    <TextInput
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="Enter Last Name"
                      className="bg-gray-200 rounded-xl px-4 py-4 text-base"
                    />
                  </View>
                </View>

                <View className="flex-row space-x-6">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-2">Job Title</Text>
                    <TextInput
                      value={jobTitle}
                      onChangeText={setJobTitle}
                      placeholder="Enter Job Title"
                      className="bg-gray-200 rounded-xl px-4 py-4 text-base"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-2">Admin Email</Text>
                    <TextInput
                      value={adminEmail}
                      onChangeText={setAdminEmail}
                      placeholder="admin@company.com"
                      className="bg-gray-200 rounded-xl px-4 py-4 text-base"
                    />
                  </View>
                </View>
              </View>

              {/* Buttons */}
              <View className="flex-row justify-between space-x-6 pt-4">
                <TouchableOpacity
                  className="flex-1 rounded-xl items-center justify-center"
                  style={{ height: 55, backgroundColor: "#D1D5DB" }}
                  onPress={() => navigation.goBack()}
                >
                  <Text className="text-gray-700 font-semibold text-base">← Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 rounded-xl items-center justify-center"
                  style={{ height: 55 }}
                  onPress={() => navigation.navigate("Password")}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 14,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text className="text-white font-bold text-base">Complete →</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View
                style={{
                  height: 3,
                  backgroundColor: COLORS.primary,
                  width: "90%",
                  alignSelf: "center",
                  marginVertical: 20,
                  marginTop: 32,
                }}
              />

              {/* Already Have Account */}
              <View className="flex-row justify-center mt-4">
                <Text className="text-sm" style={{ color: COLORS.primary }}>
                  Already have an Account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text className="text-sm font-medium" style={{ color: COLORS.button }}>
                    Sign in here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Administrator;
