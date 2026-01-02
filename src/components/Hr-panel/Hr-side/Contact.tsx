import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
} from "react-native";
import HrInput from "./Components/HrInput";
import HrButton from "./Components/HrButton";
import { COLORS } from "../../../Constants/theme";

const Contact: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    if (!phone1 || !email || !city || !address) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    Alert.alert("Success", "Contact information updated successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={[
          styles.row,
          isMobile && styles.rowMobile,
        ]}
      >
        <View style={styles.flex}>
          <HrInput
            label="Phone Number 1"
            value={phone1}
            onChangeText={setPhone1}
          />
        </View>

        <View style={styles.flex}>
          <HrInput
            label="Phone Number 2"
            value={phone2}
            onChangeText={setPhone2}
          />
        </View>
      </View>

      <HrInput label="E-mail Address" value={email} onChangeText={setEmail} />
      <HrInput label="City of residence" value={city} onChangeText={setCity} />
      <HrInput
        label="Residential Address"
        value={address}
        onChangeText={setAddress}
        multiline
      />

      <HrButton
        title="Update"
        active
        onPress={handleSubmit}
        style={[
          styles.updateButton,
          isMobile && styles.updateButtonMobile,
        ]}
      />
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
  row: {
    flexDirection: "row",
    gap: 24,
  },
  rowMobile: {
    flexDirection: "column",
    gap: 16,
  },
  flex: {
    flex: 1,
  },
  updateButton: {
    width: 200,
    marginTop: 36,
  },
  updateButtonMobile: {
    width: "100%",
  },
});
