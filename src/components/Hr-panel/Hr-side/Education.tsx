import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
} from "react-native";
import HrInput from "./Components/HrInput";
import HrButton from "./Components/HrButton";
import { COLORS, HR_THEME } from "../../../Constants/theme";

const Education: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = () => {
    if (!institution || !department || !course) {
      Alert.alert("Error", "Fill required fields");
      return;
    }
    Alert.alert("Success", "Updated successfully");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Academic Details</Text>

      <View style={[styles.row, isMobile && styles.rowMobile]}>
        <View style={styles.flex}>
          <HrInput label="Institution" value={institution} onChangeText={setInstitution} />
        </View>
        <View style={styles.flex}>
          <HrInput label="Department" value={department} onChangeText={setDepartment} />
        </View>
      </View>

      <HrInput label="Course" value={course} onChangeText={setCourse} />

      <HrButton
        title="Update"
        active
        onPress={handleSubmit}
        style={[styles.button, isMobile && styles.buttonMobile]}
      />
    </ScrollView>
  );
};

export default Education;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 28,
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
  button: {
    width: 200,
    marginTop: 36,
  },
  buttonMobile: {
    width: "100%",
  },
});

