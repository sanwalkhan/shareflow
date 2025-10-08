import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const isMobile = width < 768;
const isSmallMobile = width < 375;

// Color scheme from your palette
const COLORS = {
  accent: "#faed26",      // Bright Yellow
  primary: "#46344e",     // Dark Purple
  secondary: "#5a5560",   // Medium Purple
  tertiary: "#9d8d8f",    // Muted Pink
  neutral: "#9b986f",     // Olive Green
  white: "#ffffff",
  black: "#000000",
  textLight: "#f8f9fa",
  textDark: "#2d3748",
};

export default function LandingScreen({
  onLoginPress,
}: {
  onLoginPress: () => void;
}) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Animated Header */}
      <Animated.View style={[
        styles.header,
        {
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity,
        }
      ]}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Feather name="trending-up" size={isMobile ? 20 : 24} color={COLORS.accent} />
            </View>
            <Text style={styles.logo}>
              Share<Text style={styles.logoAccent}>Flow</Text>
            </Text>
          </View>
          
          {/* Mobile Menu Button */}
          {isMobile ? (
            <TouchableOpacity style={styles.mobileMenuBtn}>
              <Feather name="menu" size={24} color={COLORS.white} />
            </TouchableOpacity>
          ) : (
            <View style={styles.nav}>
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navLink}>Features</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navLink}>Solutions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navLink}>Pricing</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtn} onPress={onLoginPress}>
                <LinearGradient
                  colors={[COLORS.accent, "#e6d422"]}
                  style={styles.navBtnGradient}
                >
                  <Text style={styles.navBtnText}>Resgister as Company</Text>
                  <Feather name="arrow-right" size={16} color={COLORS.primary} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary, "#6a6375"]}
          style={styles.hero}
        >
          <View style={styles.heroBackground}>
            <View style={[styles.floatingOrb, styles.orb1]} />
            <View style={[styles.floatingOrb, styles.orb2]} />
            <View style={[styles.floatingOrb, styles.orb3]} />
          </View>
          
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Enterprise Grade</Text>
            </View>
            
            <Text style={styles.heroTitle}>
              Financial Intelligence{"\n"}
              <Text style={styles.heroTitleAccent}>Reimagined</Text>
            </Text>
            
            <Text style={styles.heroSubtitle}>
              Streamline expense tracking, automate payroll, and unlock powerful 
              shareholder insights with our AI-driven financial platform.
            </Text>

            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.primaryCta} onPress={onLoginPress}>
                <LinearGradient
                  colors={[COLORS.accent, "#e6d422"]}
                  style={styles.primaryCtaGradient}
                >
                  <Text style={styles.primaryCtaText}>Start Free Trial</Text>
                  <Feather name="arrow-right" size={20} color={COLORS.primary} />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryCta}>
                <Text style={styles.secondaryCtaText}>Watch Demo</Text>
                <Feather name="play-circle" size={20} color={COLORS.tertiary} />
              </TouchableOpacity>
            </View>

            <View style={styles.heroStats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Companies</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNumber}>$2.1B+</Text>
                <Text style={styles.statLabel}>Managed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNumber}>99.7%</Text>
                <Text style={styles.statLabel}>Uptime</Text>
              </View>
            </View>
          </View>

          {!isMobile && (
            <View style={styles.heroVisual}>
              <View style={styles.dashboardPreview}>
                <View style={styles.dashboardHeader}>
                  <View style={styles.dashboardDots}>
                    <View style={[styles.dot, styles.dotRed]} />
                    <View style={[styles.dot, styles.dotYellow]} />
                    <View style={[styles.dot, styles.dotGreen]} />
                  </View>
                </View>
                <View style={styles.dashboardContent}>
                  <View style={[styles.chartBar, { height: 60 }]} />
                  <View style={[styles.chartBar, { height: 120 }]} />
                  <View style={[styles.chartBar, { height: 80 }]} />
                  <View style={[styles.chartBar, { height: 150 }]} />
                  <View style={[styles.chartBar, { height: 100 }]} />
                </View>
              </View>
            </View>
          )}
        </LinearGradient>

        {/* Trust Bar */}
        <View style={styles.trustBar}>
          <Text style={styles.trustText}>Trusted by industry leaders</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.trustScroll}
            contentContainerStyle={styles.trustScrollContent}
          >
            {["TechCorp", "GlobalBank", "InnovateCo", "FutureInc", "NextGen", "AlphaTech"].map((logo, index) => (
              <View key={logo} style={styles.trustLogo}>
                <Text style={styles.trustLogoText}>{logo}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Features Section */}
        <View style={styles.features}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionBadge}>POWERFUL FEATURES</Text>
            <Text style={styles.sectionTitle}>
              Everything Your Business Needs
            </Text>
            <Text style={styles.sectionSubtitle}>
              Advanced tools designed to simplify complex financial operations and drive growth
            </Text>
          </View>

          <View style={styles.featureGrid}>
            <FeatureCard
              icon="bar-chart-2"
              title="Advanced Analytics"
              text="Real-time insights with predictive analytics and custom reporting dashboards"
              gradient={[COLORS.accent, "#e6d422"]}
            />
            <FeatureCard
              icon="shield"
              title="Enterprise Security"
              text="Bank-grade encryption and compliance with global financial regulations"
              gradient={[COLORS.neutral, "#8a8765"]}
            />
            <FeatureCard
              icon="zap"
              title="Smart Automation"
              text="AI-powered workflows that automate repetitive tasks and reduce errors"
              gradient={[COLORS.tertiary, "#8c7d7f"]}
            />
          </View>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={[COLORS.secondary, COLORS.primary]}
          style={styles.ctaSection}
        >
          <View style={styles.ctaBackground}>
            <View style={styles.ctaOrb} />
          </View>
          
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>
              Ready to Transform Your Financial Operations?
            </Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of companies already using ShareFlow to drive growth and efficiency
            </Text>
            
            <TouchableOpacity style={styles.ctaButton} onPress={onLoginPress}>
              <LinearGradient
                colors={[COLORS.accent, "#e6d422"]}
                style={styles.ctaButtonGradient}
              >
                <Text style={styles.ctaButtonText}>Get Started Today</Text>
                <Feather name="arrow-up-right" size={20} color={COLORS.primary} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Testimonials */}
        <View style={styles.testimonials}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionBadge}>TESTIMONIALS</Text>
            <Text style={styles.sectionTitle}>
              Trusted by Industry Leaders
            </Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.testimonialScroll}
            contentContainerStyle={styles.testimonialScrollContent}
          >
            <TestimonialCard
              name="Sarah Chen"
              role="CFO, TechCorp"
              text="ShareFlow transformed our financial operations. The automation features saved us 40+ hours monthly."
            />
            <TestimonialCard
              name="Marcus Johnson"
              role="CEO, InnovateCo"
              text="The analytics dashboard provided insights we never had before. Game-changing for strategic decisions."
            />
            <TestimonialCard
              name="Elena Rodriguez"
              role="Finance Director, GlobalBank"
              text="Implementation was seamless and the support team is exceptional. Highly recommended for enterprises."
            />
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerMain}>
              <View style={styles.footerBrand}>
                <View style={styles.footerLogo}>
                  <Feather name="trending-up" size={isMobile ? 20 : 24} color={COLORS.accent} />
                </View>
                <Text style={styles.footerLogoText}>
                  Share<Text style={styles.footerLogoAccent}>Flow</Text>
                </Text>
                <Text style={styles.footerTagline}>
                  Enterprise financial intelligence platform
                </Text>
                
                <View style={styles.socialLinks}>
                  <TouchableOpacity style={styles.socialLink}>
                    <Feather name="twitter" size={20} color={COLORS.tertiary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialLink}>
                    <Feather name="linkedin" size={20} color={COLORS.tertiary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialLink}>
                    <Feather name="facebook" size={20} color={COLORS.tertiary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footerLinks}>
                <View style={styles.footerColumn}>
                  <Text style={styles.footerColumnTitle}>Product</Text>
                  {["Features", "Solutions", "Pricing", "Updates"].map((item) => (
                    <TouchableOpacity key={item} style={styles.footerLink}>
                      <Text style={styles.footerLinkText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.footerColumn}>
                  <Text style={styles.footerColumnTitle}>Company</Text>
                  {["About", "Careers", "Blog", "Press"].map((item) => (
                    <TouchableOpacity key={item} style={styles.footerLink}>
                      <Text style={styles.footerLinkText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {!isMobile && (
                  <View style={styles.footerColumn}>
                    <Text style={styles.footerColumnTitle}>Resources</Text>
                    {["Documentation", "Help Center", "Community", "Contact"].map((item) => (
                      <TouchableOpacity key={item} style={styles.footerLink}>
                        <Text style={styles.footerLinkText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.footerBottom}>
              <Text style={styles.copyright}>
                © {new Date().getFullYear()} ShareFlow Technologies. All rights reserved.
              </Text>
              
              <View style={styles.footerLegal}>
                <TouchableOpacity>
                  <Text style={styles.legalLink}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.legalLink}>Terms of Service</Text>
                </TouchableOpacity>
                {!isMobile && (
                  <TouchableOpacity>
                    <Text style={styles.legalLink}>Cookie Policy</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Mobile Floating CTA */}
      {isMobile && (
        <View style={styles.mobileFloatingCta}>
          <TouchableOpacity style={styles.mobileCtaButton} onPress={onLoginPress}>
            <LinearGradient
              colors={[COLORS.accent, "#e6d422"]}
              style={styles.mobileCtaGradient}
            >
              <Text style={styles.mobileCtaText}>Start Free Trial</Text>
              <Feather name="arrow-right" size={20} color={COLORS.primary} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

/* ---------------- COMPONENTS ---------------- */
function FeatureCard({
  icon,
  title,
  text,
  gradient,
}: {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  text: string;
  gradient: readonly [string, string, ...string[]];
}) {
  return (
    <View style={styles.featureCard}>
      <LinearGradient colors={gradient} style={styles.featureIconContainer}>
        <Feather name={icon} size={isMobile ? 20 : 24} color={COLORS.primary} />
      </LinearGradient>
      
      <Text style={styles.featureCardTitle}>{title}</Text>
      <Text style={styles.featureCardText}>{text}</Text>
      
      <TouchableOpacity style={styles.featureLink}>
        <Text style={styles.featureLinkText}>Learn more</Text>
        <Feather name="arrow-right" size={16} color={COLORS.accent} />
      </TouchableOpacity>
    </View>
  );
}

function TestimonialCard({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) {
  return (
    <View style={styles.testimonialCard}>
      <View style={styles.testimonialQuote}>
        <Feather name="message-square" size={24} color={COLORS.accent} />
      </View>
      <Text style={styles.testimonialText}>{text}</Text>
      <View style={styles.testimonialAuthor}>
        <Text style={styles.testimonialName}>{name}</Text>
        <Text style={styles.testimonialRole}>{role}</Text>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // Header Styles
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: `${COLORS.primary}ee`,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: isMobile ? 16 : 24,
    paddingVertical: isMobile ? 12 : 16,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: isMobile ? 8 : 12,
  },
  logoIcon: {
    width: isMobile ? 36 : 40,
    height: isMobile ? 36 : 40,
    borderRadius: isMobile ? 10 : 12,
    backgroundColor: "rgba(250, 237, 38, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(250, 237, 38, 0.2)",
  },
  logo: {
    fontSize: isMobile ? 20 : 24,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: COLORS.accent,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: isMobile ? 4 : 8,
  },
  navItem: {
    paddingHorizontal: isMobile ? 12 : 16,
    paddingVertical: isMobile ? 6 : 8,
  },
  navLink: {
    fontSize: isMobile ? 14 : 15,
    fontWeight: "500",
    color: COLORS.tertiary,
    letterSpacing: -0.2,
  },
  navBtn: {
    marginLeft: isMobile ? 8 : 8,
  },
  navBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: isMobile ? 16 : 20,
    paddingVertical: isMobile ? 8 : 10,
    borderRadius: isMobile ? 10 : 12,
  },
  navBtnText: {
    color: COLORS.primary,
    fontSize: isMobile ? 14 : 15,
    fontWeight: "600",
  },
  mobileMenuBtn: {
    padding: 8,
  },

  // Hero Section
  hero: {
    minHeight: isMobile ? height * 0.8 : height * 0.9,
    paddingTop: isMobile ? 100 : 120,
    paddingBottom: isMobile ? 60 : 80,
    paddingHorizontal: isMobile ? 16 : 24,
    position: "relative",
  },
  heroBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingOrb: {
    position: "absolute",
    borderRadius: 9999,
    opacity: 0.1,
  },
  orb1: {
    width: isMobile ? 200 : 400,
    height: isMobile ? 200 : 400,
    backgroundColor: COLORS.accent,
    top: isMobile ? -100 : -200,
    right: isMobile ? -50 : -100,
  },
  orb2: {
    width: isMobile ? 150 : 300,
    height: isMobile ? 150 : 300,
    backgroundColor: COLORS.neutral,
    bottom: isMobile ? -75 : -150,
    left: isMobile ? -50 : -100,
  },
  orb3: {
    width: isMobile ? 100 : 200,
    height: isMobile ? 100 : 200,
    backgroundColor: COLORS.tertiary,
    top: "40%",
    right: isMobile ? "10%" : "20%",
  },
  heroContent: {
    maxWidth: isMobile ? "100%" : 600,
    alignSelf: "flex-start",
    width: "100%",
    marginTop: isMobile ? -5 : -10,
  },
  heroBadge: {
    backgroundColor: "rgba(250, 237, 38, 0.1)",
    paddingHorizontal: isMobile ? 10 : 12,
    paddingVertical: isMobile ? 4 : 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(250, 237, 38, 0.2)",
    marginBottom: isMobile ? 16 : 24,
  },
  heroBadgeText: {
    color: COLORS.accent,
    fontSize: isMobile ? 10 : 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: isMobile ? (isSmallMobile ? 32 : 36) : 60,
    fontWeight: "800",
    lineHeight: isMobile ? (isSmallMobile ? 38 : 42) : 68,
    letterSpacing: -0.5,
    marginBottom: isMobile ? 12 : 16,
    textAlign: isMobile ? "center" : "left",
  },
  heroTitleAccent: {
    color: COLORS.accent,
  },
  heroSubtitle: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 16 : 20,
    lineHeight: isMobile ? 24 : 32,
    marginBottom: isMobile ? 30 : 40,
    letterSpacing: -0.3,
    textAlign:"left",
  },
  heroActions: {
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    gap: isMobile ? 12 : 16,
    marginBottom: isMobile ? 40 : 60,
    width: "100%",
  },
  primaryCta: {
    borderRadius: isMobile ? 14 : 16,
    overflow: "hidden",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    width: isMobile ? "100%" : "auto",
  },
  primaryCtaGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: isMobile ? 24 : 32,
    paddingVertical: isMobile ? 16 : 18,
    justifyContent: "center",
  },
  primaryCtaText: {
    color: COLORS.primary,
    fontSize: isMobile ? 16 : 18,
    fontWeight: "700",
  },
  secondaryCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: isMobile ? 24 : 24,
    paddingVertical: isMobile ? 16 : 18,
    width: isMobile ? "100%" : "auto",
    justifyContent: "center",
  },
  secondaryCtaText: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 16 : 18,
    fontWeight: "600",
  },
  heroStats: {
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    gap: isMobile ? 16 : 32,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    color: COLORS.white,
    fontSize: isMobile ? 28 : 32,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 12 : 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statDivider: {
    width: isMobile ? 1 : 1,
    height: isMobile ? 20 : 40,
    backgroundColor: "rgba(157, 141, 143, 0.3)",
  },
  heroVisual: {
    position: "absolute",
    right: 24,
    top: "50%",
    transform: [{ translateY: -150 }],
  },
  dashboardPreview: {
    width: isMobile ? 300 : 400,
    height: isMobile ? 200 : 300,
    backgroundColor: "rgba(70, 52, 78, 0.8)",
    borderRadius: isMobile ? 16 : 24,
    padding: isMobile ? 12 : 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  dashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: isMobile ? 16 : 24,
  },
  dashboardDots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: isMobile ? 8 : 12,
    height: isMobile ? 8 : 12,
    borderRadius: isMobile ? 4 : 6,
  },
  dotRed: { backgroundColor: "#ef4444" },
  dotYellow: { backgroundColor: COLORS.accent },
  dotGreen: { backgroundColor: COLORS.neutral },
  dashboardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: isMobile ? 8 : 16,
    paddingHorizontal: isMobile ? 4 : 8,
    justifyContent: "space-between",
  },
  chartBar: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: 6,
    minHeight: 40,
  },

  // Trust Bar
  trustBar: {
    backgroundColor: COLORS.secondary,
    paddingVertical: isMobile ? 30 : 40,
    paddingHorizontal: isMobile ? 16 : 24,
  },
  trustText: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 12 : 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: isMobile ? 16 : 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  trustScroll: {
    flexGrow: 0,
  },
  trustScrollContent: {
    paddingHorizontal: isMobile ? 8 : 0,
  },
  trustLogos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: isMobile ? 32 : 48,
    flexWrap: "wrap",
  },
  trustLogo: {
    paddingHorizontal: isMobile ? 16 : 20,
    paddingVertical: isMobile ? 8 : 12,
  },
  trustLogoText: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 14 : 16,
    fontWeight: "700",
    opacity: 0.7,
  },

  // Features Section
  features: {
    paddingVertical: isMobile ? 60 : 120,
    paddingHorizontal: isMobile ? 16 : 24,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  sectionHeader: {
    maxWidth: 600,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: isMobile ? 40 : 80,
  },
  sectionBadge: {
    color: COLORS.accent,
    fontSize: isMobile ? 10 : 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: isMobile ? 12 : 16,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: isMobile ? 28 : 48,
    fontWeight: "800",
    textAlign: "center",
    color: COLORS.primary,
    lineHeight: isMobile ? 36 : 56,
    letterSpacing: -0.5,
    marginBottom: isMobile ? 12 : 16,
  },
  sectionSubtitle: {
    fontSize: isMobile ? 16 : 20,
    color: COLORS.secondary,
    textAlign: "center",
    lineHeight: isMobile ? 24 : 32,
    letterSpacing: -0.3,
    paddingHorizontal: isMobile ? 16 : 0,
  },
  featureGrid: {
    maxWidth: 1200,
    alignSelf: "center",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 20 : 24,
    width: "100%",
  },
  featureCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: isMobile ? 16 : 24,
    padding: isMobile ? 20 : 32,
    borderWidth: 1,
    borderColor: COLORS.tertiary + "20",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: isMobile ? 0 : 0,
  },
  featureIconContainer: {
    width: isMobile ? 50 : 60,
    height: isMobile ? 50 : 60,
    borderRadius: isMobile ? 12 : 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: isMobile ? 16 : 24,
  },
  featureCardTitle: {
    fontSize: isMobile ? 20 : 24,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: isMobile ? 8 : 12,
    letterSpacing: -0.5,
  },
  featureCardText: {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.secondary,
    lineHeight: isMobile ? 20 : 24,
    marginBottom: isMobile ? 16 : 24,
  },
  featureLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureLinkText: {
    color: COLORS.accent,
    fontSize: isMobile ? 14 : 16,
    fontWeight: "600",
  },

  // CTA Section
  ctaSection: {
    paddingVertical: isMobile ? 60 : 120,
    paddingHorizontal: isMobile ? 16 : 24,
    position: "relative",
    overflow: "hidden",
  },
  ctaBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ctaOrb: {
    position: "absolute",
    width: isMobile ? 300 : 600,
    height: isMobile ? 300 : 600,
    borderRadius: isMobile ? 150 : 300,
    backgroundColor: "rgba(250, 237, 38, 0.1)",
    top: isMobile ? -150 : -300,
    right: isMobile ? -150 : -300,
  },
  ctaContent: {
    maxWidth: 600,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  ctaTitle: {
    fontSize: isMobile ? 28 : 48,
    fontWeight: "800",
    color: COLORS.white,
    textAlign: "center",
    lineHeight: isMobile ? 36 : 56,
    letterSpacing: -0.5,
    marginBottom: isMobile ? 12 : 16,
  },
  ctaSubtitle: {
    fontSize: isMobile ? 16 : 20,
    color: COLORS.tertiary,
    textAlign: "center",
    lineHeight: isMobile ? 24 : 32,
    marginBottom: isMobile ? 30 : 48,
    letterSpacing: -0.3,
    paddingHorizontal: isMobile ? 16 : 0,
  },
  ctaButton: {
    borderRadius: isMobile ? 14 : 16,
    overflow: "hidden",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    width: isMobile ? "100%" : "auto",
  },
  ctaButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: isMobile ? 32 : 40,
    paddingVertical: isMobile ? 16 : 20,
    justifyContent: "center",
  },
  ctaButtonText: {
    color: COLORS.primary,
    fontSize: isMobile ? 16 : 18,
    fontWeight: "700",
  },

  // Testimonials
  testimonials: {
    paddingVertical: isMobile ? 60 : 80,
    paddingHorizontal: isMobile ? 16 : 24,
    backgroundColor: COLORS.white,
  },
  testimonialScroll: {
    flexGrow: 0,
  },
  testimonialScrollContent: {
    paddingHorizontal: isMobile ? 16 : 24,
    gap: isMobile ? 16 : 24,
  },
  testimonialCard: {
    width: isMobile ? width - 64 : 350,
    backgroundColor: COLORS.white,
    borderRadius: isMobile ? 16 : 20,
    padding: isMobile ? 20 : 24,
    borderWidth: 1,
    borderColor: COLORS.tertiary + "20",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  testimonialQuote: {
    marginBottom: 16,
  },
  testimonialText: {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.secondary,
    lineHeight: isMobile ? 20 : 24,
    marginBottom: 20,
    fontStyle: "italic",
  },
  testimonialAuthor: {
    borderTopWidth: 1,
    borderTopColor: COLORS.tertiary + "20",
    paddingTop: 16,
  },
  testimonialName: {
    fontSize: isMobile ? 16 : 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  testimonialRole: {
    fontSize: isMobile ? 14 : 15,
    color: COLORS.tertiary,
  },

  // Footer
  footer: {
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerContent: {
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: isMobile ? 16 : 24,
    paddingVertical: isMobile ? 40 : 80,
  },
  footerMain: {
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    marginBottom: isMobile ? 32 : 48,
    gap: isMobile ? 32 : 48,
  },
  footerBrand: {
    flex: 1,
  },
  footerLogo: {
    width: isMobile ? 40 : 48,
    height: isMobile ? 40 : 48,
    borderRadius: isMobile ? 10 : 12,
    backgroundColor: "rgba(250, 237, 38, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(250, 237, 38, 0.2)",
    marginBottom: isMobile ? 12 : 16,
  },
  footerLogoText: {
    fontSize: isMobile ? 20 : 24,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: isMobile ? 6 : 8,
    letterSpacing: -0.5,
  },
  footerLogoAccent: {
    color: COLORS.accent,
  },
  footerTagline: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 14 : 16,
    lineHeight: isMobile ? 20 : 24,
    marginBottom: isMobile ? 20 : 24,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 16,
  },
  socialLink: {
    width: isMobile ? 36 : 40,
    height: isMobile ? 36 : 40,
    borderRadius: isMobile ? 8 : 10,
    backgroundColor: "rgba(157, 141, 143, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(157, 141, 143, 0.2)",
  },
  footerLinks: {
    flex: isMobile ? 1 : 2,
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 24 : 48,
  },
  footerColumn: {
    flex: 1,
    marginBottom: isMobile ? 20 : 0,
  },
  footerColumnTitle: {
    color: COLORS.white,
    fontSize: isMobile ? 16 : 16,
    fontWeight: "700",
    marginBottom: isMobile ? 12 : 16,
  },
  footerLink: {
    marginBottom: isMobile ? 8 : 12,
  },
  footerLinkText: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 14 : 15,
    fontWeight: "500",
  },
  footerBottom: {
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
    paddingTop: isMobile ? 24 : 32,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    gap: isMobile ? 16 : 16,
  },
  copyright: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 12 : 14,
  },
  footerLegal: {
    flexDirection: "row",
    gap: isMobile ? 16 : 24,
    flexWrap: "wrap",
  },
  legalLink: {
    color: COLORS.tertiary,
    fontSize: isMobile ? 12 : 14,
  },

  // Mobile Floating CTA
  mobileFloatingCta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(70, 52, 78, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  mobileCtaButton: {
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  mobileCtaGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: "center",
  },
  mobileCtaText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});