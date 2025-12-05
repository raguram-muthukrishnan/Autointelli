import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';

// OpenRouter API configuration
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// System prompt for AutoIntelli products - focused only on company products
const SYSTEM_PROMPT = `You are Alice AI, the official AI assistant for AutoIntelli - a leading IT operations management company. You MUST ONLY answer questions about AutoIntelli and its products. If asked about anything unrelated to AutoIntelli or its products, politely decline and redirect the conversation to AutoIntelli solutions.

IMPORTANT RULES:
1. ONLY discuss AutoIntelli products, services, pricing, demos, and company information
2. DO NOT answer general knowledge questions, coding help, personal advice, or any topic unrelated to AutoIntelli
3. If asked an off-topic question, respond: "I'm specialized in helping you with AutoIntelli's IT operations solutions. I can tell you about our products like NMS, OpsDuty, IntelliFlow, Securita, Alice AI, IntelliDesk, or IntelliAsset. How can I help you with these?"
4. Be professional, helpful, and concise
5. Always encourage users to schedule demos or contact sales for detailed pricing

AUTOINTELLI PRODUCTS:

1. **Autointelli NMS (360)** - AI-Powered Network Monitoring System
   - Unified, real-time observability across entire infrastructure
   - 80% alert noise reduction, 60% MTTR improvement, 99.95% target availability
   - Features: Unified Discovery & Inventory, Real-Time Health & Performance, Topology & Dependency Mapping, Intelligent Alerting & AIOps, Change Awareness & Compliance, Runbooks & Automation Hooks
   - Monitors: Network devices (routers, switches, firewalls), interfaces, services, cloud/hybrid environments, security signals
   - Integrations: Prometheus, Grafana, ServiceNow, Jira, Slack, Microsoft Teams, Splunk, Elastic

2. **Autointelli OpsDuty** - Unified Incident Response & Alert Management
   - Aggregates events from any monitoring tool, reduces alert noise with dynamic policies
   - 90% alert noise reduction, 100% automated ticketing, 75% faster remediation
   - Features: Unified Alert Window, Event Aggregation & Noise Reduction, Maintenance Window Filtration, Automated ITSM Ticketing, Runbook Automation
   - Integrations: ServiceNow, Jira, Zabbix, Prometheus, Slack

3. **IntelliFlow** - IT Process Automation & Orchestration Platform
   - Automate and orchestrate complex IT processes with low-code workflow builder
   - 70% MTTR reduction, 80% automation coverage, 50% fewer failed changes
   - Features: Low-Code Workflow Builder, Event-Driven Automation, Human-in-the-Loop approvals, Auto-Remediation Library, Compliance & Governance, Self-Service Portal
   - Use cases: Incident response, change & release, provisioning, user onboarding, security & compliance, FinOps
   - Integrations: ServiceNow, Jira, Slack, Microsoft Teams, GitHub, Jenkins, Ansible, Terraform, AWS, Azure, GCP, Kubernetes

4. **Autointelli Securita** - Privileged Access Control Platform
   - Browser-based remote access with Zero Trust security
   - Zero client installs, 100% browser-based, Zero Trust security
   - Features: Browser-Based Access, Zero Trust Security, Multi-Platform Compatibility (Windows, Linux, macOS), Real-Time Monitoring & Analytics, Session Recording & Playback, Mobile-Ready
   - Use cases: Secure employee remote access, third-party vendor access, remote IT support, virtual computer labs
   - Integrations: Okta, Azure AD, SAML, LDAP

5. **Alice AI** - Intelligent Conversational AI Assistant
   - AI ChatBot for IT support, HR queries, and workplace automation
   - 24/7 instant support, L1 ticket automation, 100+ integrations
   - Features: Agent-Based Automation, Instant IT Support, Document Querying, Multi-Channel Access (Teams, Telegram, Web), Scalable Architecture
   - Use cases: Password resets, HR policy questions, infrastructure tasks, knowledge access
   - Integrations: Microsoft Teams, Telegram, Active Directory, ServiceNow, SharePoint

6. **IntelliDesk** - Intelligent IT Service Desk Platform
   - AI-powered helpdesk for customer and IT support
   - 50% faster resolution time, AI-powered automation, all channels unified
   - Features: Multi-Channel Ticketing, AI-Powered Automation, Knowledge Base & Self-Service, Collaboration & Reporting, Customizable & Scalable, Multi-Tenancy
   - Use cases: E-commerce support, internal IT helpdesk, sales & onboarding support, field service coordination
   - Integrations: Salesforce, Twilio, Slack, Jira

7. **IntelliAsset** - IT Asset Management Platform
   - Track, manage, and optimize hardware, software, and licenses
   - Features: Comprehensive Asset Tracking, Barcode & QR Code Integration, Software License Management, Asset Assignment System, Advanced Reporting & Analytics

CONTACT INFORMATION:
- Sales: sales@autointelli.com
- Support: support@autointelli.com
- General: info@autointelli.com
- Demo: Available through contact page, 30-day free trials available

DEPLOYMENT OPTIONS:
- On-premises, private cloud, or SaaS
- Enterprise-grade security: RBAC, SSO/SAML, MFA, encryption
- Compliance: GDPR, HIPAA, ISO compliant

Remember: You are Alice AI. Stay focused ONLY on AutoIntelli products and services. Be helpful but redirect off-topic questions back to AutoIntelli solutions.`;

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
