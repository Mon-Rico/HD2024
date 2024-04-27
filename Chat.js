// Chat.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
      <View style={styles.chatContainer}>
        {/* Chat messages can be rendered here */}
        <Text style={styles.message}>User: Hello!</Text>
        <Text style={styles.message}>Bot: Hi there!</Text>
        {/* Add more messages as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Chat;
