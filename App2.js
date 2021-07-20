import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "./firebase"
import image from './assets/danny.jpg';

export default function App() {
  const [messages, setMessages] = useState([]);
    useEffect(() => {
      db.collection("Chats").doc("mysecondchat").get().then((snapshot) => {
          setMessages(snapshot.data().messages);

          // console.log(snapshot.id);
          // console.log(snapshot.data());
        });
    }, []);
  const onSend = useCallback((messages = []) => {
    db.collection("Chats").doc("mysecondchat").set({messages: messages});
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ //current blue bubble
        _id: 1,
        name: "Danny",
        avatar:"https://media-exp3.licdn.com/dms/image/C4D03AQEFvrwB5rWj8w/profile-displayphoto-shrink_200_200/0/1626311526253?e=1631750400&v=beta&t=TfCkkpTb0heW3mqd3D_4z0OpuA2q5YH7BnO8hXYWR0c"
      }}
      inverted = {true}
      placeholder = {"Enter your meesage"}
      showUserAvatar={true}
    />
  );
}