import { StyleSheet, Text, View } from "react-native";
import React from "react";

const VendorChatRoom = ({ route, navigation }) => {
  const { email } = route.params;
  const [status, setStatus] = useState(true);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [sname, getSession1] = useState("");
  const [cemail, getEmail1] = useState("Waiting for Client");
  const [swapscreens, setScreens] = useState(true);

  const [client1, getClient1] = useState(false);
  const [client2, getClient2] = useState(false);

  const [sname2, getSession2] = useState("");
  const [cemail2, getEmail2] = useState("Waiting for Client");

  const update_status = async () => {
    await axios
      .patch(`http://192.168.10.19:3300/update_status/${email}/${status}`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const update_client = async () => {
    await axios
      .put("http://192.168.10.19:3300/exit_chat", {
        email: email,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log("Updated");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const exitchat = async (room) => {
    await socket.emit("leave_room", room);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const room = swapscreens ? sname : sname2;
      const messageData = {
        room: room,
        author: email,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((List) => [...List, messageData]);
      setCurrentMessage("");
    }
  };

  const exit_chat = useCallback(
    (data) => {
      console.log(data);
      console.log(sname);
      if (data.localeCompare(sname) == 0) {
        console.log("this got hit");
        update_client();
        getEmail1("Waiting for Client");
        getSession1("");
        setMessageList([]);
        getClient1(false);
      } else {
        update_client();
        console.log("The second one got hit");
        getEmail2("Waiting for Client");
        getSession2("");
        setMessageList([]);
        getClient2(false);
      }
    },
    [sname]
  );

  useEffect(() => {
    socket.removeAllListeners("user_left");
    socket.on("user_left", exit_chat);
  }, [socket, exit_chat]);

  const receiveMessage = useCallback(
    (data) => {
      console.log(data.room);
      console.log("sname is  :" + sname);
      console.log("ans: " + data.room.localeCompare(sname));
      if (data.room.localeCompare(sname) == 0 && sname !== "") {
        setMessageList((List) => [...List, data]);
      } else if (sname2 !== "") {
        console.log("This one executed");
        setMessageList((List) => [...List, data]);
      }
    },
    [sname, sname2]
  );

  useEffect(() => {
    socket.removeAllListeners("receive_message");
    socket.on("receive_message", receiveMessage);
  }, [socket, receiveMessage]);

  const get_client = async () => {
    await axios
      .put("http://192.168.10.19:3300/get_client", {
        email: email,
      })
      .then(function (response) {
        if (response.status === 200) {
          if (client1 === false) {
            getClient1(true);
            getSession1(response.data["sname"]);
            getEmail1(response.data["client_email"]);
            socket.emit("join_room", response.data["sname"]);
            Alert.alert("Session " + response.data["sname"] + " joined");
          } else if (client2 === false) {
            getClient2(true);
            getSession2(response.data["sname"]);
            getEmail2(response.data["client_email"]);
            socket.emit("join_room", response.data["sname"]);
            Alert.alert("Session " + response.data["sname"] + " joined");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (client1 === false || client2 === false) {
        get_client();
        console.log("API called after for vendor ...");
        console.log(client1 + " and " + client2);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [client1, client2]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.comb_circle}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>

      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          Session Name:{swapscreens ? sname : sname2}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          Client Email:{swapscreens ? cemail : cemail2}
        </Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {messageList.map((messageContent, i) => {
            return (
              <View key={i}>
                <View>
                  <View style={styles.msgbody}>
                    <Text style={{ fontSize: 20, paddingLeft: "1%" }}>
                      {messageContent.message}
                    </Text>
                  </View>

                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ marginRight: "1%", marginLeft: "2.2%" }}>
                      {messageContent.time}
                    </Text>
                    <Text>{messageContent.author}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextInput
          placeholder="Enter Message..."
          style={styles.input}
          onChangeText={(text) => setCurrentMessage(text)}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={styles.exit}
            onPress={() => {
              setScreens(!swapscreens);
            }}
          >
            <Text style={{ alignSelf: "center", fontSize: 22 }}>
              {swapscreens ? "Client 2" : "Client 1"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exit}
            onPress={() => {
              update_status();
              setStatus(!status);
            }}
          >
            <Text style={{ alignSelf: "center", fontSize: 22 }}>
              {status ? "Live" : "Not Live"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              sendMessage();
            }}
          >
            <Text style={{ alignSelf: "center", fontSize: 22 }}>&#9658;</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VendorChatRoom;

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
  msgbody: {
    margin: "2%",
    borderWidth: 1,
  },
  body: {
    flex: 4,
    borderWidth: 1,
    margin: "2%",
    borderColor: "#F86464",
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: "#F86464",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F86464",
    padding: 15,
    marginLeft: "15%",
    // marginRight:'4%',
    marginBottom: "7%",
  },
  exit: {
    backgroundColor: "#F86464",
    borderRadius: 35,
    //  alignItems:'center',
    // alignSelf:'center',
    width: "30%",
    height: "40%",
    // marginLeft:'5%',
    marginTop: "3%",
  },
});
