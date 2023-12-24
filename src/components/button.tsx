import React, { ReactNode } from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

export default function Button({
  title,
  onPress,
  color,
  bg,
}: {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  color?: string;
  bg?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bg || "blue",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 9999,
        width: "100%",
        display: "flex",
        flexShrink: 1,
      }}
    >
      <Text
        style={{
          color: color || "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title ?? "No Name"}
      </Text>
    </TouchableOpacity>
  );
}
