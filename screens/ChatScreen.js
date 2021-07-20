import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "firebase/app";

export default function ChatScreen({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  
  const {chat} = route.params;

  useEffect(() => {
    let unsubscribeFromNewSnapshots = db
      .collection("Chats")
      .doc(chat)
      .onSnapshot((snapshot) => {
        console.log("New Snapshot!");
        setMessages(snapshot.data().messages);
      });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    db.collection("Chats")
      .doc(chat)
      .update({
        // arrayUnion appends the message to the existing array
        messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
      });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: "1",
        name: "Ashwin",
        avatar: "https://avatars.githubusercontent.com/u/31493110?s=400&u=238b4841c472846285b57e671d1d238930feb214&v=4",
      }}
      inverted={true}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}