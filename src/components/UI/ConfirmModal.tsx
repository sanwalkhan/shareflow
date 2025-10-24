import React from "react"
import { Modal, View, Text, TouchableOpacity } from "react-native"
import { COLORS } from "../../constants/theme"

interface ConfirmModalProps {
  visible: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ visible, title = "Confirm", message, confirmText = "Delete", cancelText = "Cancel", onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 justify-center items-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View className="bg-white rounded-2xl p-6 w-full max-w-md">
          <Text className="text-lg font-bold text-gray-900 mb-2">{title}</Text>
          <Text className="text-gray-700 mb-4">{message}</Text>
          <View className="flex-row justify-end gap-3">
            <TouchableOpacity className="px-5 py-3 border border-gray-300 rounded-xl" onPress={onCancel}>
              <Text className="text-gray-700 font-medium">{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-3 rounded-xl" style={{ backgroundColor: COLORS.error }} onPress={onConfirm}>
              <Text className="text-white font-semibold">{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}


