import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Image,
  View,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import VendRegister from "../../components/form/VendRegister";
import { RegisterUser } from "../../auth/auth";

const ServersignupScreen = ({ navigation, props }) => {
  const [isAuthentication, setAuthentication] = useState(false);
  async function SignupHandler({ email, password }) {
    setAuthentication(true);
    try {
      const response = await RegisterUser(email, password);
      if (response.status === 200) {
        navigation.navigate("Vendorwaiting", {
          email: response.data,
        });
      } else {
        Alert.alert(response.data);
        setAuthentication(false);
      }
    } catch (error) {
      Alert.alert("Signup Failed", error.msg);
      setAuthentication(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Signing you in ..." />;
  }
  return <VendRegister onAuthenticate={SignupHandler} />;
};

export default ServersignupScreen;

const styles = StyleSheet.create({});
