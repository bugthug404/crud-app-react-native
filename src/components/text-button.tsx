import React, { ReactNode } from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

export default function TextButton({
  children,
  onPress,
  color,
}: {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{}}>
      <Text
        style={{
          color: color || "blue",
        }}
      >
        {children ?? "No Name"}
      </Text>
    </TouchableOpacity>
  );
}
