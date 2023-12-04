import React, { useDebugValue, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

// TELA DE LOGIN

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("user credential", userCredential);
    console.log("user details", user);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text style={{ marginRight: 10 }}>Carregando...</Text>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text
              style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}
            >
              Entrar
            </Text>
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
              Entra na sua conta
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="black"
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  width: 300,
                  marginLeft: 13,
                  marginVertical: 10,
                }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholderTextColor="black"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  width: 300,
                  marginLeft: 13,
                  marginVertical: 20,
                }}
              />
            </View>

            <Pressable
              onPress={login}
              style={{
                width: 200,
                backgroundColor: "#169",
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {/* BOTÃO DE LOGAR */}
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                Login
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                Não tem conta? Cadastre-se
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
