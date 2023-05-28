import { StyleSheet, Text, View } from "react-native";

import React from "react";

const TextInput = ({
  label,
  icon_left,
  mode,
  secure,
  onUpdateValue,
  value,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        label={label}
        left={<TextInput.Icon name={icon_left} />}
        mode={mode}
        secureTextEntry={secure}
        value={value}
        onChangeText={onUpdateValue}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    width: 330,
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    // height: 50,
    // borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
});
