
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Moroccan travel knowledge base - simplified version from the frontend
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
    }
  },
  culture: {
    customs: "Morocco has a rich cultural tapestry with Arab, Berber, and European influences. Traditional hospitality, or 'Diffa', is central - guests are welcomed warmly, often with mint tea and pastries.",
    etiquette: "Remove shoes before entering homes. Use right hand for eating and passing items. It's polite to decline offers initially before accepting.",
    religion: "Islam is the predominant religion. During Ramadan, be respectful of those fasting. Dress modestly, especially when visiting religious sites.",
    arts: "Traditional crafts include carpets, leather goods, ceramics, and metalwork. Visit cooperatives to see artisans practice centuries-old techniques."
  },
  food: {
    tagine: "Morocco's signature dish - a slow-cooked stew named after the conical clay pot it's cooked in. Common variations include chicken with preserved lemon, lamb with prunes, and kefta (meatball) tagine.",
    couscous: "Traditionally served on Fridays, it's steamed semolina topped with vegetables and meat, often shared from a central plate.",
    mintTea: "Known as 'Moroccan whiskey', mint tea is more than a drink - it's a symbol of hospitality. It's sweet, minty, and poured from height to create a light foam."
  },
  practicalInfo: {
    bestTimeToVisit: "Spring (March-May) and fall (September-November) for pleasant temperatures across most of the country.",
    transportation: "Trains connect major cities and are comfortable and reliable. Buses reach more remote destinations. Grand taxis are good for shorter distances.",
    language: "Arabic and Berber are official languages, with French widely spoken. English is common in tourist areas but learning basic Arabic or French phrases is appreciated."
  }
};

// Function to generate a contextual response based on user input
const generateResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Check for greetings or introductions
  if (input.match(/hello|hi|hey|greetings|azul/i)) {
    return "Azul! Hello! I'm happy to help with your Morocco travel questions. What would you like to know about?";
  }
  
  // Check for thanks
  if (input.match(/thank|thanks|thank you|appreciate/i)) {
    return "You're very welcome! I'm happy to help. Is there anything else you'd like to know about Morocco?";
  }
  
  // Check for destination inquiries
  for (const [destination, info] of Object.entries(moroccoKnowledgeBase.destinations)) {
    if (input.includes(destination)) {
      if (input.includes("best time") || input.includes("when to visit")) {
        return `The best time to visit ${destination.charAt(0).toUpperCase() + destination.slice(1)} is ${info.bestTimeToVisit}.`;
      }
      if (input.includes("do") || input.includes("see") || input.includes("attraction")) {
        return `In ${destination.charAt(0).toUpperCase() + destination.slice(1)}, you should visit: ${info.attractions.join(", ")}. ${info.tips}`;
      }
      return info.description;
    }
  }
  
  // Check for food inquiries
  if (input.includes("food") || input.includes("eat") || input.includes("cuisine") || input.includes("dish")) {
    for (const [dish, description] of Object.entries(moroccoKnowledgeBase.food)) {
      if (input.includes(dish.toLowerCase())) {
        return description;
      }
    }
    return `Moroccan cuisine is diverse and flavorful! Famous dishes include tagine (slow-cooked stew), couscous (traditionally served on Fridays), and mint tea. Would you like to know more about a specific Moroccan dish?`;
  }
  
  // Check for culture inquiries
  if (input.match(/culture|tradition|custom|etiquette/i)) {
    for (const [aspect, description] of Object.entries(moroccoKnowledgeBase.culture)) {
      if (input.includes(aspect.toLowerCase())) {
        return description;
      }
    }
    return moroccoKnowledgeBase.culture.customs;
  }
  
  // Check for practical information inquiries
  if (input.match(/when|best time|visit|season|weather/i)) {
    return moroccoKnowledgeBase.practicalInfo.bestTimeToVisit;
  }
  
  if (input.match(/transport|getting around|train|bus|taxi/i)) {
    return moroccoKnowledgeBase.practicalInfo.transportation;
  }
  
  if (input.match(/language|speak|arabic|berber|french|english/i)) {
    return moroccoKnowledgeBase.practicalInfo.language;
  }
  
  // More complex response using rule-based NLP
  let responseScore = {};
  let highestScore = 0;
  let bestResponse = "";
  
  // Simple keyword matching
  const keywords = {
    "desert": ["desert", "sahara", "merzouga", "zagora", "camel", "dune", "sand", "camp"],
    "medina": ["medina", "souk", "market", "old city", "walled", "maze", "bazaar"],
    "accommodation": ["stay", "hotel", "riad", "accommodation", "sleep", "lodge", "hostel"],
    "hiking": ["hike", "trek", "mountain", "atlas", "outdoor", "trail", "walk"],
    "safety": ["safe", "safety", "security", "danger", "solo", "woman", "travel"]
  };
  
  // Check input against keywords
  for (const [topic, words] of Object.entries(keywords)) {
    let score = 0;
    for (const word of words) {
      if (input.includes(word)) {
        score += 1;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      switch(topic) {
        case "desert":
          bestResponse = "The Moroccan Sahara offers unforgettable experiences including camel treks, overnight stays in desert camps, and breathtaking stargazing. Merzouga and Zagora are popular gateways to the desert. The best time to visit is between October and April when temperatures are more moderate.";
          break;
        case "medina":
          bestResponse = "Moroccan medinas are the historic walled city centers filled with narrow, maze-like streets. Each city's medina has its own character - Fes has the largest car-free urban area in the world, Marrakech has lively souks and squares, and Essaouira has a more relaxed coastal medina. They're great for shopping, photography, and experiencing authentic Moroccan culture.";
          break;
        case "accommodation": 
          bestResponse = "Morocco offers diverse accommodation options. Riads (traditional houses with inner courtyards) provide an authentic experience in medinas. Desert camps offer unique stays in the Sahara. Modern hotels are available in major cities, while kasbahs (fortified buildings) offer atmospheric stays in southern regions. For budget options, hostels and guesthouses are increasingly common.";
          break;
        case "hiking":
          bestResponse = "Morocco offers excellent hiking, particularly in the Atlas Mountains. The High Atlas near Marrakech includes Toubkal, North Africa's highest peak. The Middle Atlas has cedar forests and lakes, while the Rif Mountains offer scenic trails near Chefchaouen. Spring and fall are the best seasons for hiking with moderate temperatures and beautiful landscapes.";
          break;
        case "safety":
          bestResponse = "Morocco is generally safe for tourists. Take normal precautions like watching your belongings in busy areas and avoiding empty streets at night. Solo female travelers should dress modestly to avoid unwanted attention. Using official guides in medinas can help avoid getting lost and persistent touts. It's always good to research your specific destinations before traveling.";
          break;
      }
    }
  }
  
  // If we found a good match based on keywords
  if (highestScore > 0) {
    return bestResponse;
  }
  
  // Default response for unmatched queries
  return `I'd be happy to help you with information about Morocco! You can ask me about destinations like Marrakech, Chefchaouen, or the Sahara Desert; local cuisine; cultural customs; or practical travel information. What specifically would you like to know?`;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      throw new Error('No message provided');
    }

    const response = generateResponse(message);
    
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
        timestamp: new Date().toISOString()
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
