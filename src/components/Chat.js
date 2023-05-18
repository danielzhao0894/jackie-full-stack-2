import React, { useState, useEffect } from 'react';
import { NonceProvider } from 'react-select';

export default function Chat(props) {
    const [messages, setMessages] = useState([
      {
        sender: "ChatGPT",
        message: "I'm Jackie, your helpful canine assistant. I have limitations and won't always get it right, but I'll try my best. Start off by uploading your health insurance documents on the sidebar to the left.",
      },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [chatGptResponse, setChatGptResponse] = useState("");
    const [chatGptSuggestions, setChatGptSuggestions] = useState("");

    function handleSubmit(e) {
      
      console.log("handleSubmit ran")

      e.preventDefault();

      setMessages((prevMessages) => {
        return [...prevMessages, { sender: "You", message: newMessage }];
      });

      console.log("New Message: " + newMessage)
      console.log("is somebody out there?")

      if (props.acceptedFiles.length === 0) {
        setMessages((prevMessages) => {
          return [...prevMessages, { sender: "ChatGPT", message: "Please upload a file first." }];
        });

        setNewMessage("");

        return;
      }

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

      // For some reason this useEffect runs a few times when the page loads
      if (chatGptResponse === "") {
        return;
      }

      setMessages((prevMessages) => {
        return [
          ...prevMessages, 
          { sender: "ChatGPT", message: chatGptResponse }];
      });
      }, [chatGptResponse]);
      
      useEffect(() => {
        console.log("UseEffect ran");
      
        if (props.acceptedFiles.length === 0) {
          return;
        } else {
          fetch(`/query?text=$"List three questions that the user could ask to clarify their understanding of this document`, {
            method: 'GET',
            headers: {},
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
              setChatGptSuggestions(data.text);
              console.log("ChatGPT Response: " + data.text);
              console.log("New Message: " + newMessage);
      
              setMessages(prevMessages => [
                ...prevMessages,
                {
                  sender: "ChatGPT",
                  message: "Your file has been successfully uploaded."}
              ]);
            })
            .catch(error => {
              console.error('Error:', error);
              console.log("Error uploading file");
              throw error;
            });
        }
      }, [props.acceptedFiles]);
      
    
      

    return (
      <div className="flex flex-col p-4 m-8 rounded-lg bg-blue-100 h-screen overflow-hidden">
          <div className="flex-1 p-4 overflow-auto">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  } mb-4 ${message.sender !== "You" ? "items-start" : "items-end"}`}
                >
                {message.sender === "ChatGPT" && (
                  <img
                    src="/jackie.png"
                    alt="ChatGPT Icon"
                    className="w-6 h-6 mr-2 rounded-lg bg-tr"
                  />
                )}
                <div
                  className={`p-2 rounded-lg ${
                  message.sender === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-900"
                    }`}
                    style={{
                      justifyContent: message.sender === "You" ? "flex-end" : "flex-start",
                    }}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
          </div>
          <div>
            <form onSubmit={handleSubmit} className = "p-4">
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
              <p className="text-center text-gray-500 text-sm pb-4">
              Jackie.ai may display inaccurate or offensive information. Use at your own discretion.
              </p>
          </div>
      </div>
    );
    
    
    
    
  };