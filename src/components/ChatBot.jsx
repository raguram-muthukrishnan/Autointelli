import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Alice AI, your AutoIntelli assistant. I can help you with information about our IT operations management solutions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const userIdRef = useRef(null);

  // Initialize WebSocket connection
  useEffect(() => {
    // Get or create user ID
    let userId = localStorage.getItem('chat_user_id');
    if (!userId) {
      userId = Math.floor(Math.random() * 1000000000);
      localStorage.setItem('chat_user_id', userId);
    }
    userIdRef.current = userId;

    // Connect to WebSocket
    connectWebSocket();

    return () => {
      if (socketRef.current && typeof socketRef.current.close === 'function') {
        socketRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    // Option 2: Use Strapi backend for chatbot
    try {
      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://autointelli-bcgf.onrender.com';
      console.log('Connecting to Strapi chatbot at:', STRAPI_URL);
      
      // For now, enable mock chatbot since Strapi WebSocket needs setup
      // This will work immediately while you set up WebSocket on backend
      setIsConnected(true);
      console.log('Using Strapi-integrated chatbot (mock mode)');
      
      // Mock WebSocket object for message sending
      socketRef.current = { 
        readyState: 1,
        send: (data) => {
          console.log('Message would be sent to Strapi:', data);
        }
      };
    } catch (err) {
      console.error('Error setting up Strapi chatbot:', err);
      setIsConnected(false);
    }
  };

  const addSystemMessage = (text) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      sender: 'system',
      timestamp: new Date()
    }]);
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const generateIntelligentResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // AutoIntelli-specific responses
    if (input.includes('nms') || input.includes('network monitoring')) {
      return "Our NMS (Network Monitoring System) provides comprehensive network infrastructure monitoring with real-time alerts and analytics. It includes device discovery, performance monitoring, and automated alerting. Would you like to know more about specific features?";
    }
    
    if (input.includes('opsduty') || input.includes('ops duty')) {
      return "OpsDutyAI is our intelligent incident management platform that automates response workflows and reduces MTTR. It features AI-powered incident correlation, automated escalation, and seamless integration with your existing tools like ServiceNow and Jira.";
    }
    
    if (input.includes('intelliflow') || input.includes('intelli flow')) {
      return "IntelliFlow is our automation orchestration platform that streamlines IT operations with drag-and-drop workflow automation. Perfect for reducing manual tasks and improving operational efficiency! It supports complex workflows and integrates with 200+ tools.";
    }
    
    if (input.includes('alice') || input.includes('securita') || input.includes('helpdesk')) {
      return "We offer several specialized solutions: Alice AI for intelligent assistance, Securita for security operations, and IntelliDesk for IT service management. Each is designed to enhance your IT operations efficiency.";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return "Our solutions are competitively priced based on your specific needs and scale. We offer flexible licensing options including per-device, per-user, and enterprise packages. Contact our sales team at sales@autointelli.com for a custom quote and potential discounts.";
    }
    
    if (input.includes('demo') || input.includes('trial') || input.includes('free')) {
      return "Absolutely! We offer personalized live demos and 30-day free trials for all our products. You can schedule a demo through our contact page or request a trial account. Would you like me to help you get started with a specific product?";
    }
    
    if (input.includes('contact') || input.includes('support') || input.includes('help')) {
      return "You can reach our team at:\n• Sales: sales@autointelli.com\n• Support: support@autointelli.com\n• General: info@autointelli.com\n\nOur support team is available 24/7 to help with any questions or technical issues!";
    }
    
    if (input.includes('integration') || input.includes('api') || input.includes('connect')) {
      return "All our products offer robust API integrations and support 200+ popular tools including ServiceNow, Jira, Slack, Microsoft Teams, Splunk, and more. Our platform is designed for seamless integration with your existing infrastructure through REST APIs and webhooks.";
    }
    
    if (input.includes('feature') || input.includes('capability') || input.includes('what can')) {
      return "AutoIntelli's platform includes:\n• Real-time monitoring & alerting\n• AI-powered incident management\n• Workflow automation & orchestration\n• Advanced analytics & reporting\n• Multi-tenant architecture\n• 99.9% uptime SLA\n\nWhich area would you like to explore further?";
    }
    
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're very welcome! I'm here to help you understand how AutoIntelli can transform your IT operations. Feel free to ask me anything about our products, pricing, or schedule a demo!";
    }
    
    // General responses
    const generalResponses = [
      "I'm Alice AI, your AutoIntelli assistant! I can help you learn about our IT operations management solutions including NMS, OpsDutyAI, and IntelliFlow. What would you like to know?",
      "AutoIntelli specializes in intelligent IT operations management. Our AI-powered platform helps organizations automate monitoring, incident response, and workflow orchestration. How can I assist you today?",
      "I'm here to help you understand how AutoIntelli's solutions can improve your IT operations efficiency. We offer comprehensive monitoring, automation, and incident management tools. What specific area interests you most?",
      "Our products integrate AI and automation to streamline IT operations. We serve Fortune 500 companies and growing businesses alike. Would you like to know more about our monitoring, automation, or incident management capabilities?",
      "Thank you for your interest in AutoIntelli! I can provide information about our products, pricing, demos, integrations, and more. How can I help you explore our solutions today?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
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
      // addSystemMessage('Not connected to server. Please wait...');
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

    // Option 2: Send message to Strapi backend via HTTP
    try {
      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://autointelli-bcgf.onrender.com';
      
      // For now, use intelligent mock responses based on user input
      setTimeout(async () => {
        let botResponse = generateIntelligentResponse(userInput);
        
        // Optionally, try to get response from Strapi API (commented out for now)
        // Your Strapi backend doesn't have a chat endpoint yet, so we skip this
        /*
        try {
          const response = await fetch(`${STRAPI_URL}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: userInput,
              userId: userIdRef.current
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            botResponse = data.response || botResponse;
          }
        } catch (apiError) {
          console.log('Strapi API not available, using intelligent mock response');
        }
        */
        
        addBotMessage(botResponse);
        setIsLoading(false);
      }, 800);
      
    } catch (error) {
      console.error('Error processing message:', error);
      addBotMessage("I'm sorry, I encountered an error. Please try again.");
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm Alice AI, your AutoIntelli assistant. I can help you with information about our IT operations management solutions. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
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
                  {message.text}
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
