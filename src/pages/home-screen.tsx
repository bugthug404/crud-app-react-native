import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Center from "../components/center";
import { useAuth } from "../utils/auth-hook";
import Button from "../components/button";
import { useAtomValue } from "jotai";
import { userDataAtom } from "../utils/user-atom";
import { useUsers } from "../utils/user-list-hook";
import UserCard from "../components/user-card";
import AddUserModal from "../components/add-user-modal";
import EditUserModal from "../components/edit-user-modal";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const auth = useAuth();
  const user = useAtomValue(userDataAtom);
  const users = useUsers();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number>();

  return (
    <Center>
      <AddUserModal open={open} setOpen={setOpen} />
      <EditUserModal
        editId={editId}
        setEditId={setEditId}
        userList={users.users}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <Button title="Logout" onPress={() => auth.logout()} bg="red" />
        <Button title="Add User" onPress={() => setOpen(true)} />
      </View>
      <View>
        <Text>
          Name: {user?.firstName} {user?.lastName}
        </Text>
        <Text>Email: {user?.email}</Text>
        <Text>
          Mobile: {user?.mobile} {editId}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "#00000033",
          height: 1,
          width: "100%",
        }}
      />
      {users.users?.map((u) => {
        return (
          <UserCard
            key={u.id}
            user={u}
            setEditId={setEditId}
            isAdmin={user?.role === "admin"}
            refetch={users.refetch}
            isMe={u?.id === user?.id}
          />
        );
      })}
    </Center>
  );
}
