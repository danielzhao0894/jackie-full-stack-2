import React, { useState, useEffect } from 'react';
import { NonceProvider } from 'react-select';

export default function Chat() {
    const [messages, setMessages] = useState([
      {
        sender: "ChatGPT",
        message: "Hi, how can I help you today?",
      },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [chatGptResponse, setChatGptResponse] = useState("");

    function handleSubmit(e) {
      
      console.log("handleSubmit ran")

      e.preventDefault();

      setMessages((prevMessages) => {
        return [...prevMessages, { sender: "You", message: newMessage }];
      });

      console.log("New Message: " + newMessage)
      console.log("is somebody out there?")

      fetch(`/query?text=${newMessage}`, {
        method: 'GET',
        headers: {
        },
      })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully!');
          return response.json();
        } else {
          throw new Error('Error uploading file');
        }
      })
      .then(data => {
        setChatGptResponse(data.text);
        console.log("ChatGPT Response: " + data.text);
        console.log("New Message: " + newMessage);
      })
      .catch(error => {
        console.error('Error:', error);
        console.log("Error uploading file")
        throw error;
      });
      
      console.log("New Message: " + newMessage)
      console.log("ChatGPT Response: " + chatGptResponse)
/* 
      setMessages((prevMessages) => {
        return [...prevMessages, { sender: "ChatGPT", message: chatGptResponse }];
      }); */

      setNewMessage("");
      // setChatGptResponse("");
    }

    useEffect(() => {
      console.log("UseEffect ran")
      setMessages((prevMessages) => {
        return [
          ...prevMessages, 
          { sender: "ChatGPT", message: chatGptResponse }];
      });
    }, [chatGptResponse]);
      


    return (
      <div className="m-0 flex flex-col h-full rounded-lg border-2 border-gray-200 justify-end bg-#f9f9f9">
        `<div className="flex m-4 flex-col">
        {messages.map((message, i) => (
          <div 
            key={i} 
            className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} mb-4 ${message.sender !== "You" ? "items-start": "items-end"
          }`}
        >
          <div 
            className={`p-2 rounded-lg ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-white text-gray-900"}`}
            style={{ justifyContent: message.sender === "You" ? "flex-end" : "flex-start" }}
            >
              {message.message}
            </div>
          </div>
          ))
        }

        </div>`
        <form onSubmit={handleSubmit} className="m-4">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="rounded-lg border-gray-400 py-2 px-3 mr-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Type your message here..."
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors focus:outline-none focus:ring focus:border-blue-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  };