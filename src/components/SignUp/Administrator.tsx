import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../Constants/theme";
 
const Administrator: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions(); // ✅ automatically updates on resize
  const isMobile = width < 768; // mobile breakpoint
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
 
  const cardWidth = isMobile ? width - 32 : Math.min(width * 0.8, 800);
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, alignItems: "center", paddingVertical: 24 }}>
 
          {/* Outer Card */}
          <View
            style={{
              width: cardWidth,
              backgroundColor: COLORS.outerCardBackground,
              borderRadius: 24,
              padding: 34,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 5,
           
            }}
          >
            {/* Header */}
            <View style={{ alignItems: "center", marginBottom: 24, position: "relative", width: "100%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require('../../assets/image.png')}
                  style={{ width: 40, height: 40, marginRight: 8 }}
                />
                <Text style={{ color: COLORS.primary, fontSize: 24, fontWeight: "bold" }}>ShareFlow</Text>
              </View>
 
              {/* Back Button */}
              {isMobile ? (
                <View style={{ marginTop: 12 }}>
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
                      <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 14 }}>
                        ← Back To Home
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ position: "absolute", top: 4, left: 4, zIndex: 10 }}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: 180,
                      height: 40,
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>← Back To Home</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
 
            {/* Inner Card */}
            <View
              style={{
                width: "100%",
                backgroundColor: COLORS.white,
                borderRadius: 24,
                padding: 24,
               
              }}
            >
              {/* Heading */}
              <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: COLORS.primary, marginBottom: 8 }}>
                Administrator Details
              </Text>
              <Text style={{ fontSize: 14, color: "#6C717D", textAlign: "center", marginBottom: 16 }}>
                Primary account administrator information
              </Text>
 
              {/* Stepper */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
                {[1, 2, 3, 4].map((step, idx) => {
                  const isActive = step <= 3;
                  return (
                    <React.Fragment key={step}>
                      <View style={{ alignItems: "center" }}>
                        <View
                          style={{
                            width: isMobile ? 28 : 40,
                            height: isMobile ? 28 : 40,
                            borderRadius: isMobile ? 14 : 20,
                            backgroundColor: isActive ? COLORS.primary : "#fff",
                            borderWidth: isActive ? 0 : 2,
                            borderColor: "#9CA3AF",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: isActive ? "#fff" : "#9CA3AF", fontWeight: "bold", fontSize: isMobile ? 12 : 16 }}>
                            {step}
                          </Text>
                        </View>
                      </View>
                      {idx < 3 && (
                        <View
                          style={{
                            flex: 1,
                            height: 2,
                            backgroundColor: isActive ? COLORS.primary : "#9CA3AF",
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
              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: isMobile ? "column" : "row", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>First Name</Text>
                    <TextInput
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="Enter First Name"
                      style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5" }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>Last Name</Text>
                    <TextInput
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="Enter Last Name"
                      style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5" }}
                    />
                  </View>
                </View>
 
                <View style={{ flexDirection: isMobile ? "column" : "row", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>Job Title</Text>
                    <TextInput
                      value={jobTitle}
                      onChangeText={setJobTitle}
                      placeholder="Enter Job Title"
                      style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5" }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>Admin Email</Text>
                    <TextInput
                      value={adminEmail}
                      onChangeText={setAdminEmail}
                      placeholder="admin@company.com"
                      style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5" }}
                    />
                  </View>
                </View>
              </View>
 
              {/* Buttons */}
              <View style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
  <TouchableOpacity
    style={{
      flex: 1,
      height: 48,
      backgroundColor: COLORS.grayButton, // theme se bg
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={() => navigation.goBack()}
  >
    <Text style={{ color: COLORS.grayButtonText, fontWeight: "bold" }}>
      ← Previous
    </Text>
  </TouchableOpacity>
 
 
 
                <TouchableOpacity
                  style={{ flex: 1, height: 48, borderRadius: 12 }}
                  onPress={() => navigation.navigate("Password")}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 12 }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Complete →</Text>
                  </LinearGradient>
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