import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';

// OpenRouter API configuration
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

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
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Alice AI, your AutoIntelli assistant. I can help you with information about our IT operations management solutions including NMS, OpsDuty, IntelliFlow, Securita, IntelliDesk, and IntelliAsset. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Initialize connection
  useEffect(() => {
    // Check if API key is configured
    if (OPENROUTER_API_KEY) {
      setIsConnected(true);
      console.log('OpenRouter API configured');
    } else {
      console.warn('OpenRouter API key not configured. Using fallback responses.');
      setIsConnected(true); // Still show as connected for fallback mode
    }
  }, []);

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  // Call OpenRouter API with Mistral 7B
  const callOpenRouterAPI = async (userMessage) => {
    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    console.log('API Key configured:', !!OPENROUTER_API_KEY);
    console.log('Sending request to OpenRouter...');

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AutoIntelli ChatBot'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newHistory
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Choices:', data.choices);
      console.log('First choice:', data.choices?.[0]);
      console.log('Message:', data.choices?.[0]?.message);
      
      const assistantMessage = data.choices?.[0]?.message?.content || data.choices?.[0]?.text;

      if (!assistantMessage) {
        console.error('Could not extract message from response:', JSON.stringify(data, null, 2));
        throw new Error('No response from API');
      }

      // Update conversation history
      setConversationHistory([
        ...newHistory,
        { role: 'assistant', content: assistantMessage }
      ]);

      return assistantMessage;
    } catch (error) {
      console.error('OpenRouter API error:', error);
      return "I apologize, but I'm having trouble connecting right now. Please try again or contact support@autointelli.com for assistance.";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent page scroll when hovering over chatbot window
  const handleChatWindowMouseEnter = () => {
    document.body.style.overflow = 'hidden';
  };

  const handleChatWindowMouseLeave = () => {
    document.body.style.overflow = '';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    if (!isConnected) {
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
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await callOpenRouterAPI(userInput);
      addBotMessage(botResponse);
    } catch (error) {
      console.error('Error processing message:', error);
      addBotMessage("I apologize, but I encountered an error. Please try again or contact support@autointelli.com for assistance.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm Alice AI, your AutoIntelli assistant. I can help you with information about our IT operations management solutions including NMS, OpsDuty, IntelliFlow, Securita, IntelliDesk, and IntelliAsset. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setConversationHistory([]); // Clear conversation history for LLM
  };

  return (
    <div className="chatbot-container">
      {/* Chat Icon Button */}
      <button
        className={`chatbot-icon-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
        title="Chat with Alice AI"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chatbot-window"
          onMouseEnter={handleChatWindowMouseEnter}
          onMouseLeave={handleChatWindowMouseLeave}
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
              onClick={() => setIsOpen(false)}
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
              type="text"
              className="chatbot-input"
              placeholder={isConnected ? "Type your message..." : "Connecting..."}
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
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fill="currentColor"/>
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
