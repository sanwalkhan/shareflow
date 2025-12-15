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
import { ChevronDown } from "lucide-react-native";
import { COLORS } from "../../Constants/theme";

const CARD_MAX_WIDTH = 800;
const CARD_MIN_WIDTH = 360;

const ContactDetails: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();

  // SAFE WIDTH: minimum 360px, responsive
  const SAFE_WIDTH = Math.max(width, CARD_MIN_WIDTH);

  // RESPONSIVE FLAGS
  const isMobile = SAFE_WIDTH < 600;

  // CARD WIDTH
  const cardWidth = Math.min(
    Math.max(SAFE_WIDTH * 0.95, CARD_MIN_WIDTH),
    CARD_MAX_WIDTH
  );

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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingVertical: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* OUTER CARD */}
        <View
          style={{
            width: cardWidth,
            backgroundColor: "#E6F0FF",
            borderRadius: 24,
            padding: 24,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          {/* HEADER */}
          <View style={{ alignItems: "center", marginBottom: 24 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/image.png")}
                style={{ width: 40, height: 40, marginRight: 8 }}
              />
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                ShareFlow
              </Text>
            </View>

            {/* Back Button */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                marginTop: SAFE_WIDTH < 500 ? 12 : 0,
                width: 180,
                height: 40,
                borderRadius: 12,
                position: SAFE_WIDTH < 500 ? "relative" : "absolute",
                top: SAFE_WIDTH < 500 ? undefined : 4,
                left: SAFE_WIDTH < 500 ? undefined : 4,
              }}
            >
              <LinearGradient
                colors={[COLORS.button, COLORS.button]}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                  ← Back To Home
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* INNER CARD */}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 24,
              padding: 24,
            }}
          >
            {/* STEPPER */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              {[1, 2, 3, 4].map((step, idx) => {
                const isActive = step <= 2;
                return (
                  <React.Fragment key={step}>
                    <View>
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          backgroundColor: isActive
                            ? COLORS.primary
                            : COLORS.white,
                          borderWidth: isActive ? 0 : 2,
                          borderColor: "#9CA3AF",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: isActive ? "#fff" : "#9CA3AF",
                            fontWeight: "bold",
                          }}
                        >
                          {step}
                        </Text>
                      </View>
                    </View>
                    {idx < 3 && (
                      <View
                        style={{
                          flex: 1,
                          height: 2,
                          backgroundColor: isActive
                            ? COLORS.primary
                            : "#9CA3AF",
                          marginTop: 17,
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </View>

            {/* FORM */}
            <View style={{ gap: 12 }}>
              {[ 
                ["Company Legal Name", legalName, setLegalName],
                ["Company Type", companyType, setCompanyType],
                ["Industry", industry, setIndustry],
                ["Company Status", companyStatus, setCompanyStatus],
                ["Year Founded", yearFounded, setYearFounded],
                ["Tax ID", taxId, setTaxId],
              ].map(([label, value, setter]: any, i) => (
                <View key={i}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={setter}
                    placeholder={label}
                    style={{
                      height: 48,
                      borderRadius: 12,
                      paddingHorizontal: 12,
                      backgroundColor: "#E8EDF5",
                    }}
                  />
                </View>
              ))}

              {/* REGISTRATION */}
              <TouchableOpacity
                onPress={() => setShowDropdown(!showDropdown)}
                style={{
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#E8EDF5",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 12,
                }}
              >
                <Text>{registrationNum || "Select registration type"}</Text>
                <ChevronDown size={20} />
              </TouchableOpacity>

              {showDropdown &&
                registrationOptions.map((opt, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setRegistrationNum(opt);
                      setShowDropdown(false);
                    }}
                    style={{ padding: 12 }}
                  >
                    <Text>{opt}</Text>
                  </TouchableOpacity>
                ))}
            </View>

            {/* COMPLETE */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Administrator")}
              style={{ height: 52, marginTop: 20 }}
            >
              <LinearGradient
                colors={[COLORS.button, COLORS.button]}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Complete →
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetails;
