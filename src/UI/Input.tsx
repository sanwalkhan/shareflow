import React from "react";
import { TextInput } from "react-native";

export default function Input(props: any) {
  return <TextInput {...props} className={`px-3 py-2 rounded-lg border border-gray-200 ${props.className ?? ""}`} />;
}
