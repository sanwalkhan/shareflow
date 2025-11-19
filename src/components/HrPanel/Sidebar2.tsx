import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// Sidebar tabs
const tabs = [
  { name: "Personal Details", screen: "PersonalDetails" },
  { name: "Contact Details", screen: "ContactDetails2" },
  { name: "Next of Kin Details", screen: "NextOfKinDetails" },
  { name: "Education Qualifications", screen: "EducationQualifications" },
  { name: "Guarantor Details", screen: "GuarantorDetails" },
  { name: "Family Details", screen: "FamilyDetails" },
  { name: "Job Details", screen: "JobDetails" },
  { name: "Financial Details", screen: "FinancialDetails" },
];

const Sidebar2: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <View className="bg-white rounded-xl shadow p-4 w-80 h-full">
      {tabs.map((tab, index) => {
        const isActive = route.name === tab.screen;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(tab.screen)}
            className="mt-4"
            activeOpacity={0.8}
          >
            {isActive ? (
              <LinearGradient
                colors={["#121C3E", "#28A745"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-5 rounded-lg"
              >
                <Text className="font-bold text-center text-white">{tab.name}</Text>
              </LinearGradient>
            ) : (
              <View className="p-5 rounded-lg bg-[#d8e9ff]">
                <Text className="font-bold text-center text-black">{tab.name}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Sidebar2;
