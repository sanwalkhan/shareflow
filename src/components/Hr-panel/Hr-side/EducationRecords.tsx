import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EducationRecords = () => {
  return (
    <View style={styles.container}>
      
      {/* Academic Records */}
      <Text style={styles.sectionTitle}>Academic Records</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Jinnah University</Text>
        <Text style={styles.subTitle}>
          BS in Computer Science, May 2014 – May 2018
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Cathedral School</Text>
        <Text style={styles.subTitle}>2002 – June 2012</Text>
      </View>

      {/* Professional Qualifications */}
      <Text style={styles.sectionTitle}>Professional Qualifications</Text>

      <View style={styles.card}>
        <Text style={styles.title}>CCNA Certification</Text>
        <Text style={styles.subTitle}>
          Cisco Authorized Training, May 2019 – September 2019
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Google UI / UX Certification</Text>
        <Text style={styles.subTitle}>
          September 2021 – September 2022
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Web Developer</Text>
        <Text style={styles.subTitle}>
          E-Biz, May 2019 – September 2021
        </Text>
        <Text style={styles.description}>
          Collaborated with teammates to deliver valuable features meeting
          business and customer needs.
        </Text>
      </View>

    </View>
  );
};

export default EducationRecords;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,   // ⬅ more space below title
    marginTop: 28,     // ⬅ more space above section
    color: "#111",
  },

  card: {
    backgroundColor: "#EEF4FB",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,  // ⬅ more spacing between cards
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,   // ⬅ space between title & subtitle
  },

  subTitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,   // ⬅ space before next text (if any)
  },

  description: {
    fontSize: 13,
    color: "#444",
    marginTop: 8,      // ⬅ more breathing room
    lineHeight: 18,
  },
});
