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
import { ChevronDown } from "lucide-react-native";
import { COLORS } from "../../Constants/theme";

const ContactDetails: React.FC = () => {
  const navigation = useNavigation<any>();

  const [legalName, setLegalName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyStatus, setCompanyStatus] = useState("");
  const [yearFounded, setYearFounded] = useState("");
  const [taxId, setTaxId] = useState("");
  const [registrationNum, setRegistrationNum] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const registrationOptions = [
    "Private Limited",
    "Sole Proprietor",
    "Partnership Firm",
    "Public Limited",
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Outer Card */}
         <View
  className="rounded-3xl shadow-2xl p-4"
  style={{ width: 800, height: 960, backgroundColor: "#E6F0FF" }}
>

            {/* Header */}
            <View className="flex-row items-center justify-center mb-6 w-full relative">
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/image.png")}
                  style={{ width: 40, height: 40, marginRight: 8, marginTop: 60 }}
                />
                 <Text style={{ marginTop: 60, color: COLORS.primary, fontSize: 24, fontWeight: "bold" }}>
                                  ShareFlow
                                </Text>
              </View>

              {/* Back Button */}
              {/* Back Button */}
<TouchableOpacity
  className="absolute top-4 left-4 z-10"
  onPress={() => navigation.goBack()}
>
  <LinearGradient
    colors={[COLORS.button, COLORS.button]} // Yellow background same as inner button
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
            <View
              className="rounded-3xl shadow-2xl p-8"
              style={{
                alignSelf: "center",
                width: "90%",
                height: 780,
                backgroundColor: COLORS.white,
              }}
            >
              {/* Stepper */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 24, paddingHorizontal: 16 }}>
                {[1, 2, 3, 4].map((step, idx) => {
                  const isActive = step <= 2; // First two steps active
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
                            <Text style={{ color: COLORS.white, fontWeight: "bold" }}>{step}</Text>
                          </LinearGradient>
                        ) : (
                          <View
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              backgroundColor: COLORS.white,
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

              {/* Heading */}
              <Text
  className="text-[22px] font-extrabold text-center mb-2"
  style={{ fontFamily: "Poppins", color: COLORS.primary }} // Blue color
>
  Company Information
</Text>

              <Text className="text-sm text-center mb-8" style={{ color: COLORS.gray }}>
                Enter your company’s official details below
              </Text>

              {/* Form Fields */}
              <View className="space-y-5">
                {/* Row 1 */}
                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.textDark }}>
                      Company Legal Name
                    </Text>
                    <TextInput
                      value={legalName}
                      onChangeText={setLegalName}
                      placeholder="Enter company legal name"
                      className="rounded-lg px-4"
                      style={{ height: 50, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.textDark }}>
                      Company Type
                    </Text>
                    <TextInput
                      value={companyType}
                      onChangeText={setCompanyType}
                      placeholder="Select company type"
                      className="rounded-lg px-4"
                      style={{ height: 50, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                    />
                  </View>
                </View>

                {/* Row 2 */}
                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.textDark }}>
                      Industry
                    </Text>
                    <TextInput
                      value={industry}
                      onChangeText={setIndustry}
                      placeholder="Select industry"
                      className="rounded-lg px-4"
                      style={{ height: 50, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.textDark }}>
                      Company Status
                    </Text>
                    <TextInput
                      value={companyStatus}
                      onChangeText={setCompanyStatus}
                      placeholder="Select company status"
                      className="rounded-lg px-4"
                      style={{ height: 50, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                    />
                  </View>
                </View>

                {/* Row 3 */}
                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.textDark }}>
                      Year Founded
                    </Text>
                    <TextInput
                      value={yearFounded}
                      onChangeText={setYearFounded}
                      placeholder="Enter founding year"
                      className="rounded-lg px-4"
                      style={{ height: 50, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.textDark }}>
                      Tax ID
                    </Text>
                    <TextInput
                      value={taxId}
                      onChangeText={setTaxId}
                      placeholder="Enter tax ID"
                      className="rounded-lg px-4"
                      style={{ height: 50, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                    />
                  </View>
                </View>

                {/* Row 4 */}
                <View>
                  <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.textDark }}>
                    Registration Number
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDropdown(!showDropdown)}
                    className="rounded-lg flex-row items-center justify-between px-4"
                    style={{ height: 50, backgroundColor: "#E8EDF5" }}
                  >
                    <Text style={{ color: COLORS.textDark }}>
                      {registrationNum || "Select registration type"}
                    </Text>
                    <ChevronDown color="#555" size={22} />
                  </TouchableOpacity>

                  {showDropdown && (
                    <View className="rounded-lg mt-2 shadow-md" style={{ backgroundColor: "#F3F6FA" }}>
                      {registrationOptions.map((option, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            setRegistrationNum(option);
                            setShowDropdown(false);
                          }}
                          className="px-4 py-3 border-b border-gray-300"
                        >
                          <Text style={{ color: COLORS.textDark }}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* Complete Button */}
              <TouchableOpacity
                className="rounded-lg items-center justify-center mt-10"
                style={{ height: 60 }}
                onPress={() => navigation.navigate("Administrator")}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
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
                  <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 18 }}>
                    Complete →
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Horizontal Line */}
              {/* Horizontal Line */}
<View
  style={{
    height: 3,
    backgroundColor: COLORS.primary, // Blue line
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
    marginTop: 26,
  }}
/>

{/* Already Have Account */}
<View className="flex-row justify-center mt-4">
  <Text className="text-sm text-gray-500">
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

export default ContactDetails;
