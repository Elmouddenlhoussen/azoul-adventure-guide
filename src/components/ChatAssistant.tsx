import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Star, User, MessageSquare, Palmtree, Sparkles } from 'lucide-react';
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

// AI responses based on different categories of questions
type ResponseCategory = 'destinations' | 'culture' | 'food' | 'travel' | 'accommodation' | 'activities' | 'general';

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

// Enhanced response database with more detailed answers
const responsesDatabase: Record<string, Record<ResponseCategory, string[]>> = {
  'en': {
    'destinations': [
      "Marrakech is a vibrant city with famous souks, palaces, and gardens. Don't miss Jemaa el-Fnaa square, Bahia Palace, Majorelle Garden, and the historic medina.",
      "Chefchaouen, the 'Blue Pearl', is famous for its striking blue buildings. Nestled in the Rif Mountains, it offers a peaceful atmosphere and beautiful views.",
      "Fes has the world's largest car-free urban area with its ancient medina. Visit the Al-Qarawiyyin University (world's oldest), the tanneries, and magnificent madrasas.",
      "The Sahara Desert offers an unforgettable experience. Merzouga and Zagora are popular gateways where you can ride camels, stay in desert camps, and stargaze.",
      "Essaouira is a charming coastal town with Portuguese fortifications, a vibrant fishing port, and windy beaches perfect for water sports."
    ],
    'culture': [
      "Morocco has a rich tapestry of Arab, Berber, and European influences. The country's cultural diversity is reflected in its architecture, cuisine, music, and traditions.",
      "Traditional Moroccan hospitality, or 'Diffa', is central to the culture. Guests are welcomed warmly, often with mint tea and pastries as a gesture of friendship.",
      "Morocco's artisanal crafts include carpets, leather goods, ceramics, and metalwork. Visit local cooperatives to see artisans practice centuries-old techniques.",
      "Moroccan music ranges from traditional Berber rhythms to Andalusian classical music and modern fusion styles. Gnawa music, with its hypnotic rhythms, is particularly distinctive.",
      "Religious festivals like Ramadan and Eid are important cultural events in Morocco. There are also regional festivals celebrating local traditions, music, and harvest seasons."
    ],
    'food': [
      "Tagine is Morocco's signature dish - a slow-cooked stew named after the conical clay pot it's cooked in. Common variations include chicken with preserved lemon, lamb with prunes, and kefta (meatball) tagine.",
      "Couscous, traditionally served on Fridays, is steamed semolina topped with vegetables and meat. It's a communal dish often shared from a central plate.",
      "Moroccan mint tea, or 'Whiskey Berber', is more than a drink - it's a symbol of hospitality and friendship. It's sweet, minty, and poured from height to create a light foam.",
      "Pastilla is a sweet-savory pie traditionally made with pigeon, now often chicken. It's wrapped in crisp warka pastry and topped with cinnamon and sugar.",
      "Street food is abundant in Morocco. Try msemen (square pancakes), harira (tomato and lentil soup), and brochettes (grilled meat skewers)."
    ],
    'travel': [
      "The best time to visit Morocco is during spring (March-May) and fall (September-November) when temperatures are pleasant. Summer can be very hot, especially inland.",
      "For transportation, trains connect major cities and are comfortable and reliable. Buses reach more destinations, and grand taxis are good for shorter distances.",
      "A 10-14 day itinerary allows you to experience Morocco's diversity: imperial cities, mountain villages, coastal towns, and the desert.",
      "While French and Arabic are official languages, many Moroccans in tourist areas speak English. Learning a few basic Arabic or French phrases is appreciated.",
      "Morocco is generally safe for travelers, but take normal precautions. Solo female travelers should dress modestly and be prepared for some unwanted attention."
    ],
    'accommodation': [
      "Riads are traditional Moroccan houses with interior gardens or courtyards, converted into boutique hotels. They offer an authentic and often luxurious experience in the heart of medinas.",
      "Luxury desert camps provide comfortable beds in traditional tents, often with private bathrooms and gourmet dining under the stars.",
      "Kasbah hotels are fortified mud-brick buildings, often in dramatic settings. Many have been converted into atmospheric hotels.",
      "Modern hotels and international chains are available in major cities, offering familiar comforts and amenities.",
      "For budget travelers, hostels are increasingly common in tourist cities. Family-run guesthouses (maisons d'hôte) offer a more personal experience at moderate prices."
    ],
    'activities': [
      "Hiking in the Atlas Mountains offers spectacular scenery, from the lush Ourika Valley to challenging Mount Toubkal, North Africa's highest peak.",
      "Shopping in the souks is an adventure. Negotiate for carpets, lamps, spices, and leather goods. The medinas of Fes and Marrakech are especially renowned.",
      "Hammams (traditional bathhouses) offer a relaxing cultural experience. The ritual involves steam, scrubbing with black soap, and massage.",
      "Cooking classes teach you to prepare Moroccan specialties. Many include a visit to local markets to select ingredients.",
      "Camel trekking in the Sahara, especially at sunrise or sunset, is an iconic Moroccan experience not to be missed."
    ],
    'general': [
      "Morocco is a year-round destination with diverse landscapes from mountains to deserts and coastlines. Each region offers unique experiences throughout the seasons.",
      "The currency is the Moroccan Dirham (MAD). Credit cards are widely accepted in cities but carry cash for smaller towns and markets.",
      "Electrical outlets in Morocco are type C and E, same as in Europe (220V). Travelers from the US will need adapters and possibly converters.",
      "Tipping (around 10%) is customary in restaurants, for guides, drivers, and hotel staff. Small tips are also appreciated for service providers like bathroom attendants.",
      "Photography etiquette: Always ask before photographing people, especially in rural areas. Some may request a small payment or decline for religious reasons."
    ]
  },
  'fr': {
    // French responses would go here - keeping abbreviated for brevity
    'destinations': ["Marrakech est une ville dynamique avec ses souks célèbres, ses palais et ses jardins."],
    'culture': ["Le Maroc possède une riche tapisserie d'influences arabes, berbères et européennes."],
    'food': ["Le tajine est le plat signature du Maroc - un ragoût mijoté lentement nommé d'après le pot en argile conique dans lequel il est cuit."],
    'travel': ["La meilleure période pour visiter le Maroc est au printemps (mars-mai) et en automne (septembre-novembre) lorsque les températures sont agréables."],
    'accommodation': ["Les riads sont des maisons marocaines traditionnelles avec des jardins intérieurs ou des cours, convertis en hôtels boutiques."],
    'activities': ["La randonnée dans les montagnes de l'Atlas offre des paysages spectaculaires, de la luxuriante vallée de l'Ourika au difficile mont Toubkal."],
    'general': ["Le Maroc est une destination pour toute l'année avec des paysages divers allant des montagnes aux déserts et aux côtes."]
  },
  'ar': {
    // Arabic responses would go here - keeping abbreviated for brevity
    'destinations': ["مراكش مدينة نابضة بالحياة مع أسواقها الشهيرة وقصورها وحدائقها."],
    'culture': ["يمتلك المغرب نسيجًا غنيًا من التأثيرات العربية والبربرية والأوروبية."],
    'food': ["الطاجين هو الطبق المميز للمغرب - يخنة مطبوخة ببطء سميت على اسم وعاء الطين المخروطي الذي يتم طهيها فيه."],
    'travel': ["أفضل وقت لزيارة المغرب هو خلال الربيع (مارس-مايو) والخريف (سبتمبر-نوفمبر) عندما تكون درجات الحرارة لطيفة."],
    'accommodation': ["الرياض هي منازل مغربية تقليدية ذات حدائق داخلية أو ساحات، تم تحويلها إلى فنادق بوتيك."],
    'activities': ["المشي لمسافات طويلة في جبال الأطلس يوفر مناظر خلابة، من وادي أوريكا الخصب إلى جبل توبقال الصعب."],
    'general': ["المغرب وجهة على مدار السنة مع مناظر طبيعية متنوعة من الجبال إلى الصحاري والسواحل."]
  },
  'ber': {
    // Berber responses would go here - keeping abbreviated for brevity
    'destinations': ["ⵎⵔⵔⴰⴽⵛ ⵜⴳⴰ ⵜⴰⵎⴷⵉⵏⵜ ⵉⴹⵓⵏⵏ ⵙ ⵉⵙⵡⴰⵇⵏ ⵏⵏⵙ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ, ⵉⵖⵔⵎⴰⵏ ⴷ ⵓⵔⵜⴰⵏ."],
    'culture': ["ⵉⵍⴰ ⵍⵎⵖⵔⵉⴱ ⴰⵄⵔⵔⵉⵎ ⵉⵣⴷⵉⵏ ⵏ ⵉⵎⵣⵡⵓⵔⴰ ⵏ ⵡⴰⵄⵔⴰⴱ, ⵉⵎⴰⵣⵉⵖⵏ ⴷ ⵓⵔⵓⴱⴱⴰ."],
    'food': ["ⵜⴰⵊⵉⵏ ⵜⴳⴰ ⵜⵉⵔⵎⵜ ⵏ ⵍⵎⵖⵔⵉⴱ ⵉⵣⵍⵏ - ⵜⴰⴷⴰⴼⵜ ⵉⵜⵜⵡⴰⵙⵏⵡⴰⵏ ⵙ ⵜⵏⴹⵡⵉⵜ ⵜⵜⵓⵙⵎⵎⴰⵏ ⵙ ⵜⴰⴳⵉⵏⵜ ⵏ ⵜⴰⵍⴰⵖⵜ ⴷⴳ ⵜⵜⵡⴰⵙⵏⵡⴰ."],
    'travel': ["ⴰⴽⵓⴷ ⵉⴼⵓⵍⴽⵉⵏ ⵉ ⵓⵙⴽⴰ ⵖⵔ ⵍⵎⵖⵔⵉⴱ ⵉⴳⴰ ⵜⴰⴼⵙⵓⵜ (ⵎⴰⵔⵙ-ⵎⴰⵢⵢⵓ) ⴷ ⵍⵅⵔⵉⴼ (ⵛⵓⵜⴰⵏⴱⵉⵔ-ⵏⵓⵡⴰⵏⴱⵉⵔ) ⵉⴷ ⵉⴷⵉ ⵜⵏ ⵜⵣⵉⵍⵉⵡⵉⵏ ⴷ ⵉⵎⵛⵉ."],
    'accommodation': ["ⵉⵔⵉⵢⴰⴹⵏ ⴳⴰⵏ ⵜⵏ ⵜⴰⴷⴷⴰⵔⵜ ⵜⴰⵎⵖⵔⴰⴱⵉⵜ ⵜⴰⵏⵙⴰⵢⵜ ⵙ ⵓⵔⵜⴰⵏ ⵏⵉⵖ ⵜⵉⴳⵎⵎⵉ ⵓⵏⵣⴰⵏⵉⵏ, ⵉⵜⵜⵡⴰⵙⵏⴼⵍⵏ ⵖⵔ ⵉⵀⵓⵜⵉⵍⴰⵜ ⵏ ⵜⵓⵜⵉⴽ."],
    'activities': ["ⴰⵣⵣⵉⴳⵣ ⴳ ⵉⴷⵓⵔⴰⵔ ⵏ ⵡⴰⵟⵍⴰⵙ ⵉⵜⵜⴰⴽⴽ ⵉⵎⵏⵥⴰⵡⵏ ⵉⵙⵙⵉⵡⵉⴷⵏ, ⵖⵯⵔ ⵜⵉⵙⵉ ⵏ ⵡⵓⵔⵉⴽⴰ ⵉⵍⵓⵍⵓⵏ ⴰⵔ ⵡⴰⴹⵓ ⵏ ⵜⵓⴱⵇⴰⵍ."],
    'general': ["ⵍⵎⵖⵔⵉⴱ ⵉⴳⴰ ⴰⵙⵓⴷⵓ ⵏ ⵓⵙⴳⴳⵯⴰⵙ ⵉⵎⵓⵏ ⵙ ⵉⵙⵏⵟⴰⵛ ⵉⵎⵥⵍⵉⵏ ⵉⵟⵟⴼⵏ ⵉⴷⵓⵔⴰⵔ ⴰⵔ ⵜⵉⵏⵣⵔⵓⴼⵉⵏ ⴷ ⵜⵎⴰ ⵏ ⵉⵍⵍ."]
  }
};

// Function to categorize user input and find relevant response
const categorizeInput = (input: string): ResponseCategory => {
  input = input.toLowerCase();
  
  if (input.match(/city|marrakech|fes|casablanca|chefchaouen|essaouira|tangier|desert|sahara|atlas|mountain|beach|location|visit|place|destination/)) {
    return 'destinations';
  }
  if (input.match(/culture|tradition|custom|history|people|language|music|art|festival|religion|social/)) {
    return 'culture';
  }
  if (input.match(/food|eat|cuisine|dish|restaurant|tagine|couscous|pastilla|bread|mint tea|breakfast|dinner|lunch|meal|drink/)) {
    return 'food';
  }
  if (input.match(/travel|transport|train|bus|taxi|car|flight|airport|itinerary|route|journey|duration|distance|drive|when|weather|season|month/)) {
    return 'travel';
  }
  if (input.match(/stay|hotel|riad|hostel|resort|camp|accommodation|night|sleep|room|bed|tent|booking|reservation/)) {
    return 'accommodation';
  }
  if (input.match(/do|activity|experience|tour|guide|hike|trek|shop|shopping|souk|hammam|spa|surf|swim|camel|adventure/)) {
    return 'activities';
  }
  
  return 'general';
};

// Function to get AI response based on user input and language
const getAIResponse = (userInput: string, language: string): string => {
  // Default to English if the language is not supported
  const langResponses = responsesDatabase[language] || responsesDatabase['en'];
  
  // Categorize the input to find relevant responses
  const category = categorizeInput(userInput);
  
  // Get responses for the category
  const categoryResponses = langResponses[category];
  
  // Return a random response from the appropriate category
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
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
    
    // Get AI response based on user input
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.content, language);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
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
                        <Palmtree className="h-4 w-4 text-white" />
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
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
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
