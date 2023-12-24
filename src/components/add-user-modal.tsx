import React from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Button from "./button";
import LabeledInput from "./labeled-input";
import { useAuth } from "../utils/auth-hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../utils/create-user-schema";
import { useUserCrud } from "../utils/user-hook";

export default function AddUserModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const user = useUserCrud();

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
    user.addUser(data);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setOpen(false);
      }}
      style={{
        height: "100%",
      }}
    >
      <SafeAreaView
        style={{
          height: "100%",
          paddingTop: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            padding: 10,
            paddingTop: 20,
            borderRadius: 10,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 20,
              }}
            >
              Add User
            </Text>
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

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Button onPress={handleSubmit(onSubmit)} title="Submit" />
              <Button
                onPress={() => {
                  setOpen(false);
                }}
                bg="orange"
                title="Close"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
