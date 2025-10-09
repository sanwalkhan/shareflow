// src/components/Footer.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../constants/theme";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = ["Features", "Solutions", "Pricing", "API", "Documentation"];
  const companyLinks = ["About", "Careers", "Blog", "Press", "Partners"];
  const supportLinks = ["Help Center", "Contact", "Status", "Security", "Compliance"];

  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundBase} />
      <View style={styles.backgroundPattern} />
      <View style={styles.backgroundAccent} />
      
      <View style={styles.content}>
        {/* Main Footer Content */}
        <View style={styles.mainSection}>
          {/* Brand Section */}
          <View style={styles.brandSection}>
            <View style={styles.brandContainer}>
              <View style={styles.logo}>
                <Feather name="trending-up" size={24} color={COLORS.accent} />
              </View>
              <Text style={styles.brandText}>
                Share<Text style={styles.brandAccent}>Flow</Text>
              </Text>
            </View>
            <Text style={styles.tagline}>
              Enterprise financial intelligence platform powering the world's most innovative companies.
            </Text>
            
            {/* Social Links */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Feather name="twitter" size={18} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Feather name="linkedin" size={18} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Feather name="github" size={18} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Links Grid */}
          <View style={styles.linksGrid}>
            <View style={styles.linkColumn}>
              <Text style={styles.columnTitle}>Product</Text>
              {productLinks.map((link) => (
                <TouchableOpacity key={link} style={styles.linkItem}>
                  <Text style={styles.linkText}>{link}</Text>
                  <View style={styles.linkUnderline} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.linkColumn}>
              <Text style={styles.columnTitle}>Company</Text>
              {companyLinks.map((link) => (
                <TouchableOpacity key={link} style={styles.linkItem}>
                  <Text style={styles.linkText}>{link}</Text>
                  <View style={styles.linkUnderline} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.linkColumn}>
              <Text style={styles.columnTitle}>Support</Text>
              {supportLinks.map((link) => (
                <TouchableOpacity key={link} style={styles.linkItem}>
                  <Text style={styles.linkText}>{link}</Text>
                  <View style={styles.linkUnderline} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.legalLinks}>
            <TouchableOpacity style={styles.legalLink}>
              <Text style={styles.legalText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.legalLink}>
              <Text style={styles.legalText}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.legalLink}>
              <Text style={styles.legalText}>Cookie Policy</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyright}>
            © {currentYear} ShareFlow Technologies. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 1500,
  },
  backgroundBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A0A0A',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.02,
    // backgroundImage is not supported in React Native
    // backgroundImage: `radial-gradient(circle at 80% 20%, rgba(74, 144, 226, 0.1) 0%, transparent 50%)`,
  },
  backgroundAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.accent,
    opacity: 0.1,
  },
  content: {
    paddingVertical: isMobile ? 48 : 64,
    paddingHorizontal: isMobile ? 20 : 40,
    position: 'relative',
    zIndex: 10,
  },
  mainSection: {
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  brandSection: {
    flex: 1,
    marginBottom: isMobile ? 32 : 0,
    maxWidth: isMobile ? '100%' : 320,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: "800",
    marginLeft: 12,
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: COLORS.accent,
  },
  tagline: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  linksGrid: {
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 32 : 48,
  },
  linkColumn: {
    minWidth: isMobile ? '100%' : 160,
  },
  columnTitle: {
    color: '#FFFFFF',
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  linkItem: {
    marginBottom: 12,
    position: 'relative',
  },
  linkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    letterSpacing: -0.2,
  },
  linkUnderline: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 0,
    height: 1,
    backgroundColor: COLORS.accent,
    opacity: 0,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 24,
  },
  bottomSection: {
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
  },
  legalLinks: {
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 8 : 24,
    marginBottom: isMobile ? 16 : 0,
  },
  legalLink: {
    paddingVertical: 4,
  },
  legalText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  copyright: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    textAlign: isMobile ? "left" : "center",
    letterSpacing: 0.2,
  },
});