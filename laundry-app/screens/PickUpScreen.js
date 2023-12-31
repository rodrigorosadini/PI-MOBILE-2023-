import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedTime, setSeletedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);

  // eslizacao da taxa de entrega

  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Dias",
    },
    {
      id: "1",
      name: "3-4 Dias",
    },
    {
      id: "2",
      name: "4-5 Dias",
    },
    {
      id: "3",
      name: "5-6 Dias",
    },
    {
      id: "4",
      name: "Amanhã",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00",
    },
    {
      id: "1",
      time: "12:00",
    },
    {
      id: "2",
      time: "13:00",
    },
    {
      id: "2",
      time: "14:00",
    },
    {
      id: "4",
      time: "15:00",
    },
    {
      id: "5",
      time: "16:00",
    },
  ];

  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Vazio ou Inválido",
        "Por favor preencha todos os campos",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelar Pressionado"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressionado ") },
        ],
        { cancelable: false }
      );
    }
    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart", {
        selectedTime: selectedTime,
        no_Of_days: delivery,
      });
    }
  };
  return (
    <>
      <SafeAreaView>
        {/* INPUT DE COLOCAR ENDEREÇO */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginHorizontal: 10,
            marginTop: 35,
          }}
        >
          Coloque o endereço
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />

        {/* BOTÃO DE ESCOLHER DATA */}

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Escolha uma data
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-12-01")}
          endDate={new Date("2023-12-31")}
          initialSelectedDate={new Date("")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        {/* BOTÃO DE ESCOLHER HORARIO */}

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Escolha um horário
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSeletedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 2,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Data de Entrega
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <Pressable
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 2,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
              onPress={() => setDelivery(item.name)}
              key={i}
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | R$ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Pode conter taxas extras
            </Text>
          </View>

          {/* BOTÃO FINALIZAR PEDIDO */}

          <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Ir para o carrinho
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
