import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native"; // Assuming Button is a custom component
import { UserModel } from "../utils/user-model";
import { useUserCrud } from "../utils/user-hook";

export default function UserCard({
  user,
  setEditId,
  isAdmin,
  refetch,
  isMe,
}: {
  isMe: boolean;
  isAdmin: boolean;
  user: UserModel;
  setEditId: Function;
  refetch: Function;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const userControl = useUserCrud();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (isMe) {
        return alert("cannot delete myself");
      } else {
        await userControl.deleteUser(user.id.toString());
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      refetch();
      setIsDeleting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {user?.firstName} {user.lastName}
      </Text>
      <Text style={styles.details}>{user?.email}</Text>
      <Text style={styles.details}>{user?.address}</Text>
      <Text style={styles.details}>{user?.mobile}</Text>
      {isAdmin && (
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => setEditId(user.id)} />
          <Button title="Delete" onPress={handleDelete} disabled={isDeleting} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 300,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
