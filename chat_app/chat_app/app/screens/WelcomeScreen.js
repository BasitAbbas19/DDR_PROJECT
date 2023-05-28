//type rnfe in order to autocomplete the default page screen
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  View,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import VendorhomeScreen from "./VendorhomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Button from "../../components/ui/Button";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.comb_circle}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>
      <Text style={styles.header}>Welcome to PJD Chat App</Text>
      <Image style={styles.home} source={require("../assets/home.png")} />
      <View style={styles.client}>
        <Text style={styles.label}>Start As a Vendor</Text>

        <Button
          onPress={() => navigation.navigate("VendorHome")}
          fsize={15}
          fcolor={"black"}
          backc={"#F86464"}
          width={"80%"}
        >
          Vendor Side
        </Button>
      </View>
      <View style={styles.client}>
        <Text style={styles.label}>Start As a User</Text>
        <Button
          onPress={() => navigation.navigate("ClientRoom")}
          fsize={15}
          fcolor={"black"}
          backc={"#F86464"}
          width={"80%"}
        >
          User Side
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comb_circle: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },

  circle1: {
    width: "39%",
    height: "18%",
    borderRadius: 75,
    opacity: 0.48,
    backgroundColor: "#FF6B6B",
    top: "-1%",
    left: "-23%",
    position: "absolute",
  },
  circle2: {
    width: "30%",
    height: "18%",
    borderRadius: 75,
    opacity: 0.48,
    top: "-8%",
    left: "-4%",
    backgroundColor: "#FF6B6B",
  },
  header: {
    paddingTop: "25%",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 25,
  },
  home: {
    height: "45%",
    width: "85%",
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "10%",
  },
  client: {
    paddingTop: "3%",
  },
  label: {
    paddingLeft: "5%",
    fontSize: 20,
    alignSelf: "center",
  },
  button1: {
    marginTop: "2%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#F86464",
    padding: 10,
    borderRadius: 30,
    width: "80%",
  },
});

export default WelcomeScreen;
