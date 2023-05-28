import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";

const LoadingOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.comb_circle}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>
      <View style={{ justifyContent: "center", alignContent: "center" }}>
        <Text style={styles.message}>{message}</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
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
  message: {
    fontSize: 16,
    marginBottom: 12,
    alignSelf: "center",
  },
});
