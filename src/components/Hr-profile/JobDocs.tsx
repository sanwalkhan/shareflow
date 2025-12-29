import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { HR_THEME, COLORS } from "../../Constants/theme";
import HrButton from "./Components/HrButton";

const JobDocs: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDesktop && styles.desktopContainer,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* TITLE */}
      <Text style={styles.title}>Job Details / Upload Documents</Text>

      <UploadRow label="Upload Offer Letter" />
      <UploadRow label="Upload Birth Certificate" />
      <UploadRow label="Upload Guarantor’s Form" />
      <UploadRow label="Upload Degree Certificate" />

      {/* BOTTOM BUTTON */}
      <View style={styles.footer}>
        <HrButton
          title="Upload Documents"
          active
          style={styles.mainButton}
        />
      </View>
    </ScrollView>
  );
};

export default JobDocs;

/* ---------------------------- */
/* Upload Row                   */
/* ---------------------------- */
const UploadRow = ({ label }: { label: string }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.uploadWrapper}>
        <View style={styles.inputPlaceholder} />

        <HrButton
          title="Upload"
          active
          style={styles.uploadButton}
        />
      </View>
    </View>
  );
};

/* ---------------------------- */
/* Styles                       */
/* ---------------------------- */
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: HR_THEME.card.radius,
    width: "100%",
  },

  desktopContainer: {
    maxWidth: 1000,
    alignSelf: "center",
    padding: 32,
  },

  title: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 28,
  },

  row: {
    marginBottom: 26,
  },

  label: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 14,
  },

  uploadWrapper: {
    flexDirection: "row",
    backgroundColor: HR_THEME.input.bg,
    borderRadius: HR_THEME.input.radius,
    overflow: "hidden",
    alignItems: "center",
  },

  inputPlaceholder: {
    flex: 1,
    height: 56,
  },

  uploadButton: {
    width: 160, // ✅ matches screenshot
    height: 56,
    borderRadius: 0, // flush right edge
  },

  footer: {
    marginTop: 52,
    alignItems: "center",
  },

  mainButton: {
    width: 280, // ✅ screenshot width
    height: 60,
  },
});
