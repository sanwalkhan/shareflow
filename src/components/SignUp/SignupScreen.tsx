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

const CARD_MAX_WIDTH = 900; // desktop max width
const CARD_MIN_WIDTH = 360; // mobile min width

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const isDesktop = SCREEN_WIDTH >= 1024;

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const cardWidth = Math.min(
    Math.max(SCREEN_WIDTH * 0.9, CARD_MIN_WIDTH),
    CARD_MAX_WIDTH
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingVertical: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: isDesktop ? 40 : 16,
          }}
        >
          {/* OUTER CARD */}
          <View
            style={{
              width: cardWidth,
              backgroundColor: "#E6F0FF",
              borderRadius: 24,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 6,
              marginTop:52,
            }}
          >
            {/* HEADER */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                position: "relative",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/image.png")}
                  style={{ width: 42, height: 42, marginRight: 8 }}
                />
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 26,
                    fontWeight: "bold",
                  }}
                >
                  ShareFlow
                </Text>
              </View>

              {/* BACK BUTTON (DESKTOP ONLY) */}
              {isDesktop && (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                  }}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    style={{
                      paddingHorizontal: 18,
                      height: 40,
                      borderRadius: 12,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                      ← Back To Home
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>

            {/* INNER CARD */}
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 24,
                padding: 20,
              }}
            >
              {/* STEPPER */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                {[1, 2, 3, 4].map((step, index) => {
                  const active = step === 1;
                  return (
                    <React.Fragment key={step}>
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: active ? "#193288" : "#E5E7EB",
                        }}
                      >
                        <Text
                          style={{
                            color: active ? "#fff" : "#6B7280",
                            fontWeight: "bold",
                          }}
                        >
                          {step}
                        </Text>
                      </View>
                      {index < 3 && (
                        <View
                          style={{
                            flex: 1,
                            height: 2,
                            backgroundColor: active
                              ? "#193288"
                              : "#E5E7EB",
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </View>

              {/* TITLE */}
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: COLORS.primary,
                }}
              >
                Contact Details
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: COLORS.gray,
                  marginBottom: 24,
                }}
              >
                Where can we reach your company?
              </Text>

              {/* FORM */}
              {[
                {
                  label: "Business Email",
                  value: email,
                  setter: setEmail,
                  placeholder: "contact@company.com",
                },
                {
                  label: "Phone Number",
                  value: phone,
                  setter: setPhone,
                  placeholder: "+1 234 567 890",
                },
                {
                  label: "Street Address",
                  value: street,
                  setter: setStreet,
                  placeholder: "Company address",
                },
                {
                  label: "City",
                  value: city,
                  setter: setCity,
                  placeholder: "City",
                },
                {
                  label: "Postal Code",
                  value: postalCode,
                  setter: setPostalCode,
                  placeholder: "ZIP / Postal",
                },
                {
                  label: "Country",
                  value: country,
                  setter: setCountry,
                  placeholder: "Country",
                },
              ].map((field, index) => (
                <View key={index} style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 6,
                      color: COLORS.primary,
                    }}
                  >
                    {field.label}
                  </Text>
                  <TextInput
                    value={field.value}
                    onChangeText={field.setter}
                    placeholder={field.placeholder}
                    placeholderTextColor={COLORS.gray}
                    style={{
                      backgroundColor: "#E6F0FF",
                      borderRadius: 12,
                      padding: 14,
                      color: COLORS.primary,
                    }}
                  />
                </View>
              ))}

              {/* BUTTONS */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    flex: 1,
                    backgroundColor: "#D1D5DB",
                    height: 50,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>← Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("ContactDetails")}
                  style={{
                    flex: 1,
                    height: 50,
                    marginLeft: 8,
                  }}
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
                      }}
                    >
                      Complete →
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* FOOTER */}
              <View
                style={{
                  height: 3,
                  backgroundColor: COLORS.primary,
                  width: "90%",
                  alignSelf: "center",
                  marginVertical: 24,
                }}
              />

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ color: COLORS.gray }}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text
                    style={{
                      color: COLORS.button,
                      fontWeight: "bold",
                    }}
                  >
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

export default SignupScreen;
