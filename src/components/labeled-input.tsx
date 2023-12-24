import React from "react";
import { TextInput, View, Text } from "react-native";
import { UseFormRegisterReturn, useController } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<TextInput> {
  label: string;
  placeholder?: string;
  control?: any;
  name: string;
  error: any;
  type?: string;
}

export default function LabeledInput({
  control,
  label,
  name,
  error,
}: InputProps) {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });
  return (
    <View style={{ width: "100%", marginBottom: 16 }}>
      <Text>{label}</Text>
      <TextInput
        style={{
          width: "100%",
          padding: 8,
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "transparent",
        }}
        value={field.value}
        onChangeText={field.onChange}
        // placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

      <Text
        style={{
          position: "absolute",
          fontSize: 12,
          color: "red",
          bottom: error ? -14 : 0,
          opacity: error ? 1 : 0,
        }}
      >
        {error}
      </Text>
    </View>
  );
}
