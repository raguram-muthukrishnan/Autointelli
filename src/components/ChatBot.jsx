import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import './ChatBot.css';


// WebSocket configuration for chatbot (from environment variables)
const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'ws://195.201.164.158:8765/';
const WEBSOCKET_USER_ID = parseInt(import.meta.env.VITE_WEBSOCKET_USER_ID) || 2090364640;
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

// System prompt for AutoIntelli products - focused only on company products
const SYSTEM_PROMPT = `You are Alice AI, AutoIntelli's official assistant. ONLY answer questions about AutoIntelli products. For off-topic questions, politely redirect to AutoIntelli solutions.

PRODUCTS:
1. NMS (360) - AI-powered network monitoring. 80% alert reduction, 60% MTTR improvement. Monitors routers, switches, firewalls, cloud.
2. OpsDuty - Incident response & alert management. 90% noise reduction, automated ticketing.
3. IntelliFlow - Low-code IT automation. 70% MTTR reduction, workflow builder.
4. Securita - Browser-based remote access with Zero Trust security. No client installs.
5. Alice AI - AI chatbot for IT support, 24/7, L1 automation.
6. IntelliDesk - AI helpdesk platform. 50% faster resolution, multi-channel.
7. IntelliAsset - IT asset management. Track hardware, software, licenses.

CONTACT: sales@autointelli.com | support@autointelli.com
OFFERS: 30-day free trials, personalized demos available.

Be concise, professional, and always encourage demos for detailed info.`;

const ChatBot = () => {
  // Initialize isOpen from sessionStorage to persist across page navigation
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = sessionStorage.getItem('chatbot_is_open');
    return savedState === 'true';
  });
  const [userEmail, setUserEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sessionId] = useState(() => {
    // Generate a MongoDB ObjectId-like string (24 hex characters)
    return Array.from({length: 24}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  });
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [hasNewMessage, setHasNewMessage] = useState(false); // New message indicator
  const [hasPlayedSound, setHasPlayedSound] = useState(false); // Track if sound played
  const [chatCompleted, setChatCompleted] = useState(false); // Track if user finished chatting
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const notificationTimerRef = useRef(null);


  // Persist isOpen state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('chatbot_is_open', isOpen.toString());
  }, [isOpen]);

  // Persist messages to sessionStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chatbot_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Initialize connection and check session state
  useEffect(() => {
    // WebSocket chatbot is always available
    setIsConnected(true);
    console.log('WebSocket chatbot configured');

    // Check if user has completed chat (closed after chatting)
    const completed = sessionStorage.getItem('chatbot_completed');
    if (completed === 'true') {
      setChatCompleted(true);
      return; // Don't show notification or play sound
    }

    // Check if email is already captured in this session
    const storedEmail = sessionStorage.getItem('chatbot_email');

    // Try to restore messages from sessionStorage
    const storedMessages = sessionStorage.getItem('chatbot_messages');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.log('Could not restore messages:', error);
      }
    }

    if (storedEmail) {
      setUserEmail(storedEmail);
      setEmailSubmitted(true);
      // Show welcome message only if no stored messages
      if (!storedMessages) {
        setMessages([
          {
            id: 1,
            text: "Hi! I'm Alice AI, your AutoIntelli assistant. I can help you with information about our IT operations management solutions including NMS, OpsDuty, IntelliFlow, Securita, IntelliDesk, and IntelliAsset. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }
    } else {
      // Show email request message only if no stored messages
      if (!storedMessages) {
        setMessages([
          {
            id: 1,
            text: "Hi! I'm Alice AI 👋\n\nBefore we start, could you please share your email address? This helps us provide you with personalized assistance.",
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }
    }

    // Show new message indicator and play sound on first visit
    const hasVisited = sessionStorage.getItem('chatbot_visited');
    if (!hasVisited && !completed) {
      setHasNewMessage(true);
      playNotificationSound();
      sessionStorage.setItem('chatbot_visited', 'true');
    }
  }, []);

  // Play notification sound on page navigation (with interval)
  useEffect(() => {
    const completed = sessionStorage.getItem('chatbot_completed');
    if (completed === 'true') return; // Don't play if chat completed

    const hasVisited = sessionStorage.getItem('chatbot_visited');

    // If not first visit and chat not completed, play sound after delay
    if (hasVisited && !isOpen) {
      notificationTimerRef.current = setTimeout(() => {
        playNotificationSound();
        setHasNewMessage(true);
      }, 15000); // 15 seconds after page load
    }

    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, [isOpen]);

  // Play notification sound
  const playNotificationSound = () => {
    try {
      // Create audio element for notification sound
      const audio = new Audio('/notification_sound.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Audio play failed:', err));
      setHasPlayedSound(true);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  // Save interaction to backend
  const saveInteractionToBackend = async (email, firstMessage = null, updatedHistory = null) => {
    try {
      const historyToSave = updatedHistory || conversationHistory;
      
      const response = await fetch(`${STRAPI_URL}/api/chatbot-interactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            email: email,
            session_id: sessionId,
            source_page: window.location.pathname,
            first_message: firstMessage,
            conversation_history: historyToSave,
            total_messages: messages.filter(m => m.sender === 'user').length + 1 // +1 for current message
          }
        })
      });

      if (!response.ok) {
        console.error('Failed to save chatbot interaction');
      } else {
        console.log('✅ Chatbot interaction saved successfully');
      }
    } catch (error) {
      console.error('Error saving chatbot interaction:', error);
    }
  };

  // Handle email submission from chat input
  const handleEmailSubmitFromChat = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(inputValue.trim())) {
      addBotMessage("That doesn't look like a valid email address. Please enter a valid email (e.g., name@company.com)");
      setInputValue('');
      return;
    }

    const email = inputValue.trim();

    // Store email in session
    sessionStorage.setItem('chatbot_email', email);
    setUserEmail(email);
    setEmailSubmitted(true);
    setInputValue('');

    // Add user's email as a message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: email,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Save to backend
    await saveInteractionToBackend(email);

    // Show thank you message
    addBotMessage("Thank you! 🎉 I'm here to help. Feel free to ask me anything about AutoIntelli's products and services like NMS, OpsDuty, IntelliFlow, Securita, and more!");
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  // Call WebSocket chatbot API
  const callWebSocketAPI = async (userMessage) => {
    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    console.log('Sending request to WebSocket chatbot...');

    return new Promise((resolve) => {
      try {
        const ws = new WebSocket(WEBSOCKET_URL);
        let responseReceived = false;

        ws.onopen = () => {
          console.log('WebSocket connected');
          // Send message in the required format with authorized user_id
          const messagePayload = {
            user_id: WEBSOCKET_USER_ID,
            direction: "client",
            message: `${SYSTEM_PROMPT}\n\nUser: ${userMessage}`,
            conversationId: sessionId,
            createdAt: new Date().toISOString()
          };
          console.log('Sending:', messagePayload);
          ws.send(JSON.stringify(messagePayload));
        };

        ws.onmessage = (event) => {
          console.log('WebSocket response:', event.data);
          responseReceived = true;
          
          let assistantMessage;
          try {
            const data = JSON.parse(event.data);
            
            // Handle different response formats
            if (data.type === 'message' && data.message) {
              assistantMessage = data.message;
              // Remove "Alice AI: " prefix if present
              assistantMessage = assistantMessage.replace(/^Alice AI:\s*/i, '');
            } else if (data.response) {
              assistantMessage = data.response;
            } else if (data.message) {
              assistantMessage = data.message;
            } else {
              assistantMessage = event.data;
            }
          } catch (e) {
            assistantMessage = event.data;
          }

          // Update conversation history
          setConversationHistory([
            ...newHistory,
            { role: 'assistant', content: assistantMessage }
          ]);

          ws.close();
          resolve(assistantMessage);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          if (!responseReceived) {
            ws.close();
            resolve("I apologize, but I'm having trouble connecting right now. Please try again or contact support@autointelli.com for assistance.");
          }
        };

        ws.onclose = () => {
          console.log('WebSocket closed');
          if (!responseReceived) {
            resolve("I apologize, but I'm having trouble connecting right now. Please try again or contact support@autointelli.com for assistance.");
          }
        };

        // Timeout after 30 seconds
        setTimeout(() => {
          if (!responseReceived) {
            ws.close();
            resolve("Request timed out. Please try again.");
          }
        }, 30000);

      } catch (error) {
        console.error('WebSocket error:', error);
        resolve("I apologize, but I'm having trouble connecting right now. Please try again or contact support@autointelli.com for assistance.");
      }
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scroll - prevent page scroll only when chatbot can still scroll
  const chatWindowRef = useRef(null);

  const handleWheel = (e) => {
    const messagesContainer = e.currentTarget.querySelector('.chatbot-messages');
    if (!messagesContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Prevent page scroll if we're not at the boundaries
    if (
      (e.deltaY < 0 && !isAtTop) || // Scrolling up and not at top
      (e.deltaY > 0 && !isAtBottom)  // Scrolling down and not at bottom
    ) {
      e.stopPropagation();
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;
    if (!isConnected) {
      return;
    }

    // If email not submitted yet, treat input as email
    if (!emailSubmitted) {
      await handleEmailSubmitFromChat();
      return;
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue;
    const isFirstMessage = messages.filter(m => m.sender === 'user' && m.text !== userEmail).length === 0;
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await callWebSocketAPI(userInput);
      addBotMessage(botResponse);

      // Update backend with conversation - pass the updated history
      const storedEmail = sessionStorage.getItem('chatbot_email');
      if (storedEmail) {
        // Create the updated history with both user and bot messages
        const updatedHistory = [
          ...conversationHistory,
          { role: 'user', content: userInput },
          { role: 'assistant', content: botResponse }
        ];
        saveInteractionToBackend(storedEmail, isFirstMessage ? userInput : null, updatedHistory);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      addBotMessage("I apologize, but I encountered an error. Please try again or contact support@autointelli.com for assistance.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle opening chatbot
  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNewMessage(false); // Clear notification badge
  };

  // Handle closing chatbot
  const handleCloseChat = () => {
    setIsOpen(false);

    // If user has chatted (email submitted), mark chat as completed
    if (emailSubmitted) {
      sessionStorage.setItem('chatbot_completed', 'true');
      setChatCompleted(true);
    }
  };

  const handleClearChat = () => {
    const storedEmail = sessionStorage.getItem('chatbot_email');
    const newMessages = storedEmail ? [
      {
        id: 1,
        text: "Hi! I'm Alice AI, your AutoIntelli assistant. I can help you with information about our IT operations management solutions including NMS, OpsDuty, IntelliFlow, Securita, IntelliDesk, and IntelliAsset. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ] : [
      {
        id: 1,
        text: "Hi! I'm Alice AI 👋\n\nBefore we start, could you please share your email address? This helps us provide you with personalized assistance.",
        sender: 'bot',
        timestamp: new Date()
      }
    ];

    setMessages(newMessages);
    setConversationHistory([]); // Clear conversation history for LLM
    sessionStorage.setItem('chatbot_messages', JSON.stringify(newMessages)); // Update stored messages
  };

  return (
    <div className="chatbot-container">
      {/* Chat Icon Button */}
      {!chatCompleted && (
        <button
          className={`chatbot-icon-button ${isOpen ? 'hidden' : ''}`}
          onClick={handleOpenChat}
          aria-label="Open chat"
          title="Chat with Alice AI"
        >
          {hasNewMessage && <span className="notification-badge"></span>}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="chatbot-window"
          onWheel={handleWheel}
        >
          {/* Header with AI Image */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <span className="avatar-emoji">👩‍💻</span>
            </div>
            <div className="chatbot-header-text">
              <h3 className="chatbot-title">Alice AI</h3>
              <p className="chatbot-subtitle">
                {isConnected ? '🟢 Online' : '🔴 Connecting...'}
              </p>
            </div>
            <button
              className="chatbot-close-button"
              onClick={handleCloseChat}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${message.sender}`}
              >
                <div className="message-content">
                  {message.sender === 'bot' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
                {message.sender !== 'system' && (
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message bot">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>



          {/* Input Area */}
          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type={emailSubmitted ? "text" : "email"}
              className="chatbot-input"
              placeholder={
                !isConnected
                  ? "Connecting..."
                  : !emailSubmitted
                    ? "Enter your email address..."
                    : "Type your message..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading || !isConnected}
            />
            <button
              type="submit"
              className="chatbot-send-button"
              disabled={isLoading || !inputValue.trim() || !isConnected}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fill="currentColor" />
              </svg>
            </button>
          </form>

          {/* Footer Actions */}
          <div className="chatbot-footer">
            <button
              className="chatbot-clear-button"
              onClick={handleClearChat}
              title="Clear chat history"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
