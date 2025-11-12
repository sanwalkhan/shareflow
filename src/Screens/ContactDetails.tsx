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
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Outer Card */}
          <View
            className="bg-[#E3EDF9] rounded-3xl shadow-2xl p-4"
            style={{ width: 800, height: 960 }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-center mb-6 w-full relative">
              <View className="flex-row items-center">
                <Image
                  source={require("../assets/image.png")}
                  className="w-10 h-10 mr-2"
                  style={{ marginTop: 60 }}
                />
                <Text
                  className="text-2xl font-bold text-gray-800"
                  style={{ marginTop: 60 }}
                >
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
            <View
              className="bg-white rounded-3xl shadow-2xl p-8"
              style={{
                alignSelf: "center",
                width: "90%",
                height: 730,
              }}
            >
              {/* Stepper */}
              <View className="flex-row items-center justify-between mb-8 w-full px-4">
                {[1, 2, 3, 4].map((step, index) => (
                  <React.Fragment key={index}>
                    <View className="items-center">
                      <LinearGradient
                        colors={
                          step <= 2
                            ? ["#2A2F50", "#28A745"]
                            : ["#FFFFFF", "#FFFFFF"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: step > 2 ? 2 : 0,
                          borderColor: step > 2 ? "#9CA3AF" : "transparent",
                        }}
                      >
                        <Text
                          className={`font-bold text-lg ${
                            step <= 2 ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {step}
                        </Text>
                      </LinearGradient>
                    </View>
                    {step < 4 && (
                      <View
                        style={{
                          flex: 1,
                          height: 2,
                          backgroundColor: "#9CA3AF",
                          marginHorizontal: 4,
                          marginTop: 19,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </View>

              {/* Heading */}
              <Text className="text-xl font-semibold mb-2 text-center">
                Company Information
              </Text>
              <Text className="text-sm text-gray-500 mb-6 text-center">
                Enter your company’s official details
              </Text>

              {/* Form Fields */}
              <View className="space-y-5">
                {/* Row 1 */}
                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                      Company Legal Name
                    </Text>
                    <TextInput
                      value={legalName}
                      onChangeText={setLegalName}
                      placeholder="Enter company legal name"
                      className="bg-gray-200 rounded-lg px-4"
                      style={{ height: 50 }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                      Company Type
                    </Text>
                    <TextInput
                      value={companyType}
                      onChangeText={setCompanyType}
                      placeholder="Select company type"
                      className="bg-gray-200 rounded-lg px-4"
                      style={{ height: 50 }}
                    />
                  </View>
                </View>

                {/* Row 2 */}
                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-1 mt-2">
                      Industry
                    </Text>
                    <TextInput
                      value={industry}
                      onChangeText={setIndustry}
                      placeholder="Select industry"
                      className="bg-gray-200 rounded-lg px-4"
                      style={{ height: 50 }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-1 mt-2">
                      Company Status
                    </Text>
                    <TextInput
                      value={companyStatus}
                      onChangeText={setCompanyStatus}
                      placeholder="Select company status"
                      className="bg-gray-200 rounded-lg px-4"
                      style={{ height: 50 }}
                    />
                  </View>
                </View>

                {/* Row 3 */}
                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-1 mt-2">
                      Year Founded
                    </Text>
                    <TextInput
                      value={yearFounded}
                      onChangeText={setYearFounded}
                      placeholder="Enter founding year"
                      className="bg-gray-200 rounded-lg px-4"
                      style={{ height: 50 }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-1 mt-2">
                      Tax ID
                    </Text>
                    <TextInput
                      value={taxId}
                      onChangeText={setTaxId}
                      placeholder="Enter tax ID"
                      className="bg-gray-200 rounded-lg px-4"
                      style={{ height: 50 }}
                    />
                  </View>
                </View>

                {/* Row 4 - Registration Number with Icon */}
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-1 mt-2">
                    Registration Number
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDropdown(!showDropdown)}
                    activeOpacity={0.8}
                    className="bg-gray-200 rounded-lg flex-row items-center justify-between px-4"
                    style={{ height: 50 }}
                  >
                    <Text className="text-gray-600">
                      {registrationNum || "Select registration type"}
                    </Text>
                    <ChevronDown color="#555" size={22} />
                  </TouchableOpacity>

                  {/* Dropdown Options */}
                  {showDropdown && (
                    <View className="bg-gray-100 rounded-lg mt-2 shadow-md">
                      {registrationOptions.map((option, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            setRegistrationNum(option);
                            setShowDropdown(false);
                          }}
                          className="px-4 py-3 border-b border-gray-300"
                        >
                          <Text className="text-gray-700">{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* Complete Button Full Width */}
              <TouchableOpacity
                className="rounded-lg items-center justify-center mt-8"
                style={{ height: 60 }} // increased height
                onPress={() => navigation.navigate("VerifyEmail")}
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
                  <Text className="text-white font-bold text-lg">Complete →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetails;
