
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, User, MessageSquare, Palmtree, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import AnimatedTransition from './AnimatedTransition';
import { sendChatMessage, ChatMessage } from '@/services/chatService';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  error?: boolean;
};

const initialMessagesMap: Record<string, Message> = {
  'en': {
    id: '1',
    content: "Marhaba! I'm your Moroccan travel assistant. How can I help you explore the beauty and culture of Morocco today?",
    sender: 'assistant',
    timestamp: new Date(),
  },
  'fr': {
    id: '1',
    content: "Marhaba! Je suis votre assistant de voyage marocain. Comment puis-je vous aider à explorer la beauté et la culture du Maroc aujourd'hui?",
    sender: 'assistant',
    timestamp: new Date(),
  },
  'ar': {
    id: '1',
    content: "مرحبا! أنا مساعد السفر المغربي. كيف يمكنني مساعدتك في استكشاف جمال وثقافة المغرب اليوم؟",
    sender: 'assistant',
    timestamp: new Date(),
  },
  'ber': {
    id: '1',
    content: "ⴰⵣⵓⵍ! ⵏⴽⴽⵉⵏ ⴷ ⴰⵎⵀⴰⵍ ⵏⵏⴽ ⵏ ⵓⵎⵓⴷⴷⵓ ⴰⵎⵖⵔⵉⴱⵉ. ⵎⴰⵎⵏⴽ ⵣⵎⵔⵖ ⴰⴽ ⵄⴰⵡⵏⵖ ⴰⴷ ⵜⵙⵏⵓⴱⴳⴷ ⵜⴰⴷⵓⵙⵉ ⴷ ⵜⴷⵍⵙⴰ ⵏ ⵍⵎⵖⵔⵉⴱ ⴰⵙⵙⴰ?",
    sender: 'assistant',
    timestamp: new Date(),
  }
};

// Examples to show users what they can ask
const initialSuggestionExamples = [
  "Tell me about Marrakech",
  "What's the best time to visit Morocco?",
  "What should I eat in Morocco?",
  "How do I get around in Morocco?",
  "Tell me about the Sahara desert"
];

const ChatAssistant = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([initialMessagesMap[language] || initialMessagesMap['en']]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(initialSuggestionExamples);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Update initial message when language changes
  useEffect(() => {
    if (isFirstLoad) {
      setMessages([initialMessagesMap[language] || initialMessagesMap['en']]);
    }
  }, [language, isFirstLoad]);

  // Show the chat button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (!isMinimized) {
      inputRef.current?.focus();
    }
  }, [isMinimized]);

  const toggleChat = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setIsFirstLoad(false);
      console.log('Chat opened');
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    handleSend(question);
  };

  // Prepare messages for context
  const prepareConversationHistory = (): ChatMessage[] => {
    // Skip the initial greeting message
    return messages.slice(1).map(msg => ({
      content: msg.content,
      sender: msg.sender,
      timestamp: msg.timestamp
    }));
  };

  const handleSend = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Get conversation history to provide context
      const conversationHistory = prepareConversationHistory();
      
      // Send both the message and conversation history
      const response = await sendChatMessage(userMessage.content, conversationHistory);
      
      // Generate a new AI message
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.response,
        sender: 'assistant',
        timestamp: new Date(response.timestamp || Date.now()),
        error: !!response.error
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (response.error) {
        console.error("Chat error:", response.error);
        toast({
          title: "Chat Issue",
          description: "I had trouble understanding that. Let's try something else.",
          variant: "destructive"
        });
      }

      // Update suggested questions based on the query and response
      updateSuggestedQuestions(userMessage.content, aiMessage.content);
      
    } catch (error) {
      console.error("Failed to get AI response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm having trouble understanding right now. Could you try asking your question differently?",
        sender: 'assistant',
        timestamp: new Date(),
        error: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Couldn't reach the assistant. Please check your connection.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const updateSuggestedQuestions = (userMessage: string, aiResponse: string) => {
    // Extract context from the user message and AI response
    const combinedText = `${userMessage.toLowerCase()} ${aiResponse.toLowerCase()}`;
    
    // Create context-aware follow-up suggestions
    let newSuggestions: string[] = [];
    
    // Check for destinations in the conversation
    const destinations = ['marrakech', 'fes', 'casablanca', 'chefchaouen', 'essaouira', 'rabat', 'desert', 'sahara'];
    let mentionedDestination = '';
    
    for (const destination of destinations) {
      if (combinedText.includes(destination)) {
        mentionedDestination = destination;
        newSuggestions.push(`What are the best attractions in ${destination}?`);
        newSuggestions.push(`How many days should I spend in ${destination}?`);
        break;
      }
    }
    
    // If no destination found, check for other topics
    if (!mentionedDestination) {
      // Food related
      if (combinedText.includes('food') || combinedText.includes('eat') || 
          combinedText.includes('cuisine') || combinedText.includes('tagine')) {
        newSuggestions.push("What is Moroccan street food like?");
        newSuggestions.push("Are there vegetarian options in Moroccan cuisine?");
      }
      
      // Culture related
      else if (combinedText.includes('culture') || combinedText.includes('tradition') ||
              combinedText.includes('custom')) {
        newSuggestions.push("Tell me about Moroccan music");
        newSuggestions.push("What are important customs I should know?");
      }
      
      // Travel related
      else if (combinedText.includes('travel') || combinedText.includes('visit') ||
              combinedText.includes('transport')) {
        newSuggestions.push("What's the best time to visit Morocco?");
        newSuggestions.push("How do I get around between cities?");
      }
    }
    
    // Add some general follow-ups if we don't have enough suggestions
    if (newSuggestions.length < 3) {
      const generalSuggestions = [
        "What souvenirs should I buy in Morocco?",
        "Is Morocco safe for tourists?",
        "Tell me about the Atlas Mountains",
        "What's a typical day like in Morocco?",
        "How much should I budget for a week in Morocco?"
      ];
      
      // Add random general suggestions until we have 3 total
      while (newSuggestions.length < 3) {
        const randomSuggestion = generalSuggestions[Math.floor(Math.random() * generalSuggestions.length)];
        if (!newSuggestions.includes(randomSuggestion)) {
          newSuggestions.push(randomSuggestion);
        }
      }
    }
    
    // Ensure we only have 3 unique suggestions
    newSuggestions = Array.from(new Set(newSuggestions)).slice(0, 3);
    setSuggestedQuestions(newSuggestions);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Enhanced Moroccan-inspired color palette
  const primaryBg = "bg-gradient-to-r from-morocco-terracotta to-morocco-clay";
  const secondaryBg = "bg-morocco-gold";
  const chatBubbleUser = "bg-morocco-clay text-white";
  const chatBubbleAssistant = "bg-white border border-morocco-sand/30 text-gray-800";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {/* Chat window */}
          <AnimatePresence mode="wait">
            {!isMinimized && (
              <AnimatedTransition variant="scale">
                <motion.div 
                  className="mb-4 w-[350px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden border border-morocco-sand/30 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                >
                  {/* Header with enhanced Moroccan styling */}
                  <div className={`${primaryBg} p-4 border-b flex justify-between items-center`}>
                    <div className="flex items-center">
                      <div className="mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                        <Palmtree className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white">Morocco Travel Assistant</span>
                        <div className="flex items-center text-white/70 text-xs">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          Ready to help
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleChat}
                      className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Messages with enhanced styling */}
                  <ScrollArea className="flex-1 p-4 bg-morocco-sand/5">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                            <Avatar className={`h-8 w-8 ${message.sender === 'assistant' ? primaryBg : secondaryBg}`}>
                              {message.sender === 'assistant' ? 
                                <Palmtree className="h-4 w-4 text-white" /> : 
                                <User className="h-4 w-4 text-white" />
                              }
                            </Avatar>
                            <div 
                              className={`p-3 rounded-lg shadow-sm ${
                                message.sender === 'user' 
                                  ? `${chatBubbleUser} rounded-tr-none` 
                                  : `${chatBubbleAssistant} rounded-tl-none`
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex flex-row gap-2 max-w-[80%]">
                            <Avatar className={`h-8 w-8 ${primaryBg}`}>
                              <Palmtree className="h-4 w-4 text-white" />
                            </Avatar>
                            <div className="p-3 rounded-lg bg-white border border-morocco-sand/30 text-gray-800 rounded-tl-none shadow-sm">
                              <div className="flex space-x-1">
                                <div className={`h-2 w-2 ${primaryBg} rounded-full animate-bounce`}></div>
                                <div className={`h-2 w-2 ${primaryBg} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                                <div className={`h-2 w-2 ${primaryBg} rounded-full animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Suggested questions */}
                      {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'assistant' && (
                        <div className="flex flex-wrap gap-2 mt-2 justify-center">
                          {suggestedQuestions.map((question, index) => (
                            <button 
                              key={index}
                              onClick={() => handleSuggestionClick(question)}
                              className="text-xs bg-white border border-morocco-sand/30 hover:bg-morocco-sand/10 rounded-full px-3 py-1 transition-colors"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Input with enhanced Moroccan styling */}
                  <div className="p-3 border-t border-morocco-sand/30 flex gap-2 bg-white">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me about Morocco..."
                      className="resize-none min-h-[44px] max-h-[120px] border-morocco-sand/30 focus-visible:ring-morocco-terracotta"
                      rows={1}
                    />
                    <Button 
                      onClick={() => handleSend()}
                      className={`h-9 w-9 p-0 ${primaryBg} hover:opacity-90 transition-opacity`}
                      disabled={isTyping || !input.trim()}
                    >
                      <Send className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatedTransition>
            )}
          </AnimatePresence>

          {/* Enhanced chat button with Moroccan-inspired design */}
          <motion.button
            onClick={toggleChat}
            className={`flex items-center justify-center rounded-xl shadow-lg ${
              isMinimized 
                ? primaryBg
                : 'bg-gray-200 hover:bg-gray-300'
            } text-white p-4 transition-all duration-300 relative overflow-hidden border border-white/10`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isMinimized ? (
              <>
                {/* Visual elements for the chat button */}
                <div className="absolute inset-0 opacity-20 bg-pattern" style={{ 
                  backgroundImage: "url('/images/pattern.svg')",
                  backgroundSize: "cover",
                }}></div>
                
                {/* Chat icon with animation */}
                <div className="relative">
                  <MessageSquare className="h-6 w-6 text-white" />
                  <motion.div 
                    className="absolute -top-2 -right-2 h-4 w-4"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 15, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                  </motion.div>
                </div>
                
                {/* Notification badge */}
                <span className="absolute -top-2 -right-2 h-6 w-6 bg-morocco-gold rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  1
                </span>
                
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-white rounded-xl"
                  animate={{ 
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
              </>
            ) : (
              <X className="h-6 w-6 text-gray-600" />
            )}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatAssistant;
