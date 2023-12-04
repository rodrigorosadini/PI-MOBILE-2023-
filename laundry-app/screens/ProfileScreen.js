import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Pressable style={{ marginVertical: 10 }}>
        <Text>Bem Vindo {user.email}</Text>
      </Pressable>
      <Pressable
        style={{
          margin: 10,
          borderRadius: 7,
          padding: 15,
          backgroundColor: "red",
          borderWidth: 2,
        }}
        onPress={signOutUser}
      >
        <Text style={{ color: "white" }}>Desconectar</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
