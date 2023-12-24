import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/utils/auth-provider";
import ToastManager from "toastify-react-native";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <ToastManager />
        <AuthProvider></AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
