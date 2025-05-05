
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, X, Send, User, Brain, Sparkles } from 'lucide-react';
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
  const { language, t } = useLanguage();
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
          title: t('chat_error'),
          description: t('chat_error_description'),
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
        content: t('chat_connection_error_message'),
        sender: 'assistant',
        timestamp: new Date(),
        error: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: t('chat_connection_error'),
        description: t('chat_connection_error_description'),
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {/* Modernized chat window with glassmorphism */}
          <AnimatePresence mode="wait">
            {!isMinimized && (
              <AnimatedTransition variant="scale">
                <motion.div 
                  className="mb-4 w-[380px] h-[520px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                >
                  {/* Modern header with subtle gradient */}
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-morocco-green/90 to-morocco-teal/90 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 shadow-inner">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <span className="font-bold text-white">{t('morocco_guide')}</span>
                        <div className="flex items-center text-white/80 text-xs">
                          <span className="inline-block w-2 h-2 bg-green-300 rounded-full mr-1"></span>
                          {t('ready_to_assist')}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleChat}
                      className="h-8 w-8 rounded-full hover:bg-white/30 text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Elegant message container with improved styling */}
                  <ScrollArea className="flex-1 p-4 bg-white/50 backdrop-blur-sm">
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3 max-w-[80%] group`}>
                            <Avatar className={`h-9 w-9 shrink-0 ${
                              message.sender === 'assistant' 
                                ? 'bg-gradient-to-br from-morocco-green to-morocco-teal' 
                                : 'bg-gradient-to-br from-morocco-gold to-morocco-clay'
                            }`}>
                              {message.sender === 'assistant' ? 
                                <Brain className="h-4 w-4 text-white" /> : 
                                <User className="h-4 w-4 text-white" />
                              }
                            </Avatar>
                            <div 
                              className={`p-3 rounded-2xl ${
                                message.sender === 'user' 
                                  ? 'bg-gradient-to-br from-morocco-clay to-morocco-terracotta text-white rounded-tr-none' 
                                  : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none'
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              <div className={`text-[10px] mt-1 opacity-0 group-hover:opacity-70 transition-opacity ${
                                message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                              }`}>
                                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Modern typing indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex flex-row gap-3 max-w-[80%]">
                            <Avatar className="h-9 w-9 bg-gradient-to-br from-morocco-green to-morocco-teal">
                              <Brain className="h-4 w-4 text-white" />
                            </Avatar>
                            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none">
                              <div className="flex space-x-2">
                                <div className="h-2 w-2 bg-morocco-green rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-morocco-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="h-2 w-2 bg-morocco-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Redesigned suggestion chips */}
                      {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'assistant' && (
                        <motion.div 
                          className="flex flex-wrap gap-2 mt-4 justify-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {suggestedQuestions.map((question, index) => (
                            <button 
                              key={index}
                              onClick={() => handleSuggestionClick(question)}
                              className="text-xs bg-white border border-gray-200 hover:border-morocco-teal/50 hover:bg-morocco-sand/10 rounded-full px-3 py-1.5 transition-all duration-200 shadow-sm hover:shadow flex items-center"
                            >
                              <Sparkles className="h-3 w-3 mr-1.5 text-morocco-teal" />
                              {question}
                            </button>
                          ))}
                        </motion.div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Modern input area with subtle shadow */}
                  <div className="p-4 border-t border-gray-100 bg-white flex gap-2 items-end">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('ask_about_morocco')}
                      className="resize-none min-h-[44px] max-h-[120px] border-gray-200 rounded-xl focus-visible:ring-morocco-teal/50 focus-visible:border-morocco-teal/50 text-sm"
                      rows={1}
                    />
                    <Button 
                      onClick={() => handleSend()}
                      className={`h-10 w-10 rounded-xl p-0 bg-gradient-to-br from-morocco-green to-morocco-teal hover:opacity-90 transition-opacity shadow-md hover:shadow-lg`}
                      disabled={isTyping || !input.trim()}
                    >
                      <Send className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatedTransition>
            )}
          </AnimatePresence>

          {/* Modern floating action button with updated icon */}
          <motion.button
            onClick={toggleChat}
            className={`flex items-center justify-center rounded-full shadow-lg ${
              isMinimized 
                ? 'bg-gradient-to-br from-morocco-green to-morocco-teal p-4'
                : 'bg-gray-100 hover:bg-gray-200 p-3'
            } text-white transition-all duration-300`}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 98, 51, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isMinimized ? (
              <>
                <Brain className="h-6 w-6 text-white" />
                {/* Notification badge */}
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-morocco-clay rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  1
                </span>
                
                {/* Animated pulse effect */}
                <span className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></span>
              </>
            ) : (
              <X className="h-5 w-5 text-gray-600" />
            )}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatAssistant;
