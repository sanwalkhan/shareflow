import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Notification } from "./types";
import NotificationItem from "./NotificationItem";

interface Props {
  visible: boolean;
  onClose: () => void;
  notifications: Notification[];
  onClearAll: () => void;
  onMarkAsRead?: (id: string) => void;
}

export default function NotificationModal({
  visible,
  onClose,
  notifications,
  onClearAll,
  onMarkAsRead,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <TouchableOpacity
        className="flex-1 bg-black/40 justify-center items-center p-6"
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ width: 340, maxHeight: "80%" }}
          onStartShouldSetResponder={() => true}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-200 bg-green-500">
            <View className="flex-row items-center">
              <Feather name="bell" size={18} color="#FFFFFF" />
              <Text className="text-white font-bold text-lg ml-2">Notifications</Text>
            </View>

            {notifications.length > 0 && (
              <TouchableOpacity onPress={onClearAll}>
                <Text className="text-white text-sm font-semibold">Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Body */}
          <ScrollView className="p-4">
            {notifications.length === 0 ? (
              <Text className="text-gray-500 text-center py-10">
                No notifications yet
              </Text>
            ) : (
              notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  item={n}
                  onPress={(id) => onMarkAsRead && onMarkAsRead(id)}
                />
              ))
            )}
          </ScrollView>

          {/* Footer */}
          <View className="border-t border-gray-200 p-3 bg-gray-50 items-center">
            <TouchableOpacity
              onPress={onClose}
              className="flex-row items-center justify-center px-4 py-2 bg-green-500 rounded-xl"
            >
              <Feather name="x" size={16} color="#FFFFFF" />
              <Text className="text-white font-semibold text-sm ml-2">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
