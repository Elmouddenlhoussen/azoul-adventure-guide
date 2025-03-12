
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from './AnimatedTransition';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

const initialMessage: Message = {
  id: '1',
  content: "Hello! I'm Azoul, your Moroccan travel assistant. How can I help you plan your perfect Moroccan adventure today?",
  sender: 'assistant',
  timestamp: new Date(),
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      // If opening, log this in analytics (placeholder)
      console.log('Chat opened');
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const sampleResponses = [
        "Marrakech is famous for its vibrant souks and the iconic Jemaa el-Fnaa square. I recommend visiting the Bahia Palace and Majorelle Garden as well!",
        "The best time to visit the Sahara Desert is from October to April when temperatures are more moderate. Make sure to book a camel trek for the authentic experience!",
        "Moroccan cuisine is diverse! Try tagine, couscous, and pastilla. Don't miss mint tea, our traditional drink of hospitality.",
        "For a coastal experience, Essaouira offers beautiful beaches and a relaxed atmosphere, perfect for a few days of unwinding after exploring busier cities.",
        "I'd recommend spending at least 10-14 days in Morocco to experience the diversity of landscapes from mountains to desert to coastline."
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
          {/* Chat window */}
          <AnimatePresence mode="wait">
            {!isMinimized && (
              <AnimatedTransition variant="scale">
                <motion.div 
                  className="mb-4 w-[350px] h-[500px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                >
                  {/* Header */}
                  <div className="p-4 border-b bg-morocco-navy text-white flex justify-between items-center">
                    <div className="flex items-center">
                      <Bot className="mr-2 h-5 w-5" />
                      <span className="font-semibold">Azoul Assistant</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleChat}
                      className="h-8 w-8 rounded-full hover:bg-morocco-navy/80 text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                            <Avatar className={`h-8 w-8 ${message.sender === 'assistant' ? 'bg-morocco-clay' : 'bg-morocco-teal'}`}>
                              {message.sender === 'assistant' ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
                            </Avatar>
                            <div 
                              className={`p-3 rounded-lg ${
                                message.sender === 'user' 
                                  ? 'bg-morocco-teal text-white rounded-tr-none' 
                                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex flex-row gap-2 max-w-[80%]">
                            <Avatar className="h-8 w-8 bg-morocco-clay">
                              <Bot className="h-4 w-4 text-white" />
                            </Avatar>
                            <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                              <div className="flex space-x-1">
                                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Input */}
                  <div className="p-3 border-t flex gap-2">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="resize-none min-h-[44px] max-h-[120px]"
                      rows={1}
                    />
                    <Button 
                      onClick={handleSend} 
                      size="icon"
                      className="h-9 w-9 bg-morocco-clay hover:bg-morocco-clay/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatedTransition>
            )}
          </AnimatePresence>

          {/* Chat button */}
          <motion.button
            onClick={toggleChat}
            className={`flex items-center justify-center rounded-full shadow-lg ${isMinimized ? 'bg-morocco-clay hover:bg-morocco-clay/90' : 'bg-gray-200 hover:bg-gray-300'} text-white p-3 transition-all duration-300 relative`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isMinimized ? (
              <>
                <MessageCircle className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-morocco-terracotta rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">
                  1
                </span>
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
