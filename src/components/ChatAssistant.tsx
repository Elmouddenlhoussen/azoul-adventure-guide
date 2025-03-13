
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Star, User } from 'lucide-react';
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
  content: "Azul! I'm your Moroccan travel assistant. How can I help you explore the beauty and culture of Morocco today?",
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
        "Marrakech's vibrant souks are a maze of colors and scents. Visit Bahia Palace to see stunning Moroccan architecture, and don't miss Majorelle Garden's peaceful blue oasis.",
        "The best time to visit the Sahara is October to April. I recommend a 2-3 day tour from Marrakech or Fes, with a night in a traditional camp under the stars - an unforgettable experience!",
        "Moroccan cuisine is a delight! Try tagine (slow-cooked stew), couscous (our Friday tradition), and pastilla (sweet-savory pie). Always accept mint tea - it's our symbol of hospitality!",
        "Essaouira offers beautiful Atlantic beaches, a historic medina, and a relaxed vibe. It's perfect for a few days after the intensity of Marrakech, and the seafood is incredible.",
        "To truly experience Morocco, spend at least 10 days exploring different regions: the imperial cities, Atlas Mountains, Sahara Desert, and coastal towns each offer unique experiences."
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
                  className="mb-4 w-[350px] h-[500px] bg-white rounded-lg shadow-lg overflow-hidden border border-morocco-sand/30 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                >
                  {/* Header with Moroccan styling */}
                  <div className="p-4 border-b bg-gradient-to-r from-morocco-clay to-morocco-terracotta text-white flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="mr-2 text-lg font-bold">ⵣ</span>
                      <span className="font-semibold">Azoul Assistant</span>
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
                  
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4 bg-morocco-sand/5">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                            <Avatar className={`h-8 w-8 ${message.sender === 'assistant' ? 'bg-morocco-terracotta' : 'bg-morocco-teal'}`}>
                              {message.sender === 'assistant' ? 
                                <span className="text-white text-xs font-bold">ⵣ</span> : 
                                <User className="h-4 w-4 text-white" />
                              }
                            </Avatar>
                            <div 
                              className={`p-3 rounded-lg ${
                                message.sender === 'user' 
                                  ? 'bg-morocco-teal text-white rounded-tr-none' 
                                  : 'bg-white border border-morocco-sand/30 text-gray-800 rounded-tl-none shadow-sm'
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
                            <Avatar className="h-8 w-8 bg-morocco-terracotta">
                              <span className="text-white text-xs font-bold">ⵣ</span>
                            </Avatar>
                            <div className="p-3 rounded-lg bg-white border border-morocco-sand/30 text-gray-800 rounded-tl-none shadow-sm">
                              <div className="flex space-x-1">
                                <div className="h-2 w-2 bg-morocco-terracotta rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-morocco-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="h-2 w-2 bg-morocco-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Input with Moroccan styling */}
                  <div className="p-3 border-t border-morocco-sand/30 flex gap-2 bg-white">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="resize-none min-h-[44px] max-h-[120px] border-morocco-sand/30 focus-visible:ring-morocco-gold"
                      rows={1}
                    />
                    <Button 
                      onClick={handleSend} 
                      size="icon"
                      className="h-9 w-9 bg-morocco-terracotta hover:bg-morocco-gold transition-colors duration-300"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatedTransition>
            )}
          </AnimatePresence>

          {/* Chat button with Moroccan styling */}
          <motion.button
            onClick={toggleChat}
            className={`flex items-center justify-center rounded-full shadow-lg ${
              isMinimized 
                ? 'bg-gradient-to-br from-morocco-terracotta to-morocco-gold hover:from-morocco-gold hover:to-morocco-terracotta' 
                : 'bg-gray-200 hover:bg-gray-300'
            } text-white p-3 transition-all duration-300 relative`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isMinimized ? (
              <>
                <div className="relative">
                  <MessageCircle className="h-6 w-6" />
                  <motion.div 
                    className="absolute -top-1 -right-1 h-3 w-3"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="h-3 w-3 text-white fill-white" />
                  </motion.div>
                </div>
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-morocco-navy rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">
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
