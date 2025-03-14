
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Star, User, MessageSquare, Palm, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import AnimatedTransition from './AnimatedTransition';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

const initialMessagesMap: Record<string, Message> = {
  'en': {
    id: '1',
    content: "Azul! I'm your Moroccan travel assistant. How can I help you explore the beauty and culture of Morocco today?",
    sender: 'assistant',
    timestamp: new Date(),
  },
  'fr': {
    id: '1',
    content: "Azul! Je suis votre assistant de voyage marocain. Comment puis-je vous aider à explorer la beauté et la culture du Maroc aujourd'hui?",
    sender: 'assistant',
    timestamp: new Date(),
  },
  'ar': {
    id: '1',
    content: "أزول! أنا مساعد السفر المغربي. كيف يمكنني مساعدتك في استكشاف جمال وثقافة المغرب اليوم؟",
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

const sampleResponsesMap: Record<string, string[]> = {
  'en': [
    "Marrakech's vibrant souks are a maze of colors and scents. Visit Bahia Palace to see stunning Moroccan architecture, and don't miss Majorelle Garden's peaceful blue oasis.",
    "The best time to visit the Sahara is October to April. I recommend a 2-3 day tour from Marrakech or Fes, with a night in a traditional camp under the stars - an unforgettable experience!",
    "Moroccan cuisine is a delight! Try tagine (slow-cooked stew), couscous (our Friday tradition), and pastilla (sweet-savory pie). Always accept mint tea - it's our symbol of hospitality!",
    "Essaouira offers beautiful Atlantic beaches, a historic medina, and a relaxed vibe. It's perfect for a few days after the intensity of Marrakech, and the seafood is incredible.",
    "To truly experience Morocco, spend at least 10 days exploring different regions: the imperial cities, Atlas Mountains, Sahara Desert, and coastal towns each offer unique experiences."
  ],
  'fr': [
    "Les souks animés de Marrakech sont un labyrinthe de couleurs et de parfums. Visitez le Palais Bahia pour voir l'architecture marocaine impressionnante, et ne manquez pas l'oasis bleue paisible du Jardin Majorelle.",
    "La meilleure période pour visiter le Sahara est d'octobre à avril. Je recommande une excursion de 2-3 jours depuis Marrakech ou Fès, avec une nuit dans un camp traditionnel sous les étoiles - une expérience inoubliable!",
    "La cuisine marocaine est un délice! Essayez le tajine (ragoût cuit lentement), le couscous (notre tradition du vendredi), et la pastilla (tarte sucrée-salée). Acceptez toujours le thé à la menthe - c'est notre symbole d'hospitalité!",
    "Essaouira offre de belles plages atlantiques, une médina historique, et une ambiance détendue. C'est parfait pour quelques jours après l'intensité de Marrakech, et les fruits de mer sont incroyables.",
    "Pour vraiment découvrir le Maroc, passez au moins 10 jours à explorer différentes régions: les villes impériales, les montagnes de l'Atlas, le désert du Sahara, et les villes côtières offrent chacune des expériences uniques."
  ],
  'ar': [
    "أسواق مراكش النابضة بالحياة هي متاهة من الألوان والروائح. قم بزيارة قصر الباهية لمشاهدة العمارة المغربية المذهلة، ولا تفوت واحة حديقة ماجوريل الزرقاء الهادئة.",
    "أفضل وقت لزيارة الصحراء هو من أكتوبر إلى أبريل. أوصي بجولة لمدة 2-3 أيام من مراكش أو فاس، مع ليلة في مخيم تقليدي تحت النجوم - تجربة لا تنسى!",
    "المطبخ المغربي لذيذ! جرب الطاجين (يخنة مطبوخة ببطء)، والكسكس (تقليدنا يوم الجمعة)، والبسطيلة (فطيرة حلوة ومالحة). اقبل دائماً الشاي بالنعناع - إنه رمز الضيافة لدينا!",
    "توفر الصويرة شواطئ أطلسية جميلة، ومدينة قديمة تاريخية، وأجواء مريحة. إنها مثالية لبضعة أيام بعد كثافة مراكش، والمأكولات البحرية مذهلة.",
    "لتجربة المغرب حقاً، اقضِ على الأقل 10 أيام في استكشاف مناطق مختلفة: المدن الإمبراطورية، جبال الأطلس، الصحراء، والمدن الساحلية، كل منها يقدم تجارب فريدة."
  ],
  'ber': [
    "ⵉⵙⵡⴰⵇⵏ ⵏ ⵎⵔⵔⴰⴽⵛ ⵙⵓⵍⵏ ⵜⵜⴼⵖⵏ ⴷ ⵉⵏⵓⵎⴰⵏ ⴷ ⵉⵔⵉⵃⵜⵏ. ⵣⵔ ⵉⵖⵔⵎ ⵏ ⴱⴰⵀⵉⴰ ⴰⴼⴰⴷ ⴰⴷ ⵜⴰⵏⵏⴰⵢⴷ ⵜⴰⵏⵓⵍⵉⵜ ⵜⴰⵎⵖⵔⴰⴱⵉⵜ ⵉⵜⵜⵙⵉⵡⵉⴷⵏ, ⵓⵔ ⴷⴰ ⵜⵜⵓ ⵓⵔⵜⵉ ⵏ ⵎⴰⵊⵓⵔⵉⵍ ⴰⵣⴳⴳⴰⵖ ⵉⵀⵏⵢⴰⵏ.",
    "ⴰⴽⵓⴷ ⵉⴼⵓⵍⴽⵉⵏ ⵉ ⵓⵙⵓⵔⵉⴼ ⵏ ⵜⵏⵣⵔⵓⴼⵜ ⵉⴳⴰ ⵜ ⵓⴽⵜⵓⴱⵔ ⴰⵔ ⴰⴱⵔⵉⵍ. ⵣⵡⴰⵔⴰⵖ ⴰⴷ ⵜⴰⵡⵉⴷ ⵢⴰⵏ ⵓⵙⵓⵔⵉⴼ ⵏ 2-3 ⵡⵓⵙⵙⴰⵏ ⵣⵖ ⵎⵔⵔⴰⴽⵛ ⵏⵖ ⴼⴰⵙ, ⵜⵙⵙⵏⵙⴷ ⵢⴰⵜ ⵜⵍⵉⵍⵉⵜ ⴳ ⵢⴰⵏ ⵓⵅⵉⵢⵎ ⴰⵎⵖⵔⴰⴱⵉ ⴷⴷⴰⵡ ⵉⵜⵔⴰⵏ - ⵜⴰⵔⵎⵉⵜ ⵓⵔ ⵉⵜⵜⵓⵜⵜⵓⵏ!",
    "ⵜⵉⵔⵎⵉⵜ ⵜⴰⵎⵖⵔⴰⴱⵉⵜ ⵜⵣⵣⵉⵍ! ⴰⵔⵎ ⵜⴰⵊⵉⵏ, ⴽⵙⴽⵙⵓ, ⴷ ⴱⴰⵙⵟⵉⵍⵍⴰ. ⵇⴱⵍ ⴰⵜⴰⵢ ⵙ ⵏⴰⵄⵏⴰⵄ - ⵏⵜⵜⴰ ⴰⵢⴷ ⵉⴳⴰⵏ ⴰⵎⴰⵜⴰⵔ ⵏ ⵜⴷⵓⵙⵉ ⵏⵏⵖ!",
    "ⵜⵙⴽⴰⵔ ⵙⵙⵡⵉⵔⴰ ⵉⴼⵜⴰⵙⵏ ⵏ ⵍⴰⵟⵍⴰⵏⵟⵉⴽ ⵉⴼⵓⵍⴽⵉⵏ, ⵜⴰⵎⴷⵉⵏⵜ ⵜⴰⵇⴱⵓⵔⵜ, ⴷ ⵜⴰⵏⵣⵉ ⵉⵀⵏⵢⴰⵏ. ⵜⵎⵍⴰ ⵉ ⵛⴰ ⵏ ⵡⵓⵙⵙⴰⵏ ⴷⴼⴼⵉⵔ ⵡⴰⴼⵍⴰ ⵏ ⵎⵔⵔⴰⴽⵛ, ⵉⵙⵍⵎⴰⵏ ⵏⵏⵙ ⵓⴳⴳⴰⵔⵏ.",
    "ⴰⴼⴰⴷ ⴰⴷ ⵜⵔⵎⵙⴷ ⵍⵎⵖⵔⵉⴱ ⵙ ⵜⵉⴷⵜ, ⵙⵓⵔⴼ ⵎⴰ ⵉⵥⵍⵉⵏ 10 ⵏ ⵡⵓⵙⵙⴰⵏ ⵜⵙⵏⵓⴱⴳⴷ ⵜⴰⵎⵏⴰⴹⵉⵏ ⵉⵎⵥⵍⵉⵏ: ⵜⵉⵎⴷⵉⵏⵉⵏ ⵜⵉⴳⵍⴷⴰⵏⵉⵏ, ⵉⴷⵓⵔⴰⵔ ⵏ ⵍⴰⵟⵍⴰⵙ, ⵜⴰⵏⵣⵔⵓⴼⵜ ⵏ ⵙⵙⴰⵃⴰⵔⴰ, ⴷ ⵜⵉⵎⴷⵉⵏⵉⵏ ⵏ ⵜⵎⴰ ⵏ ⵓⴳⴰⵔⴰⵡ ⴽⵓ ⵢⴰⵜ ⴷⴰⵢⵙⵏⵜ ⴷⴰ ⵜⴰⴽⴽ ⵜⵉⵔⵎⵉⵜⵉⵏ ⵉⵎⵥⵍⵉⵏ."
  ]
};

const ChatAssistant = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([initialMessagesMap[language] || initialMessagesMap['en']]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Update initial message when language changes
  useEffect(() => {
    setMessages([initialMessagesMap[language] || initialMessagesMap['en']]);
  }, [language]);

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
      const responses = sampleResponsesMap[language] || sampleResponsesMap['en'];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
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
                        <Palm className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white">Azoul Assistant</span>
                        <div className="flex items-center text-white/70 text-xs">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          Online now
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
                                <Palm className="h-4 w-4 text-white" /> : 
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
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex flex-row gap-2 max-w-[80%]">
                            <Avatar className={`h-8 w-8 ${primaryBg}`}>
                              <Palm className="h-4 w-4 text-white" />
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
                      placeholder="Type your message..."
                      className="resize-none min-h-[44px] max-h-[120px] border-morocco-sand/30 focus-visible:ring-morocco-terracotta"
                      rows={1}
                    />
                    <Button 
                      onClick={handleSend} 
                      className={`h-9 w-9 p-0 ${primaryBg} hover:opacity-90 transition-opacity`}
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
