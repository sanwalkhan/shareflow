// src/components/Hero.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile, WINDOW } from "../constants/theme";

export default function Hero({ onLoginPress }: { onLoginPress: () => void }) {
  return (
    <View style={styles.hero}>
      {/* Background Elements */}
      <View style={styles.backgroundBase} />
      <View style={styles.backgroundGlow} />
      <View style={styles.backgroundPattern}>
        {/* You can use an SVG or custom View here for the pattern */}
      </View>
      
      <View style={styles.heroContent}>
        <View style={styles.left}>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Enterprise Grade</Text>
              <View style={styles.badgeGlow} />
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Financial Intelligence{"\n"}
              <Text style={styles.titleAccent}>Reimagined</Text>
            </Text>
            <View style={styles.titleUnderline} />
          </View>

          <Text style={styles.subtitle}>
            Streamline expense tracking, automate payroll, and unlock powerful shareholder insights with a single platform.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryButton} onPress={onLoginPress}>
              <View style={styles.primaryBackground} />
              <Text style={styles.primaryText}>Start Free Trial</Text>
              <Feather name="arrow-right" size={18} color="#000" style={styles.buttonIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.watchButton}>
              <View style={styles.watchBackground} />
              <Feather name="play-circle" size={20} color={COLORS.accent} />
              <Text style={styles.watchText}>Watch Demo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <View style={styles.statBackground} />
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Companies</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statBackground} />
              <Text style={styles.statNumber}>$2.1B+</Text>
              <Text style={styles.statLabel}>Managed</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statBackground} />
              <Text style={styles.statNumber}>99.7%</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
          </View>
        </View>

        {!isMobile && (
          <View style={styles.previewSection}>
            <View style={styles.previewContainer}>
              <View style={styles.previewGlow} />
              <View style={styles.previewCard}>
                <View style={styles.previewHeader}>
                  <View style={styles.dots}>
                    <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
                    <View style={[styles.dot, { backgroundColor: COLORS.accent }]} />
                    <View style={[styles.dot, { backgroundColor: COLORS.neutral }]} />
                  </View>
                </View>

                <View style={styles.chartContainer}>
                  <View style={styles.chartGrid} />
                  <View style={styles.bars}>
                    <View style={styles.barGroup}>
                      <View style={[styles.bar, { height: 60 }]} />
                      <View style={styles.barLabel} />
                    </View>
                    <View style={styles.barGroup}>
                      <View style={[styles.bar, { height: 120 }]} />
                      <View style={styles.barLabel} />
                    </View>
                    <View style={styles.barGroup}>
                      <View style={[styles.bar, { height: 80 }]} />
                      <View style={styles.barLabel} />
                    </View>
                    <View style={styles.barGroup}>
                      <View style={[styles.bar, { height: 150 }]} />
                      <View style={styles.barLabel} />
                    </View>
                    <View style={styles.barGroup}>
                      <View style={[styles.bar, { height: 100 }]} />
                      <View style={styles.barLabel} />
                    </View>
                  </View>
                </View>
                
                <View style={styles.previewFooter}>
                  <View style={styles.footerLine} />
                  <View style={styles.footerLine} />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  hero: {
    minHeight: isMobile ? height * 0.8 : height * 0.72,
    position: 'relative',
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: 1500,
  },
  backgroundBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.neutral,
  },
  backgroundGlow: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.accent,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    // backgroundImage is not supported in React Native
    // backgroundImage: `radial-gradient(circle at 25% 25%, rgba(74, 144, 226, 0.03) 0%, transparent 50%)`,
  },
  heroContent: {
    flex: 1,
    flexDirection: isMobile ? "column" : "row",
    alignItems: "flex-start",
    paddingTop: isMobile ? 90 : 110,
    paddingHorizontal: isMobile ? 20 : 40,
    paddingBottom: isMobile ? 40 : 60,
  },
  left: { 
    flex: 1, 
    maxWidth: 720,
    zIndex: 10,
  },
  badgeContainer: {
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "rgba(250,237,38,0.08)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(250,237,38,0.15)",
    position: 'relative',
    overflow: 'hidden',
  },
  badgeGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(250,237,38,0.3)",
  },
  badgeText: { 
    color: COLORS.accent, 
    fontWeight: "700", 
    fontSize: 13,
    letterSpacing: 0.5,
  },
  titleContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  title: { 
    color: '#FFFFFF', 
    fontSize: isMobile ? 32 : 48, 
    fontWeight: "800", 
    lineHeight: isMobile ? 38 : 56,
    letterSpacing: -0.8,
    textShadowColor: 'rgba(255,255,255,0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleAccent: { 
    color: COLORS.accent,
    textShadowColor: 'rgba(74, 144, 226, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  titleUnderline: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    width: 120,
    height: 4,
    backgroundColor: COLORS.accent,
    opacity: 0.3,
    borderRadius: 2,
  },
  subtitle: { 
    color: 'rgba(255,255,255,0.85)', 
    marginVertical: 12, 
    fontSize: isMobile ? 14 : 18, 
    lineHeight: 24,
    letterSpacing: -0.2,
    maxWidth: 520,
  },
  actions: { 
    flexDirection: isMobile ? "column" : "row", 
    alignItems: "center", 
    marginTop: 16,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.accent,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  primaryBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.accent,
    opacity: 0.95,
  },
  primaryText: { 
    color: '#000', 
    fontWeight: "800",
    fontSize: 16,
    marginRight: 8,
    letterSpacing: -0.2,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  watchBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  watchText: { 
    color: 'rgba(255,255,255,0.9)', 
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 15,
  },
  buttonIcon: {
    opacity: 0.9,
  },
  stats: { 
    flexDirection: isMobile ? "column" : "row", 
    marginTop: 32,
    gap: 16,
  },
  statItem: {
    marginRight: 24,
    padding: 16,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    minWidth: 120,
  },
  statBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
  },
  statNumber: { 
    color: '#FFFFFF', 
    fontSize: isMobile ? 24 : 28, 
    fontWeight: "800",
    textShadowColor: 'rgba(255,255,255,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: { 
    color: 'rgba(255,255,255,0.6)', 
    fontSize: 13, 
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  previewSection: {
    marginLeft: 24,
    width: 360,
    zIndex: 10,
  },
  previewContainer: {
    position: 'relative',
  },
  previewGlow: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: -20,
    bottom: -20,
    backgroundColor: COLORS.accent,
    opacity: 0.05,
    borderRadius: 24,
    // blurRadius is not supported in React Native styles
  },
  previewCard: {
    backgroundColor: "rgba(20,20,22,0.95)",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  previewHeader: {
    marginBottom: 16,
  },
  dots: {
    flexDirection: "row",
  },
  dot: { 
    width: 12, 
    height: 12, 
    borderRadius: 6, 
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  chartContainer: {
    height: 200,
    position: 'relative',
    marginBottom: 16,
  },
  chartGrid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: '100%',
    paddingVertical: 20,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  bar: {
    width: 16,
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    minHeight: 40,
    marginBottom: 8,
    shadowColor: COLORS.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  barLabel: {
    width: 20,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  previewFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    gap: 8,
  },
  footerLine: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    width: '60%',
  },
});