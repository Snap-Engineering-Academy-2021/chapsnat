import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "firebase/app";

export default function ChatScreen({ route, navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribeFromNewSnapshots = db
      .collection("Chats")
      .doc(route.params.chat)
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
      .doc(route.params.chat)
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
        avatar: "https://lh3.googleusercontent.com/ogw/ADea4I6RD4MBWv5CWPpuDGUopm06OWDn8QaCV4YZPdVYVg=s83-c-mo",
      }}
      inverted={true}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}