import React from "react";
import { Modal, View } from "react-native";

export default function MyModal({ visible, children, onRequestClose }: any) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <View className="flex-1 justify-center items-center p-6">
        <View className="bg-white rounded-2xl p-4 w-full max-w-md">{children}</View>
      </View>
    </Modal>
  );
}
