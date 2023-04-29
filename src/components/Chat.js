import React, { useState, useEffect } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([
      {
        sender: "ChatGPT",
        message: "Hi, how can I help you today?",
      },
    ]);
    const [newMessage, setNewMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setMessages([...messages, { sender: "You", message: newMessage }]);
      setNewMessage("");
    };
  
    return (
      <div className="p-6 h-screen flex flex-col justify-end bg-gray-100">
        <div className="flex-1 flex flex-col justify-end">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
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