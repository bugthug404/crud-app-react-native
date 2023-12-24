import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native"; // Assuming Button is a custom component
import { UserModel } from "../utils/user-model";
import { useAuth } from "../utils/auth-hook";
import { useAtomValue } from "jotai";
import { userDataAtom } from "../utils/user-atom";

export default function UserCard({
  user,
  setEditId,
  isAdmin,
}: {
  isAdmin: boolean;
  user: UserModel;
  setEditId: Function;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // await userControl.deleteUser(user.id.toString());
      // Handle successful deletion (e.g., notify user or navigate back)
    } catch (error: any) {
      // Handle error gracefully
      Alert.alert("Error", error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Replace <Loader /> with appropriate loading indicator */}
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
    // Adapt styling for React Native layout
    // Example:
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
  details: {
    // Adjust as needed
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});