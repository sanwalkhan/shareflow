import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";


const COLORS = {
  primary: "#193288",
  adminBubble: "#E6F0FF",
  userBubble: "#FFC20E",
  textDark: "#111827",
};

type Message = {
  id: string;
  text: string;
  sender: "admin" | "shareholder";
  time: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello Admin, I have a question about dividend distribution.",
    sender: "shareholder",
    time: "10:20 AM",
  },
  {
    id: "2",
    text: "Sure, please tell me.",
    sender: "admin",
    time: "10:21 AM",
  },
  {
    id: "3",
    text: "When will this quarter’s profit be released?",
    sender: "shareholder",
    time: "10:22 AM",
  },
];

const AdminMessage: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarAnim = useRef(new Animated.Value(-280)).current; // mobile sidebar animation
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setIsMobile(window.width < 768);
      if (window.width >= 768) setShowSidebar(false);
    });
    return () => sub.remove();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input, sender: "admin", time: "Now" },
    ]);
    setInput("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const openSidebar = () => {
    setShowSidebar(true);
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -280,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setShowSidebar(false));
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#F4F7FF", minWidth: 360 }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primary]}
          style={{
            paddingVertical: 18,
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={openSidebar}>
                <Ionicons name="menu-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginLeft: 12 }}>
              Messages
            </Text>
          </View>
        </LinearGradient>

        {/* CHAT AREA */}
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ padding: 16 }}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((msg) => {
              const isAdmin = msg.sender === "admin";
              return (
                <View
                  key={msg.id}
                  style={{
                    alignSelf: isAdmin ? "flex-end" : "flex-start",
                    backgroundColor: isAdmin ? COLORS.adminBubble : COLORS.userBubble,
                    padding: 12,
                    borderRadius: 14,
                    maxWidth: "80%",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ color: COLORS.textDark }}>{msg.text}</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: 4,
                      textAlign: "right",
                      opacity: 0.6,
                    }}
                  >
                    {msg.time}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* INPUT */}
          <View
            style={{
              flexDirection: "row",
              padding: 12,
              borderTopWidth: 1,
              borderColor: "#E5E7EB",
              backgroundColor: "#fff",
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type message..."
              style={{
                flex: 1,
                backgroundColor: "#F1F5F9",
                borderRadius: 10,
                paddingHorizontal: 12,
                height: 44,
              }}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                marginLeft: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingHorizontal: 16,
                justifyContent: "center",
              }}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobile && showSidebar && (
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />
        </TouchableWithoutFeedback>
      )}
      {isMobile && showSidebar && (
        <Animated.View
          style={{
            position: "absolute",
            left: sidebarAnim,
            top: 0,
            bottom: 0,
            width: 280,
            backgroundColor: "#fff",
            elevation: 10,
          }}
        >
          <Sidebar activeTab="messages" onSelect={closeSidebar} />
        </Animated.View>
      )}
    </View>
  );
};

export default AdminMessage;
