import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles/ChatAgent.css';

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'agent', text: 'Welcome to FinanceBot! How can I assist you with your financial needs today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Chatbot from https://github.com/Amaan9136/chatbot-with-js/blob/main/script.js

  const userMessage = [
    /* 0 */["hi", "hey", "hello", "hi there", "hey there"],
    /* 1 */["balance", "check balance", "account balance", "how much money", "available funds"],
    /* 2 */["transfer", "send money", "payment", "pay someone", "wire money"],
    /* 3 */["investment", "invest", "stocks", "bonds", "mutual funds", "portfolio"],
    /* 4 */["bye", "goodbye", "log out", "sign out", "exit"],
    /* 5 */["help", "support", "assistant", "chat help", "need help"],
    /* 6 */["fees", "charges", "costs", "pricing", "commission"],
    /* 7 */["account", "open account", "new account", "create account"],
    /* 8 */["contact", "customer service", "phone number", "email", "reach support"],
    /* 9 */["loan", "borrow", "mortgage", "credit", "lending"],
    /* 10 */["security", "secure", "privacy", "data protection"],
    /* 11 */["card", "credit card", "debit card", "new card", "lost card"],
    /* 12 */["thank you", "thanks", "appreciate it", "helpful"],
    /* 13 */["budget", "spending", "expenses", "track money", "financial planning"],
    /* 14 */["error", "problem", "issue", "not working", "failed"],
    /* 15 */["features", "services", "what can you do", "help me with", "capabilities"],
    /* 16 */["market", "stock market", "trading", "exchange rates"],
    /* 17 */["savings", "save money", "interest rate", "deposit"],
    /* 18 */["statement", "transaction history", "records", "past transactions"],
    /* 19 */["insurance", "protect", "coverage", "policy"],
    /* 20 */["retirement", "pension", "401k", "ira"]
  ];

  const botReply = [
    /* 0 */["Hello! Welcome to your financial assistant. How can I help you today? 💼", "Hi there! Ready to help you with your financial needs! 📊", "Welcome! How can I assist with your finances today? 💫"],
    /* 1 */["To check your balance, please navigate to the Accounts tab or I can help you access it here. Would you like me to show you? 💳", "I can help you view your balance securely. Would you like to proceed? 🔒"],
    /* 2 */["I can help you initiate a transfer. Please note you'll need the recipient's details and your secure authentication. Shall we proceed? 💸", "Let's help you send money safely. Would you like to start a new transfer? 📤"],
    /* 3 */["Our investment services include stocks, bonds, and mutual funds. Would you like to learn more about our investment options? 📈", "I can show you our current investment opportunities and portfolio management services. Interested? 💹"],
    /* 4 */["Thank you for using our services. Have a great day! 👋", "Goodbye! Remember, your financial security is our priority. 🔒", "See you soon! Don't forget to securely log out. ✨"],
    /* 5 */["I'm your financial assistant, ready to help with transactions, investments, and account services. What do you need? 🤝", "How can I assist you today? I can help with various financial services and questions! 💡"],
    /* 6 */["I can explain our fee structure and any charges associated with your accounts or services. What specific fees would you like to know about? 💰", "Let me help you understand our pricing and fees. Which service are you interested in? 📋"],
    /* 7 */["I can guide you through opening a new account. We offer checking, savings, and investment accounts. What type interests you? 📝", "Ready to open a new account? I can help you choose the best option for your needs! 🏦"],
    /* 8 */["You can reach our support team at 1-800-FINANCE or support@finance.com. Would you like me to connect you with a specialist? 📞", "Our customer service team is available 24/7. Would you like their direct contact information? ✉️"],
    /* 9 */["I can help you explore our loan options and current rates. What type of loan are you interested in? 🏠", "Let's find the right loan for your needs. Would you like to see our current offers? 💵"],
    /* 10 */["Your security is our top priority. We use bank-grade encryption and multi-factor authentication. How can I help you feel more secure? 🔒", "We take your privacy seriously. Would you like to learn more about our security measures? 🛡️"],
    /* 11 */["I can help you with card services, whether you need a new card or need to report a lost one. What's your situation? 💳", "Let's take care of your card needs. What kind of card assistance do you need? 🔐"],
    /* 12 */["You're welcome! Is there anything else I can help you with? 😊", "Glad I could help! Don't hesitate to ask if you need anything else! ⭐"],
    /* 13 */["I can help you create a personalized budget plan. Would you like to see our budgeting tools? 📊", "Let's review your spending patterns and create a financial plan that works for you! 📈"],
    /* 14 */["I'm sorry you're experiencing issues. Let's resolve this right away. Can you provide more details about the problem? ⚠️", "I'll help you fix this issue. Could you tell me more about what's happening? 🔧"],
    /* 15 */["I can assist with transfers, investments, loans, budgeting, and more. What area would you like to explore? 🎯", "Our services include banking, investing, lending, and financial planning. What interests you? 💼"],
    /* 16 */["I can provide real-time market information and trading capabilities. Would you like to see the current market overview? 📊", "Let me show you our market analysis tools and trading platform. Interested? 📈"],
    /* 17 */["Our savings accounts offer competitive interest rates. Would you like to see our current rates and savings products? 💰", "I can help you start saving with our high-yield accounts. Shall we explore your options? 🏦"],
    /* 18 */["I can help you access your transaction history and statements. How far back would you like to look? 📄", "Let's find your transaction records. Would you like to see recent transactions or past statements? 📑"],
    /* 19 */["We offer various insurance products to protect your financial future. Would you like to learn about our coverage options? 🛡️", "I can help you find the right insurance coverage for your needs. What type of protection interests you? ⚔️"],
    /* 20 */["Let's discuss your retirement planning options. Would you like to learn about our 401(k) plans or IRAs? 🎯", "I can help you plan for retirement with our various investment and savings options. Shall we begin? 🌟"]
  ];

  const alternative = [
    "I'm not quite sure what you're asking. Could you please rephrase your financial question? 🤔",
    "I want to help! Could you be more specific about your financial needs? 💭",
    "I didn't catch that. What aspect of your finances would you like assistance with? 📋",
    "I'm here to help with your financial needs. Could you please clarify your question? 💡",
    "For specific account issues, you can reach our support team at 1-800-FINANCE or support@finance.com 📞",
    "I'm your financial assistant, but I need more details to help you properly. Could you elaborate? 🤝",
    "Let's try a different approach. What specific financial service are you looking for? 🎯",
    "I'm here for your financial needs, but I need a clearer question to provide the right assistance. 💼",
    "Could you provide more context about your financial query? 📊",
    "For immediate assistance, you can always contact our support team or visit our help center 🔍"
  ];

  // Rest of the component code remains the same
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
    setIsTyping(true);

    const response = findResponse(inputValue);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'agent', text: response }]);
      setIsTyping(false);
    }, 1000);

    setInputValue('');
  };

  const findResponse = (input) => {
    const text = input.toLowerCase().trim();
    
    for (let i = 0; i < userMessage.length; i++) {
      if (userMessage[i].some(msg => text.includes(msg))) {
        return botReply[i][Math.floor(Math.random() * botReply[i].length)];
      }
    }
    
    return alternative[Math.floor(Math.random() * alternative.length)];
  };

  return (
    <div className="chat-agent">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Customer Support</h3>
            <button onClick={toggleChat}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="message agent">
                <p>Typing...</p>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..." 
            />
            <button 
              className="send-button" 
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button 
        className={`chat-toggle-button ${isOpen ? 'active' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        <FontAwesomeIcon icon={faComments} />
      </button>
    </div>
  );
};

export default ChatAgent;