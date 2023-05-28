import axios from "axios";
import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

export async function loginUser(email, password) {
  const response = await axios.put(`http://192.168.10.19:3300/login`, {
    email: email,
    password: password,
  });
  return response;
}

export async function createUser(email, password) {
  const response = await axios.post(`http://192.168.10.19:3300/vendor`, {
    email: email,
    password: password,
  });
  return response;
}

export async function createSession(email, session) {
  const response = await axios.post(
    "http://192.168.10.19:3300/create_session",
    {
      email: email,
      sname: session,
    }
  );
  return response;
}
