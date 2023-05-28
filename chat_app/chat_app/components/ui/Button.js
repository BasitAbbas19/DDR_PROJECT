import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Button = ({ onPress, children, backc, width, fsize, fcolor, isdis }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        { width: width, alignSelf: "center" },
      ]}
      disabled={isdis}
    >
      <View style={[styles.button, { backgroundColor: backc }]}>
        <Text
          style={{
            color: fcolor,
            alignSelf: "center",
            fontSize: fsize,
          }}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    // padding: "5%",
    borderRadius: Platform.OS === "ios" ? "30%" : 30,
    padding: 10,
    marginTop: "2%",
  },
  pressed: {
    opacity: 0.5,
  },
});
