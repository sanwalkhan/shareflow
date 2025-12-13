import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../Constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const isMobile = SCREEN_WIDTH < 768;

const Administrator: React.FC = () => {
  const navigation = useNavigation<any>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center px-4 py-8">

          {/* Outer Card */}
          <View
            className="bg-[#E6F0FF] rounded-3xl shadow-2xl p-6"
            style={{
              width: isMobile ? SCREEN_WIDTH - 32 : 800,
              minHeight: isMobile ? "auto" : 860, // ⬅️ WEBSITE HEIGHT REDUCED
            }}
          >

            {/* Top Bar */}
            <View className="flex-row items-center justify-center mb-6 w-full relative">
              <View className="flex-row items-center">
                <Image
                  source={require('../../assets/image.png')}
                  className="w-10 h-10 mr-2"
                  style={{ marginTop: isMobile ? 10 : 60 }}
                />
                <Text
                  className="text-2xl font-bold"
                  style={{ marginTop: isMobile ? 10 : 60, color: COLORS.primary }}
                >
                  ShareFlow
                </Text>
              </View>

              {/* Back Button – WEBSITE VIEW (TOP LEFT) */}
              {!isMobile && (
                <TouchableOpacity
                  className="absolute top-2 left-2 z-10"
                  onPress={() => navigation.goBack()}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: 183,
                      height: 41,
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text className="text-white font-bold">← Back To Home</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>

            {/* Back Button – MOBILE VIEW (BELOW SHAREFLOW TEXT) */}
            {isMobile && (
              <View className="w-full items-center mb-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: 140,
                      height: 36,
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text className="text-white font-bold text-sm">← Back To Home</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {/* Inner Card */}
            <View
              className="bg-white rounded-3xl shadow-2xl px-6 pt-8 pb-12 space-y-6"
              style={{
                alignSelf: "center",
                width: isMobile ? "95%" : "90%",
              }}
            >

              {/* Heading */}
              <View>
                <Text
                  className="text-xl font-extrabold text-center mb-2"
                  style={{ color: COLORS.primary }}
                >
                  Administrator Details
                </Text>
                <Text className="text-sm text-gray-500 text-center">
                  Primary account administrator information
                </Text>
              </View>

              {/* Stepper */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                  paddingHorizontal: isMobile ? 4 : 16,
                }}
              >
                {[1, 2, 3, 4].map((step, idx) => {
                  const isActive = step <= 3;
                  return (
                    <React.Fragment key={step}>
                      <View style={{ alignItems: "center" }}>
                        {isActive ? (
                          <LinearGradient
                            colors={["#193288", "#FFC20E"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                              width: isMobile ? 28 : 40,
                              height: isMobile ? 28 : 40,
                              borderRadius: isMobile ? 14 : 20,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#FFFFFF",
                                fontWeight: "bold",
                                fontSize: isMobile ? 12 : 16,
                              }}
                            >
                              {step}
                            </Text>
                          </LinearGradient>
                        ) : (
                          <View
                            style={{
                              width: isMobile ? 28 : 40,
                              height: isMobile ? 28 : 40,
                              borderRadius: isMobile ? 14 : 20,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 2,
                              borderColor: "#9CA3AF",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#9CA3AF",
                                fontWeight: "bold",
                                fontSize: isMobile ? 12 : 16,
                              }}
                            >
                              {step}
                            </Text>
                          </View>
                        )}
                      </View>

                      {idx < 3 && (
                        <View
                          style={{
                            flex: 1,
                            height: 2,
                            backgroundColor: isActive ? "#193288" : "#9CA3AF",
                            marginHorizontal: 2,
                            marginTop: isMobile ? 12 : 19,
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </View>

              {/* Form Fields */}
              <View className="space-y-4">
                <View className={isMobile ? "" : "flex-row space-x-4"}>
                  <View className="flex-1 mb-2">
                    <Text className="text-base font-semibold text-gray-800 mb-1">First Name</Text>
                    <TextInput
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="Enter First Name"
                      className="bg-gray-200 rounded-xl px-4 py-4 text-base"
                    />
                  </View>

                  <View className="flex-1 mb-2">
                    <Text className="text-base font-semibold text-gray-800 mb-1">Last Name</Text>
                    <TextInput
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="Enter Last Name"
                      className="bg-gray-200 rounded-xl px-4 py-4 text-base"
                    />
                  </View>
                </View>

                <View className={isMobile ? "" : "flex-row space-x-4"}>
                  <View className="flex-1 mb-2">
                    <Text className="text-base font-semibold text-gray-800 mb-1">Job Title</Text>
                    <TextInput
                      value={jobTitle}
                      onChangeText={setJobTitle}
                      placeholder="Enter Job Title"
                      className="bg-gray-200 rounded-xl px-4 py-4 text-base"
                    />
                  </View>

                  <View className="flex-1 mb-2">
                    <Text className="text-base font-semibold text-gray-800 mb-1">Admin Email</Text>
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
              <View className="flex-row justify-between space-x-4 pt-4">
                <TouchableOpacity
                  className="flex-1 rounded-xl items-center justify-center"
                  style={{
                    height: isMobile ? 45 : 55,
                    backgroundColor: "#D1D5DB",
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Text className="text-gray-700 font-semibold text-sm">← Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 rounded-xl items-center justify-center"
                  style={{ height: isMobile ? 45 : 55 }}
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
                    <Text className="text-white font-bold text-sm">Complete →</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View
                style={{
                  height: 2,
                  backgroundColor: COLORS.primary,
                  width: "100%",
                  alignSelf: "center",
                  marginVertical: 16,
                }}
              />

              {/* Already Have Account */}
              <View className="flex-row justify-center mt-2">
                <Text className="text-xs" style={{ color: COLORS.primary }}>
                  Already have an Account?{" "}
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text className="text-xs font-medium" style={{ color: COLORS.button }}>
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
