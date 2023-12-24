import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Center from "../components/center";
import LabeledInput from "../components/labeled-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextButton from "../components/text-button";
import Button from "../components/button";
import { useAuth } from "../utils/auth-hook";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginScreen({ navigation }: { navigation: any }) {
  const auth = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "jelly@bean.com",
      password: "123123",
    },
  });

  const onSubmit = (data: any) => {
    auth.login(data);
  };

  return (
    <Center>
      <LabeledInput
        label="Email"
        control={control}
        name={"email"}
        error={errors.email?.message}
      />
      <LabeledInput
        label="Password"
        control={control}
        name={"password"}
        error={errors.password?.message}
      />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text>Don't have an account? </Text>
        <TextButton
          children={"Signup"}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </Center>
  );
}
