import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Center from "../components/center";
import LabeledInput from "../components/labeled-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/button";
import { useAuth } from "../utils/auth-hook";
import { createUserSchema } from "../utils/create-user-schema";

export default function SignupScreen({ navigation }: { navigation: any }) {
  // const userControl = useUser();

  const auth = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "Jelly",
      lastName: "Bean",
      email: "jelly@bean.com",
      mobile: "1234567890",
      profession: "NA",
      address: "iykyk",
      role: "even idk",
      password: "123123",
    },
  });

  const onSubmit = (data: any) => {
    auth.signup(data);
    alert(JSON.stringify(data));
  };

  return (
    <Center>
      <LabeledInput
        label="First Name"
        control={control}
        name="firstName"
        error={errors.firstName?.message}
      />
      <LabeledInput
        label="Last Name"
        control={control}
        name={"lastName"}
        error={errors.lastName?.message}
      />
      <LabeledInput
        label="Email"
        control={control}
        name={"email"}
        error={errors.email?.message}
      />
      <LabeledInput
        label="Mobile"
        control={control}
        name={"mobile"}
        error={errors.mobile?.message}
      />
      <LabeledInput
        label="Profession"
        control={control}
        name={"profession"}
        error={errors.profession?.message}
      />
      <LabeledInput
        label="Address"
        control={control}
        name={"address"}
        error={errors.address?.message}
      />
      <LabeledInput
        label="Role"
        control={control}
        name={"role"}
        error={errors.role?.message}
      />
      <LabeledInput
        label="Password"
        control={control}
        name={"password"}
        error={errors.password?.message}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)}></Button>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <Text>Already have an account? </Text>
        <TouchableOpacity
          children={
            <Text
              style={{
                color: "blue",
              }}
            >
              Login
            </Text>
          }
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </Center>
  );
}
