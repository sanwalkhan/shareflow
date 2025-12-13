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
import { ChevronDown } from "lucide-react-native";
import { COLORS } from "../../Constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_MAX_WIDTH = 800;
const CARD_MIN_WIDTH = 360;

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

  const cardWidth = Math.min(Math.max(SCREEN_WIDTH * 0.95, CARD_MIN_WIDTH), CARD_MAX_WIDTH);
  const isMobile = SCREEN_WIDTH < 600; // breakpoint for mobile layout

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Outer Card */}
        <View
          style={{
            width: cardWidth,
            backgroundColor: "#E6F0FF",
            borderRadius: 24,
            padding: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {/* Header */}
          <View style={{ width: "100%", marginBottom: 24, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
              <Image
                source={require("../../assets/image.png")}
                style={{ width: 40, height: 40, marginRight: 8 }}
              />
              <Text style={{ color: COLORS.primary, fontSize: 24, fontWeight: "bold" }}>ShareFlow</Text>
            </View>

            {/* Back To Home button placement responsive */}
            {isMobile ? (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: 180, height: 40, borderRadius: 12, marginTop: 12 }}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 12 }}
                >
                  <Text style={{ color: COLORS.white, fontWeight: "bold" }}>← Back To Home</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  position: "absolute",
                  top: 4,
                  left: 4,
                  width: 180,
                  height: 40,
                  borderRadius: 12,
                  zIndex: 10,
                }}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 12 }}
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
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {/* Stepper */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 24 }}>
              {[1, 2, 3, 4].map((step, idx) => {
                const isActive = step <= 2;
                return (
                  <React.Fragment key={step}>
                    <View style={{ alignItems: "center" }}>
                      {isActive ? (
                        <LinearGradient
                          colors={["#193288", "#FFC20E"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>{step}</Text>
                        </LinearGradient>
                      ) : (
                        <View
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
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
                      <View style={{ flex: 1, height: 2, backgroundColor: isActive ? "#193288" : "#9CA3AF", marginHorizontal: 4, marginTop: 17 }} />
                    )}
                  </React.Fragment>
                );
              })}
            </View>

            {/* Heading */}
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4, textAlign: "center", color: COLORS.primary }}>
              Company Information
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 16, textAlign: "center" }}>
              Enter your company’s official details below
            </Text>

            {/* Form Fields */}
            <View style={{ gap: 12, alignItems: "center", width: "100%" }}>
              {/* Row 1 */}
              <View style={{ flexDirection: isMobile ? "column" : "row", gap: 12, width: "100%" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.textDark, marginBottom: 4 }}>Company Legal Name</Text>
                  <TextInput
                    value={legalName}
                    onChangeText={setLegalName}
                    placeholder="Enter company legal name"
                    style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.textDark, marginBottom: 4 }}>Company Type</Text>
                  <TextInput
                    value={companyType}
                    onChangeText={setCompanyType}
                    placeholder="Select company type"
                    style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                  />
                </View>
              </View>

              {/* Row 2 */}
              <View style={{ flexDirection: isMobile ? "column" : "row", gap: 12, width: "100%" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.textDark, marginBottom: 4 }}>Industry</Text>
                  <TextInput
                    value={industry}
                    onChangeText={setIndustry}
                    placeholder="Select industry"
                    style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.textDark, marginBottom: 4 }}>Company Status</Text>
                  <TextInput
                    value={companyStatus}
                    onChangeText={setCompanyStatus}
                    placeholder="Select company status"
                    style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                  />
                </View>
              </View>

              {/* Row 3 */}
              <View style={{ flexDirection: isMobile ? "column" : "row", gap: 12, width: "100%" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.textDark, marginBottom: 4 }}>Year Founded</Text>
                  <TextInput
                    value={yearFounded}
                    onChangeText={setYearFounded}
                    placeholder="Enter founding year"
                    style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.textDark, marginBottom: 4 }}>Tax ID</Text>
                  <TextInput
                    value={taxId}
                    onChangeText={setTaxId}
                    placeholder="Enter tax ID"
                    style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5", color: COLORS.textDark }}
                  />
                </View>
              </View>

              {/* Row 4 - Registration */}
              <View style={{ width: "100%" }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.textDark, marginBottom: 4 }}>Registration Number</Text>
                <TouchableOpacity
                  onPress={() => setShowDropdown(!showDropdown)}
                  style={{ height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: "#E8EDF5", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                >
                  <Text style={{ color: COLORS.textDark }}>{registrationNum || "Select registration type"}</Text>
                  <ChevronDown color="#555" size={20} />
                </TouchableOpacity>

                {showDropdown && (
                  <View style={{ marginTop: 4, borderRadius: 12, backgroundColor: "#F3F6FA", overflow: "hidden" }}>
                    {registrationOptions.map((option, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setRegistrationNum(option);
                          setShowDropdown(false);
                        }}
                        style={{ paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: i < registrationOptions.length - 1 ? 1 : 0, borderColor: "#D1D5DB" }}
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
              style={{ height: 52, marginTop: 16, borderRadius: 12 }}
              onPress={() => navigation.navigate("Administrator")}
            >
              <LinearGradient
                colors={[COLORS.button, COLORS.button]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, borderRadius: 12, justifyContent: "center", alignItems: "center" }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 16 }}>Complete →</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Horizontal Line */}
            <View style={{ height: 3, backgroundColor: COLORS.primary, width: "90%", alignSelf: "center", marginVertical: 20 }} />

            {/* Already Have Account */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 4 }}>
              <Text style={{ fontSize: 14, color: COLORS.gray }}>Already have an Account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ fontSize: 14, color: COLORS.button, fontWeight: "600" }}>Sign in here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetails;
