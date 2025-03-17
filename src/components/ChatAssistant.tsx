
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

// Enhanced knowledge base for Morocco
const moroccoKnowledgeBase = {
  destinations: {
    marrakech: {
      description: "Marrakech is a vibrant city with famous souks, palaces, and gardens. Don't miss Jemaa el-Fnaa square, Bahia Palace, Majorelle Garden, and the historic medina.",
      attractions: ["Jemaa el-Fnaa", "Bahia Palace", "Majorelle Garden", "Koutoubia Mosque", "Saadian Tombs"],
      bestTimeToVisit: "Spring (March-May) and fall (September-November) for pleasant temperatures",
      tips: "Haggling is expected in the souks. Dress modestly, especially when visiting religious sites."
    },
    chefchaouen: {
      description: "Chefchaouen, the 'Blue Pearl', is famous for its striking blue buildings. Nestled in the Rif Mountains, it offers a peaceful atmosphere and beautiful views.",
      attractions: ["Medina", "Kasbah Museum", "Spanish Mosque", "Ras El Ma", "Rif Mountains"],
      bestTimeToVisit: "March-May and September-November for mild weather and fewer crowds",
      tips: "Great for photography, especially in the early morning light. Famous for its handcrafted goods."
    },
    fes: {
      description: "Fes has the world's largest car-free urban area with its ancient medina. Visit the Al-Qarawiyyin University (world's oldest), the tanneries, and magnificent madrasas.",
      attractions: ["Al-Qarawiyyin University", "Chouara Tannery", "Bou Inania Madrasa", "Fes el Bali (Old Medina)", "Merenid Tombs"],
      bestTimeToVisit: "March-May for green landscapes, September-November for pleasant temperatures",
      tips: "Hire a local guide to navigate the complex medina. The tanneries have a strong smell - bring mint leaves!"
    },
    desert: {
      description: "The Sahara Desert offers an unforgettable experience. Merzouga and Zagora are popular gateways where you can ride camels, stay in desert camps, and stargaze.",
      attractions: ["Erg Chebbi Dunes", "Camel Trekking", "Berber Camps", "Stargazing", "4x4 Desert Tours"],
      bestTimeToVisit: "October-April for cooler temperatures. Summer can be extremely hot (over 40°C/104°F)",
      tips: "Book an overnight stay in a desert camp for the full experience. Pack layers as desert nights can be cool."
    },
    essaouira: {
      description: "Essaouira is a charming coastal town with Portuguese fortifications, a vibrant fishing port, and windy beaches perfect for water sports.",
      attractions: ["Medina", "Skala de la Ville", "Port", "Beach", "Gnaoua World Music Festival"],
      bestTimeToVisit: "Year-round, but April-November for water sports. June for the Gnaoua Festival",
      tips: "Known for windsurfing and kitesurfing due to strong trade winds. Try fresh seafood at the port."
    },
    casablanca: {
      description: "Morocco's largest city and economic center, featuring art deco architecture and the magnificent Hassan II Mosque overlooking the Atlantic Ocean.",
      attractions: ["Hassan II Mosque", "Corniche", "Mohammed V Square", "Morocco Mall", "Quartier Habous"],
      bestTimeToVisit: "March-May and September-November for pleasant weather",
      tips: "More modern than other Moroccan cities. The Hassan II Mosque is one of few that non-Muslims can enter."
    }
  },
  culture: {
    customs: "Morocco has a rich cultural tapestry with Arab, Berber, and European influences. Traditional hospitality, or 'Diffa', is central - guests are welcomed warmly, often with mint tea and pastries.",
    etiquette: "Remove shoes before entering homes. Use right hand for eating and passing items. It's polite to decline offers initially before accepting.",
    religion: "Islam is the predominant religion. During Ramadan, be respectful of those fasting. Dress modestly, especially when visiting religious sites.",
    arts: "Traditional crafts include carpets, leather goods, ceramics, and metalwork. Visit cooperatives to see artisans practice centuries-old techniques.",
    music: "Moroccan music ranges from traditional Berber rhythms to Andalusian classical music and Gnawa. The Gnaoua World Music Festival in Essaouira is internationally renowned.",
    festivals: "Important festivals include Ramadan, Eid al-Fitr, Eid al-Adha, and regional celebrations like the Rose Festival in Kalaat M'Gouna and the Date Festival in Erfoud."
  },
  food: {
    tagine: "Morocco's signature dish - a slow-cooked stew named after the conical clay pot it's cooked in. Common variations include chicken with preserved lemon, lamb with prunes, and kefta (meatball) tagine.",
    couscous: "Traditionally served on Fridays, it's steamed semolina topped with vegetables and meat, often shared from a central plate.",
    mintTea: "Known as 'Moroccan whiskey', mint tea is more than a drink - it's a symbol of hospitality. It's sweet, minty, and poured from height to create a light foam.",
    pastilla: "A sweet-savory pie traditionally made with pigeon (now often chicken), wrapped in crisp warka pastry and topped with cinnamon and sugar.",
    streetFood: "Try msemen (square pancakes), harira (tomato and lentil soup), and brochettes (grilled meat skewers).",
    spices: "Moroccan cuisine uses a variety of spices including cumin, coriander, cinnamon, ginger, and ras el hanout (a blend of up to 30 spices)."
  },
  practicalInfo: {
    bestTimeToVisit: "Spring (March-May) and fall (September-November) for pleasant temperatures across most of the country.",
    transportation: "Trains connect major cities and are comfortable and reliable. Buses reach more remote destinations. Grand taxis are good for shorter distances.",
    itinerary: "A 10-14 day itinerary allows you to experience Morocco's diversity: imperial cities (Fes, Marrakech, Rabat, Meknes), mountain villages, coastal towns, and the desert.",
    language: "Arabic and Berber are official languages, with French widely spoken. English is common in tourist areas but learning basic Arabic or French phrases is appreciated.",
    safety: "Morocco is generally safe for travelers. Take normal precautions, especially in busy areas. Solo female travelers should dress modestly and be prepared for some unwanted attention.",
    money: "The currency is the Moroccan Dirham (MAD). Credit cards are widely accepted in cities but carry cash for smaller towns and markets.",
    electricity: "Outlets are type C and E (same as Europe, 220V). Travelers from the US will need adapters and possibly converters.",
    tipping: "Tipping (around 10%) is customary in restaurants, for guides, drivers, and hotel staff.",
    photography: "Always ask before photographing people, especially in rural areas. Some may request a small payment."
  },
  accommodation: {
    riads: "Traditional Moroccan houses with interior gardens or courtyards, converted into boutique hotels. Offer an authentic and often luxurious experience in the heart of medinas.",
    desertCamps: "Range from basic to luxury tents, offering a unique overnight experience in the Sahara with traditional food and entertainment.",
    kasbahs: "Ancient fortified buildings, often in dramatic settings. Many have been converted into atmospheric hotels.",
    hotels: "Modern hotels and international chains are available in major cities, offering familiar comforts and amenities.",
    budget: "Hostels are increasingly common in tourist cities. Family-run guesthouses (maisons d'hôte) offer a more personal experience at moderate prices."
  },
  activities: {
    hiking: "The Atlas Mountains offer spectacular scenery, from the lush Ourika Valley to challenging Mount Toubkal, North Africa's highest peak.",
    shopping: "Souks (markets) are an adventure. Negotiate for carpets, lamps, spices, and leather goods. The medinas of Fes and Marrakech are especially renowned.",
    hammams: "Traditional bathhouses offer a relaxing cultural experience. The ritual involves steam, scrubbing with black soap, and massage.",
    cookingClasses: "Learn to prepare Moroccan specialties. Many include a visit to local markets to select ingredients.",
    camelTrekking: "An iconic Moroccan experience, especially at sunrise or sunset in the Sahara Desert.",
    waterSports: "Coastal towns like Essaouira and Taghazout are popular for surfing, windsurfing, and kitesurfing.",
    toursAndExcursions: "Day trips from major cities can take you to waterfalls, Berber villages, ancient Roman ruins, or filming locations of famous movies."
  }
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

// Function to generate a contextual response based on user input
const generateResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  let response = "";
  
  // Check for greetings or introductions
  if (input.match(/hello|hi|hey|greetings|azul/i)) {
    return "Azul! Hello! I'm happy to help with your Morocco travel questions. What would you like to know about?";
  }
  
  // Check for thanks
  if (input.match(/thank|thanks|thank you|appreciate/i)) {
    return "You're very welcome! I'm happy to help. Is there anything else you'd like to know about Morocco?";
  }
  
  // Check for destination inquiries
  if (input.includes("marrakech") || input.includes("marrakesh")) {
    const info = moroccoKnowledgeBase.destinations.marrakech;
    if (input.includes("best time") || input.includes("when to visit")) {
      return `The best time to visit Marrakech is ${info.bestTimeToVisit}.`;
    }
    if (input.includes("do") || input.includes("see") || input.includes("attraction")) {
      return `In Marrakech, you should visit: ${info.attractions.join(", ")}. ${info.tips}`;
    }
    return info.description;
  }
  
  if (input.includes("chefchaouen") || input.includes("blue city") || input.includes("blue pearl")) {
    const info = moroccoKnowledgeBase.destinations.chefchaouen;
    if (input.includes("best time") || input.includes("when to visit")) {
      return `The best time to visit Chefchaouen is ${info.bestTimeToVisit}.`;
    }
    if (input.includes("do") || input.includes("see") || input.includes("attraction")) {
      return `In Chefchaouen, you should visit: ${info.attractions.join(", ")}. ${info.tips}`;
    }
    return info.description;
  }
  
  if (input.includes("fes") || input.includes("fez")) {
    const info = moroccoKnowledgeBase.destinations.fes;
    if (input.includes("best time") || input.includes("when to visit")) {
      return `The best time to visit Fes is ${info.bestTimeToVisit}.`;
    }
    if (input.includes("do") || input.includes("see") || input.includes("attraction")) {
      return `In Fes, you should visit: ${info.attractions.join(", ")}. ${info.tips}`;
    }
    return info.description;
  }
  
  if (input.includes("desert") || input.includes("sahara") || input.includes("merzouga") || input.includes("zagora")) {
    const info = moroccoKnowledgeBase.destinations.desert;
    if (input.includes("best time") || input.includes("when to visit")) {
      return `The best time to visit the Sahara Desert is ${info.bestTimeToVisit}.`;
    }
    if (input.includes("do") || input.includes("see") || input.includes("attraction")) {
      return `In the Sahara Desert, you can experience: ${info.attractions.join(", ")}. ${info.tips}`;
    }
    return info.description;
  }
  
  if (input.includes("essaouira")) {
    const info = moroccoKnowledgeBase.destinations.essaouira;
    if (input.includes("best time") || input.includes("when to visit")) {
      return `The best time to visit Essaouira is ${info.bestTimeToVisit}.`;
    }
    if (input.includes("do") || input.includes("see") || input.includes("attraction")) {
      return `In Essaouira, you should visit: ${info.attractions.join(", ")}. ${info.tips}`;
    }
    return info.description;
  }
  
  if (input.includes("casablanca")) {
    const info = moroccoKnowledgeBase.destinations.casablanca;
    if (input.includes("best time") || input.includes("when to visit")) {
      return `The best time to visit Casablanca is ${info.bestTimeToVisit}.`;
    }
    if (input.includes("do") || input.includes("see") || input.includes("attraction")) {
      return `In Casablanca, you should visit: ${info.attractions.join(", ")}. ${info.tips}`;
    }
    return info.description;
  }
  
  // Check for food inquiries
  if (input.includes("food") || input.includes("eat") || input.includes("cuisine") || input.includes("dish")) {
    if (input.includes("tagine") || input.includes("tajine")) {
      return moroccoKnowledgeBase.food.tagine;
    }
    if (input.includes("couscous")) {
      return moroccoKnowledgeBase.food.couscous;
    }
    if (input.includes("tea") || input.includes("mint tea")) {
      return moroccoKnowledgeBase.food.mintTea;
    }
    if (input.includes("pastilla") || input.includes("bastilla")) {
      return moroccoKnowledgeBase.food.pastilla;
    }
    if (input.includes("street") || input.includes("street food")) {
      return moroccoKnowledgeBase.food.streetFood;
    }
    return `Moroccan cuisine is diverse and flavorful! Famous dishes include tagine (slow-cooked stew), couscous (traditionally served on Fridays), pastilla (sweet-savory pie), and mint tea. The cuisine uses a variety of spices like cumin, coriander, and ras el hanout. Would you like to know more about a specific Moroccan dish?`;
  }
  
  // Check for culture inquiries
  if (input.match(/culture|tradition|custom|etiquette/i)) {
    if (input.includes("etiquette") || input.includes("manners")) {
      return moroccoKnowledgeBase.culture.etiquette;
    }
    if (input.includes("religion") || input.includes("islam") || input.includes("muslim")) {
      return moroccoKnowledgeBase.culture.religion;
    }
    if (input.includes("art") || input.includes("craft")) {
      return moroccoKnowledgeBase.culture.arts;
    }
    if (input.includes("music") || input.includes("gnawa") || input.includes("gnaoua")) {
      return moroccoKnowledgeBase.culture.music;
    }
    if (input.includes("festival") || input.includes("celebration") || input.includes("holiday")) {
      return moroccoKnowledgeBase.culture.festivals;
    }
    return moroccoKnowledgeBase.culture.customs;
  }
  
  // Check for accommodation inquiries
  if (input.match(/stay|accommodation|hotel|riad|hostel|camp/i)) {
    if (input.includes("riad")) {
      return moroccoKnowledgeBase.accommodation.riads;
    }
    if (input.includes("camp") || input.includes("desert camp") || input.includes("tent")) {
      return moroccoKnowledgeBase.accommodation.desertCamps;
    }
    if (input.includes("kasbah")) {
      return moroccoKnowledgeBase.accommodation.kasbahs;
    }
    if (input.includes("budget") || input.includes("cheap") || input.includes("affordable")) {
      return moroccoKnowledgeBase.accommodation.budget;
    }
    return `Morocco offers diverse accommodation options. You can stay in traditional riads (houses with interior courtyards), luxury desert camps, historic kasbahs, modern hotels, or budget-friendly hostels. What type of accommodation are you interested in?`;
  }
  
  // Check for activity inquiries
  if (input.match(/do|activity|experience|tour|hike|shop|hammam/i)) {
    if (input.includes("hike") || input.includes("trek") || input.includes("mountain") || input.includes("atlas")) {
      return moroccoKnowledgeBase.activities.hiking;
    }
    if (input.includes("shop") || input.includes("buy") || input.includes("souk") || input.includes("market")) {
      return moroccoKnowledgeBase.activities.shopping;
    }
    if (input.includes("hammam") || input.includes("bath") || input.includes("spa")) {
      return moroccoKnowledgeBase.activities.hammams;
    }
    if (input.includes("cook") || input.includes("cooking") || input.includes("class")) {
      return moroccoKnowledgeBase.activities.cookingClasses;
    }
    if (input.includes("camel") || input.includes("ride")) {
      return moroccoKnowledgeBase.activities.camelTrekking;
    }
    if (input.includes("surf") || input.includes("water") || input.includes("beach")) {
      return moroccoKnowledgeBase.activities.waterSports;
    }
    return `Morocco offers diverse activities including hiking in the Atlas Mountains, shopping in traditional souks, experiencing hammams (traditional bathhouses), taking cooking classes, camel trekking in the desert, and water sports along the coast. What activities interest you most?`;
  }
  
  // Check for practical information inquiries
  if (input.match(/when|best time|visit|season|weather/i)) {
    return moroccoKnowledgeBase.practicalInfo.bestTimeToVisit;
  }
  
  if (input.match(/transport|getting around|train|bus|taxi/i)) {
    return moroccoKnowledgeBase.practicalInfo.transportation;
  }
  
  if (input.match(/itinerary|plan|route|days|how long/i)) {
    return moroccoKnowledgeBase.practicalInfo.itinerary;
  }
  
  if (input.match(/language|speak|arabic|berber|french|english/i)) {
    return moroccoKnowledgeBase.practicalInfo.language;
  }
  
  if (input.match(/safe|safety|danger|crime/i)) {
    return moroccoKnowledgeBase.practicalInfo.safety;
  }
  
  if (input.match(/money|currency|cash|credit card|payment|dirham/i)) {
    return moroccoKnowledgeBase.practicalInfo.money;
  }
  
  if (input.match(/electricity|outlet|plug|adapter|power/i)) {
    return moroccoKnowledgeBase.practicalInfo.electricity;
  }
  
  if (input.match(/tip|tipping|gratuity/i)) {
    return moroccoKnowledgeBase.practicalInfo.tipping;
  }
  
  if (input.match(/photo|photograph|camera/i)) {
    return moroccoKnowledgeBase.practicalInfo.photography;
  }
  
  // Default response for unmatched queries
  return `I'd be happy to help you with information about Morocco! You can ask me about destinations like Marrakech, Chefchaouen, or the Sahara Desert; local cuisine; cultural customs; accommodation options; activities; or practical travel information. What specifically would you like to know?`;
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
    
    // Generate contextual response based on user input
    setTimeout(() => {
      const aiResponse = generateResponse(userMessage.content);
      
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
