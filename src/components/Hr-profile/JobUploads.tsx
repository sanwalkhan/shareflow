import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { COLORS, HR_THEME } from "../../Constants/theme";
import HrButton from "./Components/HrButton";

import PdfIcon from "../../assets/Group.png";

const documents = [
  { id: 1, name: "Signed Offer Letter.pdf" },
  { id: 2, name: "Birth Certificate.pdf" },
  { id: 3, name: "Guarantor's Form.pdf" },
  { id: 4, name: "Degree Certificate.pdf" },
  { id: 5, name: "John Doe CV.pdf" },
  { id: 6, name: "Adrian Doe CV.pdf" },
];

const JobUploads: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* TITLE */}
      <Text style={styles.title}>Job Details / View Documents</Text>

      {/* DOCUMENT GRID */}
      <View style={styles.grid}>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.card}>
            <Image source={PdfIcon} style={styles.icon} />

            <Text style={styles.fileType}>pdf-svgrep…</Text>

            <Text style={styles.fileName} numberOfLines={2}>
              {doc.name}
            </Text>
          </View>
        ))}
      </View>

      {/* DOWNLOAD BUTTON */}
      <View style={styles.buttonWrapper}>
        <HrButton
          title="Download All (Zip)"
          active
          style={styles.downloadButton}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

export default JobUploads;

const styles = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: COLORS.white,
    borderRadius: HR_THEME.card.radius,
  },

  title: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 32,
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 24,
  },

  card: {
    flexBasis: "30%",      // ✅ 3 columns per row
    maxWidth: "30%",       // ✅ hard limit
    backgroundColor: HR_THEME.sidebar.inactiveBg,
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  icon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    marginBottom: 10,
  },

  fileType: {
    fontFamily: HR_THEME.fonts.body,
    fontSize: 11,
    color: HR_THEME.text.muted,
    marginBottom: 6,
  },

  fileName: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.black,
    textAlign: "center",
  },

  /* BUTTON */
  buttonWrapper: {
    marginTop: 48,
    alignItems: "center",
  },

  downloadButton: {
    width: 240,
    height: 52,
    borderRadius: 14,
  },
});
