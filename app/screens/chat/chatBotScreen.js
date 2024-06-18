import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { sendMessageToTextCortex } from '../../services/chatBotService';

function ChatBotScreen({navigation}) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages([...messages, userMessage]);

    const botMessage = await sendMessageToTextCortex(inputText);
    setMessages([...messages, userMessage, { text: botMessage, sender: 'bot' }]);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <Text key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4E4E4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ChatBotScreen;
