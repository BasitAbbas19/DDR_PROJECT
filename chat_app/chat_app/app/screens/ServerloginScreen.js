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
import React, { useState } from "react";
import axios from "axios";

import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { loginUser } from "../../auth/auth";
import VendLogin from "../../components/form/VendLogin";

const ServerloginScreen = ({ navigation }) => {
  const [isAuthentication, setAuthentication] = useState(false);
  async function loginHandler({ email, password }) {
    setAuthentication(true);
    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        navigation.navigate("Vendorwaiting", {
          email: response.data,
        });
      } else {
        Alert.alert(response.data);
        setAuthentication(false);
      }
    } catch (error) {
      Alert.alert("Login Failed", error.msg);
      setAuthentication(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Loggin you in ..." />;
  }
  return <VendLogin onAuthenticate={loginHandler} />;
};

export default ServerloginScreen;

const styles = StyleSheet.create({});
