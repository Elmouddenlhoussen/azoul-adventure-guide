
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced Moroccan travel knowledge base with more detailed information
const moroccoKnowledgeBase = {
  destinations: {
    "marrakech": {
      description: "Marrakech is a vibrant city with famous souks, palaces, and gardens. Don't miss Jemaa el-Fnaa square, Bahia Palace, Majorelle Garden, and the historic medina.",
      attractions: ["Jemaa el-Fnaa", "Bahia Palace", "Majorelle Garden", "Koutoubia Mosque", "Saadian Tombs"],
      bestTimeToVisit: "Spring (March-May) and fall (September-November) for pleasant temperatures",
      tips: "Haggling is expected in the souks. Dress modestly, especially when visiting religious sites."
    },
    "chefchaouen": {
      description: "Chefchaouen, the 'Blue Pearl', is famous for its striking blue buildings. Nestled in the Rif Mountains, it offers a peaceful atmosphere and beautiful views.",
      attractions: ["Medina", "Kasbah Museum", "Spanish Mosque", "Ras El Ma", "Rif Mountains"],
      bestTimeToVisit: "March-May and September-November for mild weather and fewer crowds",
      tips: "Great for photography, especially in the early morning light. Famous for its handcrafted goods."
    },
    "fes": {
      description: "Fes has the world's largest car-free urban area with its ancient medina. Visit the Al-Qarawiyyin University (world's oldest), the tanneries, and magnificent madrasas.",
      attractions: ["Al-Qarawiyyin University", "Chouara Tannery", "Bou Inania Madrasa", "Fes el Bali (Old Medina)", "Merenid Tombs"],
      bestTimeToVisit: "March-May for green landscapes, September-November for pleasant temperatures",
      tips: "Hire a local guide to navigate the complex medina. The tanneries have a strong smell - bring mint leaves!"
    },
    "desert": {
      description: "The Sahara Desert offers an unforgettable experience. Merzouga and Zagora are popular gateways where you can ride camels, stay in desert camps, and stargaze.",
      attractions: ["Erg Chebbi Dunes", "Camel Trekking", "Berber Camps", "Stargazing", "4x4 Desert Tours"],
      bestTimeToVisit: "October-April for cooler temperatures. Summer can be extremely hot (over 40°C/104°F)",
      tips: "Book an overnight stay in a desert camp for the full experience. Pack layers as desert nights can be cool."
    },
    "casablanca": {
      description: "Morocco's largest city and economic center, featuring a mix of modern urban development and historic architecture with strong French influences.",
      attractions: ["Hassan II Mosque", "Corniche", "Mohammed V Square", "Old Medina", "Morocco Mall"],
      bestTimeToVisit: "April-June and September-November for pleasant coastal climate",
      tips: "The Hassan II Mosque is one of the few mosques in Morocco open to non-Muslims. Take a guided tour to learn about its impressive architecture."
    },
    "essaouira": {
      description: "A charming coastal town known for its laid-back atmosphere, historic medina, and strong winds that make it popular for windsurfing and kitesurfing.",
      attractions: ["Medina Ramparts", "Skala de la Ville", "Port of Essaouira", "Beaches", "Souks"],
      bestTimeToVisit: "April-May and September-October for milder winds and pleasant weather",
      tips: "Famous for its seafood - try the fresh catch of the day at the port. Game of Thrones was filmed on some of Essaouira's beaches."
    },
    "rabat": {
      description: "Morocco's capital city offers a more relaxed experience than other imperial cities, with clean beaches, historic sites, and wide boulevards.",
      attractions: ["Kasbah of the Udayas", "Hassan Tower", "Chellah Necropolis", "Royal Palace", "Mohammed VI Museum"],
      bestTimeToVisit: "April-June and September-November for ideal temperatures",
      tips: "Rabat is very walkable and has a more laid-back atmosphere than Casablanca or Marrakech."
    }
  },
  culture: {
    customs: "Morocco has a rich cultural tapestry with Arab, Berber, and European influences. Traditional hospitality, or 'Diffa', is central - guests are welcomed warmly, often with mint tea and pastries.",
    etiquette: "Remove shoes before entering homes. Use right hand for eating and passing items. It's polite to decline offers initially before accepting.",
    religion: "Islam is the predominant religion. During Ramadan, be respectful of those fasting. Dress modestly, especially when visiting religious sites.",
    arts: "Traditional crafts include carpets, leather goods, ceramics, and metalwork. Visit cooperatives to see artisans practice centuries-old techniques.",
    music: "Moroccan music ranges from traditional Andalusian classical music to Gnawa spiritual trance music. The annual Gnaoua Festival in Essaouira celebrates this heritage.",
    dance: "Different regions have their own traditional dances. Ahwach from the Atlas mountains features group dancing, while Guedra from the south is more meditative."
  },
  food: {
    tagine: "Morocco's signature dish - a slow-cooked stew named after the conical clay pot it's cooked in. Common variations include chicken with preserved lemon, lamb with prunes, and kefta (meatball) tagine.",
    couscous: "Traditionally served on Fridays, it's steamed semolina topped with vegetables and meat, often shared from a central plate.",
    mintTea: "Known as 'Moroccan whiskey', mint tea is more than a drink - it's a symbol of hospitality. It's sweet, minty, and poured from height to create a light foam.",
    pastilla: "A savory-sweet pastry traditionally made with pigeon (now often chicken) combined with almonds, eggs, and spices, wrapped in thin pastry and dusted with sugar and cinnamon.",
    harira: "A hearty soup especially popular during Ramadan, made with tomatoes, lentils, chickpeas, and meat, flavored with ginger, pepper, and herbs.",
    street_food: "Try msemen (square pancakes), freshly squeezed orange juice, sfenj (Moroccan doughnuts), and brochettes (grilled meat skewers) from street vendors."
  },
  practicalInfo: {
    bestTimeToVisit: "Spring (March-May) and fall (September-November) for pleasant temperatures across most of the country.",
    transportation: "Trains connect major cities and are comfortable and reliable. Buses reach more remote destinations. Grand taxis are good for shorter distances.",
    language: "Arabic and Berber are official languages, with French widely spoken. English is common in tourist areas but learning basic Arabic or French phrases is appreciated.",
    currency: "The Moroccan dirham (MAD) is the official currency. ATMs are widely available in cities. Credit cards are accepted in larger establishments but carry cash for souks and small shops.",
    safety: "Morocco is generally safe for tourists. Take normal precautions in crowded areas. Women travelers should dress modestly to avoid unwanted attention.",
    visas: "Many countries receive visa-free entry for up to 90 days. Check the latest requirements before traveling."
  },
  general: {
    geography: "Morocco is located in North Africa, with coastlines on the Atlantic Ocean and Mediterranean Sea. The Atlas Mountains run through the center, and the Sahara Desert occupies the southeast.",
    climate: "Morocco has diverse climates: Mediterranean along the coast, continental in the interior, and desert in the south. Temperatures vary dramatically between day and night in desert regions.",
    history: "Morocco has a rich history influenced by Berber, Arab, European, and African cultures. It was colonized by France and Spain before gaining independence in 1956.",
    economy: "Tourism, agriculture, and phosphate mining are key economic sectors. Morocco is also investing heavily in renewable energy, particularly solar power.",
    politics: "Morocco is a constitutional monarchy with an elected parliament. King Mohammed VI has ruled since 1999.",
    population: "Morocco has about 37 million people, with the majority being Arab-Berber. The population is relatively young, with a median age of around 30."
  }
};

// Improved text similarity function for better context understanding
function stringSimilarity(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  
  const wordSet1 = new Set(s1.split(/\s+/).filter(word => word.length > 3));
  const wordSet2 = new Set(s2.split(/\s+/).filter(word => word.length > 3));
  
  let intersection = 0;
  for (const word of wordSet1) {
    if (wordSet2.has(word)) {
      intersection++;
    }
  }
  
  const union = wordSet1.size + wordSet2.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

// Advanced function to detect query intent and topic
function detectQueryIntent(input) {
  input = input.toLowerCase();
  
  // Define intent patterns
  const intents = {
    greeting: /hello|hi|hey|greetings|marhaba|salam|bonjour|^hi$|^hey$/i,
    farewell: /goodbye|bye|see you|later|au revoir/i,
    thanks: /thank|thanks|thank you|merci|شكرا/i,
    destination: /marrakech|fes|casablanca|rabat|chefchaouen|essaouira|desert|sahara|tangier|agadir|ouarzazate|meknes/i,
    food: /food|eat|dish|cuisine|restaurant|meal|tagine|couscous|pastilla|harira|tea|mint tea/i,
    culture: /culture|custom|tradition|people|language|music|dance|religion|festival|holiday|art|craft/i,
    practical: /money|currency|dirham|safety|travel|transport|bus|train|taxi|time to visit|best time|weather|season|visa|passport/i,
    recommendation: /recommend|suggestion|best|top|must see|visit|advice|tips|should I|where to go/i,
    price: /cost|price|budget|cheap|expensive|affordable/i,
    accommodation: /hotel|riad|stay|accommodation|hostel|camping|sleep|lodge|where to stay/i,
    nonMorocco: /spain|france|egypt|algeria|tunisia|europe|asia|america/i,
    unrelated: /crypto|bitcoin|stock market|investment|programming|software|game|movie|politics|celebrity|sports/i
  };
  
  // Check for intents
  const matchedIntents = {};
  for (const [intent, pattern] of Object.entries(intents)) {
    matchedIntents[intent] = (input.match(pattern) || []).length;
  }
  
  // Get primary intent
  let primaryIntent = Object.entries(matchedIntents)
    .filter(([key]) => key !== 'greeting' && key !== 'farewell' && key !== 'thanks')
    .sort((a, b) => b[1] - a[1])[0];
  
  primaryIntent = primaryIntent ? primaryIntent[0] : 'unknown';
  
  // Handle completely unrelated queries
  if (primaryIntent === 'unrelated' || primaryIntent === 'nonMorocco') {
    return {
      intent: 'unrelated',
      topic: null,
      confidence: matchedIntents.unrelated > 0 || matchedIntents.nonMorocco > 0 ? 0.9 : 0.5
    };
  }
  
  // Find the most likely topic
  let maxScore = 0;
  let bestTopic = null;
  let bestCategory = null;
  
  // Check each category and topic
  for (const [category, topics] of Object.entries(moroccoKnowledgeBase)) {
    for (const [topic, content] of Object.entries(topics)) {
      let topicText = '';
      
      if (typeof content === 'string') {
        topicText = content;
      } else if (typeof content === 'object') {
        topicText = Object.values(content).join(' ');
      }
      
      const similarity = stringSimilarity(input, topicText);
      
      if (similarity > maxScore) {
        maxScore = similarity;
        bestTopic = topic;
        bestCategory = category;
      }
    }
  }
  
  return {
    intent: primaryIntent,
    topic: bestTopic,
    category: bestCategory,
    confidence: maxScore
  };
}

// Completely revised response generator with improved context handling
function generateResponse(userInput, conversationHistory = []) {
  const input = userInput.toLowerCase().trim();
  console.log("Processing input:", input);
  
  // Detect input intent and topic
  const queryAnalysis = detectQueryIntent(input);
  console.log("Query analysis:", JSON.stringify(queryAnalysis));
  
  // Handle greetings first
  if (input.match(/hello|hi|hey|greetings|marhaba|salam|bonjour|^hi$|^hey$/i)) {
    return "Marhaba! Hello! I'm your Moroccan travel assistant. I can help you discover destinations, learn about local cuisine, understand cultural practices, or get practical travel information. What would you like to know about Morocco?";
  }
  
  // Handle thanks
  if (input.match(/thank|thanks|thank you|merci|شكرا/i)) {
    return "You're very welcome! It's my pleasure to help with your Morocco travel plans. Is there anything else you'd like to know?";
  }
  
  // Handle completely unrelated queries
  if (queryAnalysis.intent === 'unrelated') {
    return "I specialize in information about Morocco travel. I can tell you about Moroccan destinations, culture, food, or practical travel information. How can I help you plan your Moroccan adventure?";
  }
  
  // Check if the input is a question about the chatbot itself
  if (input.match(/who are you|what are you|your name|about you|made you|created you|developer/i)) {
    return "I'm Azoul, your AI Moroccan travel assistant! I'm here to help you discover Morocco's beautiful destinations, rich culture, delicious cuisine, and practical travel information. I'm designed to make your Moroccan travel experience smoother and more enjoyable. How can I help you plan your Moroccan adventure today?";
  }
  
  // Destination-specific responses
  for (const [destination, info] of Object.entries(moroccoKnowledgeBase.destinations)) {
    if (input.includes(destination)) {
      if (input.match(/best time|when to visit|season|weather|climat/i)) {
        return `The best time to visit ${destination.charAt(0).toUpperCase() + destination.slice(1)} is ${info.bestTimeToVisit}.`;
      }
      
      if (input.match(/do|see|attraction|visit|activit|sight|tour/i)) {
        return `In ${destination.charAt(0).toUpperCase() + destination.slice(1)}, you should visit: ${info.attractions.join(", ")}. ${info.tips}`;
      }
      
      if (input.match(/tip|advice|recommend|suggest/i)) {
        return `Tip for visiting ${destination.charAt(0).toUpperCase() + destination.slice(1)}: ${info.tips}`;
      }
      
      return info.description;
    }
  }
  
  // If we have a confident topic match, use it
  if (queryAnalysis.confidence > 0.2 && queryAnalysis.topic && queryAnalysis.category) {
    const category = moroccoKnowledgeBase[queryAnalysis.category];
    
    if (category) {
      const content = category[queryAnalysis.topic];
      
      if (typeof content === 'string') {
        return content;
      } else if (typeof content === 'object' && content.description) {
        return content.description;
      }
    }
  }
  
  // Handle specific query patterns that might not be captured otherwise
  if (input.match(/where to go|best places|top destinations|must see|recommend destination|place to visit/i)) {
    return "Morocco offers diverse destinations! For cultural experiences, visit the imperial cities of Marrakech and Fes. For coastal relaxation, try Essaouira or Agadir. For unique landscapes, explore Chefchaouen (the Blue City) or the Sahara Desert. Would you like specific information about any of these places?";
  }
  
  // Food related queries
  if (input.match(/food|eat|cuisine|dish|meal|gastronomy|restaurant|breakfast|lunch|dinner/i)) {
    for (const [dish, description] of Object.entries(moroccoKnowledgeBase.food)) {
      if (input.includes(dish.toLowerCase())) {
        return description;
      }
    }
    return "Moroccan cuisine is diverse and flavorful! Famous dishes include tagine (slow-cooked stew), couscous (traditionally served on Fridays), pastilla (savory-sweet pastry), and mint tea. Street food is excellent - try msemen (square pancakes), harira (soup), and sfenj (doughnuts). Would you like to know more about specific Moroccan dishes?";
  }
  
  // Practical information queries by category
  if (input.match(/when|best time|visit|season|weather|climat|temperature/i)) {
    return moroccoKnowledgeBase.practicalInfo.bestTimeToVisit;
  }
  
  if (input.match(/transport|getting around|train|bus|taxi|car|flight|airport/i)) {
    return moroccoKnowledgeBase.practicalInfo.transportation;
  }
  
  if (input.match(/language|speak|arabic|berber|french|english|communicat/i)) {
    return moroccoKnowledgeBase.practicalInfo.language;
  }
  
  if (input.match(/money|currency|dirham|cash|credit card|payment|exchange|atm|bank/i)) {
    return moroccoKnowledgeBase.practicalInfo.currency;
  }
  
  if (input.match(/safe|danger|security|scam|theft|crime|tourist|woman|solo|travel alone/i)) {
    return moroccoKnowledgeBase.practicalInfo.safety;
  }
  
  if (input.match(/visa|passport|entry|border|immigration|require|document/i)) {
    return moroccoKnowledgeBase.practicalInfo.visas;
  }
  
  // Special topic handlers
  if (input.match(/hammam|spa|bath/i)) {
    return "The hammam is a traditional Moroccan bathhouse and an important cultural experience. Public hammams are separated by gender and involve steam rooms of various temperatures, scrubbing with black soap, and exfoliation with a special glove called a 'kessa.' Many riads and hotels offer private hammam experiences. It's a wonderful way to relax and experience an authentic part of Moroccan culture.";
  }
  
  if (input.match(/tipping|tip/i) && !input.match(/advice|suggest/i)) {
    return "Tipping in Morocco is customary but not obligatory. In restaurants, rounding up the bill or leaving 10% is appreciated for good service. For taxis, rounding up to the nearest 5 dirhams is common. Hotel porters expect about 10-20 dirhams per bag. For guides, 100-150 dirhams per day is standard. Tip in local currency (dirhams) rather than foreign currency when possible.";
  }
  
  if (input.match(/dress|wear|clothing|modest/i)) {
    return "Morocco is a Muslim country with varying levels of conservatism. In general, both men and women should dress modestly, especially in more traditional areas. For women, covering shoulders, chest, and knees is respectful (long skirts/pants and tops that aren't revealing). Men should avoid very short shorts in non-beach areas. In major tourist areas and upscale parts of cities, dress codes are more relaxed, but modest dress is still appreciated when visiting religious sites.";
  }
  
  // Topic-based responses for keywords
  const keywords = {
    "desert": ["desert", "sahara", "merzouga", "zagora", "camel", "dune", "sand", "camp", "erg", "berber", "nomad"],
    "medina": ["medina", "souk", "market", "old city", "walled", "maze", "bazaar", "shop", "artisan", "craft"],
    "accommodation": ["stay", "hotel", "riad", "accommodation", "sleep", "lodge", "hostel", "airbnb", "apartment", "booking"],
    "hiking": ["hike", "trek", "mountain", "atlas", "outdoor", "trail", "walk", "nature", "adventure", "toubkal", "active"],
    "photography": ["photo", "picture", "camera", "instagram", "shoot", "photographer", "spot", "scenic", "view", "image"],
    "budget": ["budget", "cost", "cheap", "expensive", "price", "afford", "money", "spend", "haggle", "bargain", "tip"],
    "itinerary": ["itinerary", "plan", "days", "route", "travel", "duration", "visit", "schedule", "tour", "guide"]
  };
  
  // Check input against keywords
  let highestScore = 0;
  let bestTopic = "";
  
  for (const [topic, words] of Object.entries(keywords)) {
    let score = 0;
    for (const word of words) {
      if (input.includes(word)) {
        score += 1;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }
  
  // Provide topic-specific responses for best match
  if (highestScore > 0) {
    switch(bestTopic) {
      case "desert":
        return "The Moroccan Sahara offers unforgettable experiences including camel treks, overnight stays in desert camps, and breathtaking stargazing. Merzouga (near Erg Chebbi dunes) and Zagora (gateway to Erg Chigaga) are popular starting points. The best time to visit is between October and April when temperatures are more moderate. For the most authentic experience, stay overnight in a traditional camp to witness both sunset and sunrise over the dunes.";
        
      case "medina":
        return "Moroccan medinas are historic walled city centers filled with narrow, maze-like streets. Each city's medina has its own character - Fes has the largest car-free urban area in the world, Marrakech has lively souks and squares, and Essaouira has a more relaxed coastal medina. They're excellent for shopping, photography, and experiencing authentic culture. When navigating medinas, consider hiring a local guide initially to get oriented.";
        
      case "accommodation":
        return "Morocco offers diverse accommodation options. Riads (traditional houses with inner courtyards) provide an authentic experience in medinas - they range from budget to luxury. Desert camps let you sleep under the stars in the Sahara. Modern hotels are available in major cities, while kasbahs (fortified buildings) offer atmospheric stays in southern regions. For budget travelers, hostels are increasingly common in tourist areas.";
        
      case "hiking":
        return "Morocco offers excellent hiking, particularly in the Atlas Mountains. The High Atlas near Marrakech includes Toubkal, North Africa's highest peak (4,167m). The Middle Atlas has cedar forests and lakes, while the Rif Mountains offer scenic trails near Chefchaouen. Spring (April-May) and fall (September-October) are the best seasons with moderate temperatures and beautiful landscapes.";
        
      case "photography":
        return "Morocco is a photographer's paradise with diverse scenery and rich colors. For architecture and culture, focus on the blue streets of Chefchaouen, the vibrant markets of Marrakech, and the ancient medina of Fes. For landscapes, the Sahara Desert offers stunning dunes, especially at sunrise and sunset. The coastal ramparts of Essaouira and the High Atlas Mountains also provide spectacular photo opportunities.";
        
      case "budget":
        return "Morocco can be enjoyed on various budgets. For budget travelers, street food (5-20 MAD), public transportation (4-10 MAD for local buses), and hostels/budget riads (100-300 MAD/night) keep costs low. Mid-range travelers can enjoy comfortable riads (500-1000 MAD/night) and restaurant meals (70-150 MAD). Haggling is expected in souks - start around 40% of the asking price.";
        
      case "itinerary":
        return "A classic first-time Morocco itinerary includes: 3 days in Marrakech exploring the medina and gardens, 2-3 days in Fes for its historic sites, 1-2 days in Chefchaouen to enjoy the blue city, and 2 days for a Sahara desert excursion. With more time, add coastal Essaouira (2 days) and the Atlas Mountains (2-3 days). For efficient travel between cities, use trains where available or book a private driver.";
    }
  }
  
  // Default response when we can't match the user's query
  return "I'd be happy to help you with information about Morocco! You can ask me about specific destinations like Marrakech, Fes, or Chefchaouen; local cuisine like tagine or mint tea; cultural customs; or practical travel information like transportation or weather. What specifically would you like to know about Morocco?";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    
    if (!message) {
      throw new Error('No message provided');
    }

    console.log("Received message:", message);
    console.log("Conversation history:", conversationHistory || "No history provided");
    
    // Generate contextual response based on user query and conversation history
    const response = generateResponse(message, conversationHistory || []);
    
    console.log("Generated response:", response);
    
    // Return the response with proper headers
    return new Response(
      JSON.stringify({ 
        response,
        timestamp: new Date().toISOString() 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error processing chat message:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while processing your message',
        timestamp: new Date().toISOString(),
        response: "I'm sorry, I encountered a problem understanding your question. Could you please rephrase it or ask something else about Morocco?"
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
