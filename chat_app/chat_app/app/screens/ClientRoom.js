import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";

import io from "socket.io-client";
import RoomCreate from "../../components/form/RoomCreate";
import { createSession } from "../../auth/auth";

const socket = io.connect("http://192.168.10.19:3001");

const ClientRoom = ({ navigation }) => {
  const joinRoom = (email, session) => {
    if (email !== "" && session !== "") {
      socket.emit("join_room", session);
    }
  };

  async function Create_Session({ email, session }) {
    try {
      const response = await createSession(email, session);
      if (response.status === 200) {
        joinRoom(email, session);
        navigation.navigate("ClientWaiting", {
          socket: socket,
          email: email,
          sname: session,
        });
      } else {
        Alert.alert(response.data);
      }
    } catch (error) {
      Alert.alert("Session Creation Failed", error.msg);
    }
  }

  return <RoomCreate onCreate={Create_Session} />;
};

export default ClientRoom;

const styles = StyleSheet.create({});
