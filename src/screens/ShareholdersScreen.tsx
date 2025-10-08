import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShareholdersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Shareholders</Text>
      <Text style={styles.subtitle}>Manage company shareholders here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 16, color: '#555' },
});
