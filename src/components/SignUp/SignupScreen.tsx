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
import { COLORS } from "../../Constants/theme";

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, paddingVertical: 48 }}>
          
          {/* Outer Card */}
          <View
            style={{
              width: 800,
              height: 1050,
              backgroundColor: "#E6F0FF", // light blue touch
              borderRadius: 24,
              padding: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {/* Top Bar */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 24, width: "100%", position: "relative" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require('../../assets/image.png')}
                  style={{ width: 40, height: 40, marginRight: 8, marginTop: 60 }}
                />
                <Text style={{ marginTop: 60, color: COLORS.primary, fontSize: 24, fontWeight: "bold" }}>
                  ShareFlow
                </Text>
              </View>

              {/* Back Button */}
              <TouchableOpacity
                style={{ position: "absolute", top: 4, left: 4, zIndex: 10 }}
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
                  <Text style={{ color: COLORS.white, fontWeight: "bold" }}>← Back To Home</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Inner Card */}
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                backgroundColor: COLORS.white, // inner card fully white
                borderRadius: 24,
                padding: 32,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              {/* Progress Stepper */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 24, paddingHorizontal: 16 }}>
  {[1,2,3,4].map((step, idx) => {
    const isActive = step === 1;
    return (
      <React.Fragment key={step}>
        <View style={{ alignItems: "center" }}>
          {isActive ? (
            <LinearGradient
              colors={["#193288", "#FFC20E"]} // Blue to Yellow gradient
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
              width: 100,
              height: 2,
              backgroundColor: isActive ? "#193288" : "#9CA3AF", // active line blue
              marginTop: 19,
            }}
          />
        )}
      </React.Fragment>
    );
  })}
</View>


              {/* Heading */}
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8, textAlign: "center", color: COLORS.primary }}>
                Contact Details
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 24, textAlign: "center" }}>
                Where can we reach your company?
              </Text>

              {/* Form Fields */}
              {[
                {label: "Business Email", value: email, setter: setEmail, placeholder: "contact@company.com"},
                {label: "Phone Number", value: phone, setter: setPhone, placeholder: "+1 (123) 456-7890"},
                {label: "Street Address", value: street, setter: setStreet, placeholder: "Enter company headquarters"},
                {label: "City", value: city, setter: setCity, placeholder: "Enter City"},
                {label: "Postal Code", value: postalCode, setter: setPostalCode, placeholder: "ZIP/Postal Code"},
                {label: "Country", value: country, setter: setCountry, placeholder: "Enter Country"}
              ].map((field, idx) => (
                <View key={idx} style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.primary, marginBottom: 6 }}>{field.label}</Text>
                  <TextInput
                    value={field.value}
                    onChangeText={field.setter}
                    placeholder={field.placeholder}
                    placeholderTextColor={COLORS.gray}
                    style={{ backgroundColor: "#E6F0FF", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: COLORS.primary }}
                  />
                </View>
              ))}

              {/* Buttons */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <TouchableOpacity
                  style={{ flex: 1, marginRight: 8, backgroundColor: "#D1D5DB", borderRadius: 12, height: 50, justifyContent: "center", alignItems: "center" }}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: "#4B5563", fontWeight: "bold" }}>← Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, marginLeft: 8, height: 50, borderRadius: 12 }}
                  onPress={() => navigation.navigate("ContactDetails")}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: "100%", height: "100%", borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>Complete →</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Horizontal Line */}
              <View style={{ height: 3, backgroundColor: COLORS.primary, width: "90%", alignSelf: "center", marginVertical: 20, marginTop: 28 }} />

              {/* Already Have Account */}
              <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
                <Text style={{ fontSize: 14, color: COLORS.gray }}>Already have an Account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ fontSize: 14, color: COLORS.button, fontWeight: "600" }}>Sign in here</Text>
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
