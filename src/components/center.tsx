import React, { Children, ReactNode } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheetProperties,
  View,
} from "react-native";

export default function Center({ children }: { children: ReactNode }) {
  return (
    <ScrollView automaticallyAdjustKeyboardInsets>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}
      >
        {children}
      </View>
    </ScrollView>
  );
}
