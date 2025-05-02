import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Users, MapPin, Star, ExternalLink } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/use-language';
import { getDestinationById, Destination } from '@/data/destinations';
import { useToast } from '@/hooks/use-toast';

// This data is temporary until we implement the multilingual content in Supabase
interface MultilingualDestinationInfo {
  title: {
    en: string;
    fr: string;
    ar: string;
    ber: string;
  };
  description: {
    en: string;
    fr: string;
    ar: string;
    ber: string;
  };
  fullDescription: {
    en: string;
    fr: string;
    ar: string;
    ber: string;
  };
  location: {
    en: string;
    fr: string;
    ar: string;
    ber: string;
  };
  duration: {
    en: string;
    fr: string;
    ar: string;
    ber: string;
  };
  bestTime: {
    en: string;
    fr: string;
    ar: string;
    ber: string;
  };
  groupSize: {
    en: string;
    fr: string;
    ar: string;
    ber: string;
  };
  activities: {
    en: string[];
    fr: string[];
    ar: string[];
    ber: string[];
  };
  highlights: {
    en: string[];
    fr: string[];
    ar: string[];
    ber: string[];
  };
}

// Temporary multilingual info by destination ID
const multilingualInfo: Record<string, MultilingualDestinationInfo> = {
  "marrakech": {
    title: {
      en: "Marrakech",
      fr: "Marrakech",
      ar: "مراكش",
      ber: "ⵎⵕⵕⴰⴽⵛ"
    },
    description: {
      en: "Discover the vibrant markets, palaces, and gardens of this historic imperial city.",
      fr: "Découvrez les marchés animés, les palais et les jardins de cette ville impériale historique.",
      ar: "اكتشف الأسواق النابضة بالحياة والقصور والحدائق في هذه المدينة الإمبراطورية التاريخية.",
      ber: "ⵙⵙⵏ ⵉⵙⵡⴰⵇⵏ ⵉⵜⵜⵏⵓⵙⵏ, ⵉⴳⵍⴷⴰⵏ ⴷ ⵓⵔⵜⴰⵏ ⵏ ⵜⵖⵔⵎⵜ ⴰⴷ ⵜⴰⵎⴰⵙⵙⴰⵏⵜ."
    },
    fullDescription: {
      en: "Known as the 'Red City' for its ochre-colored walls, Marrakech is a cultural epicenter that offers a perfect blend of history, architecture, and vibrant street life. The city's heart is Jemaa el-Fnaa square, which transforms from a shopping hub during the day to an open-air theater of performers, storytellers, and food stalls at night. Explore the winding alleyways of the medina, visit the stunning Bahia Palace, and find peace in the Majorelle Garden, a botanical garden designed by the French painter Jacques Majorelle and later owned by Yves Saint Laurent.",
      fr: "Connue sous le nom de 'Ville Rouge' pour ses murs couleur ocre, Marrakech est un épicentre culturel qui offre un mélange parfait d'histoire, d'architecture et de vie urbaine animée. Le cœur de la ville est la place Jemaa el-Fnaa, qui se transforme d'un centre commercial pendant la journée en un théâtre à ciel ouvert d'artistes, de conteurs et d'étals de nourriture la nuit. Explorez les ruelles sinueuses de la médina, visitez le magnifique Palais de la Bahia et trouvez la paix dans le Jardin Majorelle, un jardin botanique conçu par le peintre français Jacques Majorelle et plus tard possédé par Yves Saint Laurent.",
      ar: "تُعرف باسم 'المدينة الحمراء' لجدرانها ذات اللون الأوكر، مراكش هي مركز ثقافي يقدم مزيجًا مثاليًا من التاريخ والهندسة المعمارية والحياة النابضة بالحيوية في الشوارع. قلب المدينة هو ساحة جامع الفنا، التي تتحول من مركز للتسوق خلال النهار إلى مسرح في الهواء الطلق للفنانين ورواة القصص وأكشاك الطعام في الليل. استكشف الأزقة المتعرجة في المدينة القديمة، وزر قصر الباهية الرائع، واعثر على السلام في حديقة ماجوريل، وهي حديقة نباتية صممها الرسام الفرنسي جاك ماجوريل وامتلكها لاحقًا إيف سان لوران.",
      ber: "ⵜⵜⵡⴰⵙⵙⴰⵏ ⵙ 'ⵜⵖⵔⵎⵜ ⵜⴰⵣⴳⴳⵯⴰⵖⵜ' ⴼ ⵉⵖⵔⴱⴰⵏ ⵏⵏⵙ ⵓⴽⵡⵔⴰⵏⵉⵏ, ⵎⵕⵕⴰⴽⵛ ⵉⴳⴰ ⵜⵜ ⴰⵎⵎⴰⵙ ⴰⴷⵍⵙⴰⵏ ⵉⵙⴽⴰⵔⵏ ⴰⵛⵕⴰⴹ ⵉⴷⵍⵙⴰⵏ ⵏ ⵓⵎⵣⵔⵓⵢ, ⵜⴰⵖⴰⵡⵙⴰ ⴷ ⵜⵓⴷⵔⵜ ⵜⴰⵢⵎⴰⵜⵜ ⵜⴰⵎⵔⴰⵔⵜ. ⵓⵍ ⵏ ⵜⵖⵔⵎⵜ ⵉⴳⴰ ⵜⵜ ⴰⵙⴰⵢⵔⴰⵔ ⵏ ⵊⴰⵎⵄ ⵍⴼⵏⴰ, ⵉⵜⵜⴱⴷⴷⴰⵍⵏ ⵙⴳ ⴰⵎⵎⴰⵙ ⵏ ⵜⵣⵏⵣⴰ ⴳ ⵡⴰⵙⵙ ⵖⵔ ⴰⵎⵔⴰⵔ ⵉⵥⵥⵏⵥⵕⵏ ⴳ ⵉⵢⴹ. ⵙⴽⵙⵓ ⵉⴱⵔⵉⴷⵏ ⵉⵥⵡⴰⵢⵏⵉⵏ ⵏ ⵓⵎⴷⴰⵏ, ⵥⵕ ⵉⴳⵍⴷⴰⵏ ⵉⵛⵡⴰⵏ ⵏ ⵍⴱⴰⵀⵢⴰ ⴷ ⵓⵔⵜⵉ ⵏ ⵎⴰⵊⵓⵔⵉⵍ, ⵓⵔⵜⵉ ⵉⵙⴽⵔ ⵊⴰⴽ ⵎⴰⵊⵓⵔⵉⵍ, ⵢⴰⵙⵙⵜⵔ ⵢⴰⵏ ⵙⴰⵏ ⵍⵓⵔⴰⵏ."
    },
    location: {
      en: "Central Morocco",
      fr: "Maroc Central",
      ar: "وسط المغرب",
      ber: "ⴰⵎⵎⴰⵙ ⵏ ⵍⵎⵖⵔⵉⴱ"
    },
    duration: {
      en: "3-4 days",
      fr: "3-4 jours",
      ar: "3-4 أيام",
      ber: "3-4 ⵡⵓⵙⵙⴰⵏ"
    },
    bestTime: {
      en: "March to May, September to November",
      fr: "Mars à Mai, Septembre à Novembre",
      ar: "مارس إلى مايو ، سبتمبر إلى نوفمبر",
      ber: "ⵎⴰⵕⵚ ⴰⵔ ⵎⴰⵢⵢⵓ, ⵛⵓⵜⴰⵏⴱⵉⵔ ⴰⵔ ⵏⵓⵡⴰⵏⴱⵉⵔ"
    },
    groupSize: {
      en: "No restrictions",
      fr: "Pas de restrictions",
      ar: "لا قيود",
      ber: "ⵓⵔ ⵉⵍⵍⵉ ⵓⵙⴳⵣⵉ"
    },
    activities: {
      en: ["Shopping in souks", "Historical tours", "Food tasting", "Hammam experience", "Garden visits"],
      fr: ["Shopping dans les souks", "Visites historiques", "Dégustation culinaire", "Expérience hammam", "Visites de jardins"],
      ar: ["التسوق في الأسواق", "جولات تاريخية", "تذوق الطعام", "تجربة الحمام", "زيارات الحدائق"],
      ber: ["ⵜⴰⵣⵏⵣⴰ ⴳ ⵉⵙⵡⴰⵇⵏ", "ⵜⵉⴽⴽⵉⵡⵉⵏ ⵜⵉⵎⵣⵔⵓⵢⵉⵏ", "ⴰⵔⵎ ⵏ ⵓⵙⵡⵓ", "ⵜⴰⵔⵎⵜ ⵏ ⵓⵃⵎⵎⴰⵎ", "ⵜⵉⵔⵣⵉⵡⵉⵏ ⵏ ⵡⵓⵔⵜⴰⵏ"]
    },
    highlights: {
      en: ["Jemaa el-Fnaa", "Bahia Palace", "Majorelle Garden", "Koutoubia Mosque", "El Badi Palace"],
      fr: ["Jemaa el-Fnaa", "Palais de la Bahia", "Jardin Majorelle", "Mosquée Koutoubia", "Palais El Badi"],
      ar: ["جامع الفنا", "قصر الباهية", "حديقة ماجوريل", "مسجد الكتبية", "قصر البديع"],
      ber: ["ⵊⴰⵎⵄ ⵍⴼⵏⴰ", "ⵉⴳⵍⴷⴰⵏ ⵏ ⵍⴱⴰⵀⵢⴰ", "ⵓⵔⵜⵉ ⵏ ⵎⴰⵊⵓⵔⵉⵍ", "ⵜⵉⵎⵣⴳⵉⴷⴰ ⵏ ⴽⵓⵜⵓⴱⵉⵢⴰ", "ⵉⴳⵍⴷⴰⵏ ⵏ ⵍⴱⴰⴷⵉⵄ"]
    }
  },
  "chefchaouen": {
    title: {
      en: "Chefchaouen",
      fr: "Chefchaouen",
      ar: "شفشاون",
      ber: "ⵛⴼⵛⴰⵡⵏ"
    },
    description: {
      en: "Explore the stunning blue city nestled in the Rif Mountains of northwest Morocco.",
      fr: "Explorez la magnifique ville bleue nichée dans les montagnes du Rif au nord-ouest du Maroc.",
      ar: "استكشف المدينة الزرقاء المذهلة الواقعة في جبال الريف شمال غرب المغرب.",
      ber: "ⴰⵔⵎ ⵜⴰⵎⴷⵉⵏⵜ ⵜⴰⵏⴰⵡⴰⵢⵜ ⵜⵍⵍⴰ ⴳ ⵉⴷⵔⴰⵔ ⵏ ⴰⵔⵉⴼ ⴳ ⵓⴳⴰⴼⴰ ⵓⵜⵔⵉⵎ ⵏ ⵍⵎⵖⵔⵉⴱ."
    },
    fullDescription: {
      en: "Nestled in the Rif Mountains, Chefchaouen is famous for its blue-washed buildings that create a dreamlike atmosphere. This charming town offers a relaxed pace compared to Morocco's bustling cities. The blue-painted streets and buildings create a unique, photogenic environment that attracts artists and photographers from around the world. Explore the winding medina, hike in the surrounding mountains, or simply enjoy the laid-back café culture. The town also offers excellent shopping for local handicrafts, particularly woolen garments and woven blankets, as the region is known for its weaving industry.",
      fr: "Niché dans les montagnes du Rif, Chefchaouen est célèbre pour ses bâtiments blanchis à la chaux bleue qui créent une atmosphère de rêve. Cette charmante ville offre un rythme détendu par rapport aux villes animées du Maroc. Les rues et les bâtiments peints en bleu créent un environnement unique et photogénique qui attire des artistes et des photographes du monde entier. Explorez la médina sinueuse, faites de la randonnée dans les montagnes environnantes ou profitez simplement de la culture décontractée des cafés. La ville offre également d'excellents magasins d'artisanat local, en particulier des vêtements en laine et des couvertures tissées, car la région est connue pour son industrie du tissage.",
      ar: "تقع شفشاون في جبال الريف وتشتهر بمبانيها المطلية باللون الأزرق والتي تخلق جوًا يشبه الحلم. توفر هذه المدينة الساحرة وتيرة مريحة مقارنة بمدن المغرب الصاخبة. تخلق الشوارع والمباني المطلية باللون الأزرق بيئة فريدة وساحرة تجذب الفنانين والمصورين من جميع أنحاء العالم. استكشف المدينة القديمة المتعرجة أو تنزه في الجبال المحيطة أو ببساطة استمتع بثقافة المقاهي المريحة. تقدم المدينة أيضًا تسوقًا ممتازًا للحرف اليدوية المحلية ، لا سيما الملابس الصوفية والبطانيات المنسوجة ، حيث تشتهر المنطقة بصناعة النسيج.",
      ber: "ⵜⵍⵍⴰ ⴳ ⵉⴷⵔⴰⵔ ⵏ ⴰⵔⵉⴼ, ⵛⴼⵛⴰⵡⵏ ⵜⵜⵡⴰⵙⵙⴰⵏ ⵙ ⵜⵉⵎⵉⴽⵉⵡⵉⵏ ⵏⵏⵙ ⵜⵜⵡⴰⵙⵓⵖⴰⵏⵉⵏ ⵙ ⵡⵓⵏⴳⵍⵓ ⵉⵙⴽⴰⵔⵏ ⴰⵡⴰⵏ ⵉⵎⵍⴰⵏ. ⵜⴰⵎⴷⵉⵏⵜ ⴰⴷ ⵜⴰⵇⴱⵓⵔ ⵜⵜⴰⴽⴰ ⵜⴰⵣⴷⴷⴰⵔⵜ ⵉⵔⵓⵔⴰⵏ ⴰⵎ ⵜⵎⴷⵉⵏⵉⵏ ⵜⵉⵎⵔⴰⵔⵓⵜⵉⵏ ⵏ ⵍⵎⵖⵔⵉⴱ. ⵉⴱⵔⵉⴷⵏ ⴷ ⵜⵉⵎⵉⴽⵉⵡⵉⵏ ⵜⵜⵡⴰⵙⵓⵖⴰⵏⵉⵏ ⵙ ⵡⵓⵏⴳⵍⵓ ⵙⴽⴰⵔⵏ ⴰⵡⴰⵏ ⵓⵙⵙⴰⵏ ⴷ ⵉⵛⵡⴰⵏ ⵉⵜⵜⴰⵔⵉⵏ ⵉⴼⵍⵍⴰⵀⵏ ⴷ ⵉⵎⵙⵓⵔⴰⵔ ⵙⴳ ⴰⵎⴰⴹⴰⵍ ⴰⴽⴽⵯ. ⴰⵔⵎ ⴰⵎⴷⴰⵏ ⵉⵥⵡⴰⵢⵏⵉⵏ, ⵜⴰⴷⴷⴰⴳ ⴳ ⵉⴷⵔⴰⵔ ⵉⵡⵔⴰⵏⵉⵏ ⵏⵖ ⵙⵙⵓⴼⵖ ⵜⴰⵢⵢⵓⵜ ⵙ ⵜⴷⵍⵙⴰ ⵏ ⵉⵇⴰⵀⵡⵉⵜⵏ ⵉⵔⵓⵔⴰⵏⵉⵏ. ⵜⴰⵎⴷⵉⵏⵜ ⵜⵜⴰⴽⴰ ⴰⵡⴷ ⵜⴰⵣⵏⵣⴰ ⵉⵛⵡⴰⵏ ⵏ ⵜⵉⵏⴰⵡⵉⵏ ⵜⵉⴷⵖⴰⵔⴰⵏⵉⵏ, ⴰⵙⵙⴰⵖ ⵉⴳⵍⴰⵢⵏ ⵉⵡⵍⵍⵓⴼⵏ ⴷ ⵉⵛⵕⴰⵕⵏ ⵉⵜⵜⵡⴰⵙⵡⵡⵓⵜⵏ, ⴰⵎ ⵜⴰⵎⵏⴰⴹⵜ ⵜⵜⵡⴰⵙⵙⴰⵏ ⵙ ⵜⴰⴳⴳⵓⵔⵜ ⵏ ⵜⴰⵙⵙⴰ."
    },
    location: {
      en: "Northern Morocco",
      fr: "Nord du Maroc",
      ar: "شمال المغرب",
      ber: "ⴰⴳⴰⴼⴰ ⵏ ⵍⵎⵖⵔⵉⴱ"
    },
    duration: {
      en: "2-3 days",
      fr: "2-3 jours",
      ar: "2-3 أيام",
      ber: "2-3 ⵡⵓⵙⵙⴰⵏ"
    },
    bestTime: {
      en: "April to June, September to October",
      fr: "Avril à Juin, Septembre à Octobre",
      ar: "أبريل إلى يونيو ، سبتمبر إلى أكتوبر",
      ber: "ⴰⴱⵔⵉⵍ ⴰⵔ ⵢⵓⵏⵢⵓ, ⵛⵓⵜⴰⵏⴱⵉⵔ ⴰⵔ ⵓⴽⵜⵓⴱⵔ"
    },
    groupSize: {
      en: "No restrictions",
      fr: "Pas de restrictions",
      ar: "لا قيود",
      ber: "ⵓⵔ ⵉⵍⵍⵉ ⵓⵙⴳⵣⵉ"
    },
    activities: {
      en: ["Photography walks", "Hiking", "Shopping for handicrafts", "Relaxing in cafés", "Museum visits"],
      fr: ["Promenades photographiques", "Randonnée", "Shopping d'artisanat", "Détente dans les cafés", "Visites de musées"],
      ar: ["جولات التصوير", "المشي لمسافات طويلة", "التسوق لشراء الحرف اليدوية", "الاسترخاء في المقاهي", "زيارات المتحف"],
      ber: ["ⵜⵉⴽⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵓⵔⵓ", "ⵜⴰⴷⴷⴰⴳⵜ", "ⵜⴰⵣⵏⵣⴰ ⵏ ⵜⵉⵏⴰⵡⵉⵏ ⵏ ⵓⴼⵓⵙ", "ⴰⵣⴷⴷⴰⵢ ⴳ ⵉⵇⴰⵀⵡⵉⵜⵏ", "ⵜⵉⵔⵣⵉⵡⵉⵏ ⵏ ⵉⵏⵙⵉⴳⵎⴰⵏ"]
    },
    highlights: {
      en: ["Blue-washed Medina", "Kasbah Museum", "Ras El Ma (Water Source)", "Spanish Mosque viewpoint", "Plaza Uta el-Hammam"],
      fr: ["Médina aux murs bleus", "Musée de la Kasbah", "Ras El Ma (Source d'eau)", "Point de vue de la mosquée espagnole", "Plaza Uta el-Hammam"],
      ar: ["المدينة القديمة المطلية باللون الأزرق", "متحف القصبة", "رأس الماء (مصدر المياه)", "نقطة مشاهدة المسجد الإسباني", "ساحة أوتا الحمام"],
      ber: ["ⴰⵎⴷⴰⵏ ⵉⵜⵜⵡⴰⵙⵓⵖⴰⵏ ⵙ ⵡⵓⵏⴳⵍⵓ", "ⴰ museum ⵏ ⵍⵇⴰⵚⴱⴰ", "ⵕⴰⵙ ⵍⵎⴰ (ⴰⵖⴱⴰⵍⵓ ⵏ ⵡⴰⵎⴰⵏ)", "ⵜⴰⵏⵏⴰⵥⵜ ⵏ ⵜⵎⵣⴳⵉⴷⴰ ⵜⴰⵙⴱⵍⵢⵓⵏⵉⵜ", "ⴰⵙⴰⵢⵔⴰⵔ ⵏ ⵓⵜⴰ ⵍⵃⴰⵎⵎⴰⵎ"]
    }
  },
  "sahara": {
    title: {
      en: "Sahara Desert",
      fr: "Désert du Sahara",
      ar: "الصحراء الكبرى",
      ber: "ⵜⴰⵏⵥⵕⵓⴼⵜ ⵏ ⵙⴰⵀⴰⵔⴰ"
    },
    description: {
      en: "Experience the magic of the Sahara with camel treks and nights under the stars.",
      fr: "Découvrez la magie du Sahara avec des randonnées à dos de chameau et des nuits sous les étoiles.",
      ar: "استمتع بسحر الصحراء الكبرى مع رحلات الجمال وليالي تحت النجوم.",
      ber: "ⴰⵔⵎ ⵜⴰⵙⵙⴰⵙⵜ ⵏ ⵜⵏⵥⵕⵓⴼⵜ ⵏ ⵙⴰⵀⴰⵔⴰ ⵙ ⵜⵉⴽⴽⵉⵡⵉⵏ ⵏ ⵓⵍⵖⵎⵏ ⴷ ⵉⴹⴰⵏ ⴷⴷⴰⵡ ⵉⵜⵔⴰⵏ."
    },
    fullDescription: {
      en: "The Moroccan Sahara offers one of the most dramatic landscapes on earth, with endless golden dunes that change color throughout the day. Most desert excursions begin from the towns of Merzouga or M'Hamid, gateways to the renowned Erg Chebbi and Erg Chigaga dune systems. A typical desert experience includes camel trekking across the dunes, watching the sunset transform the landscape, drumming and dancing around a campfire, and spending the night in a traditional Berber tent under a blanket of stars. The silence and vastness of the desert create an unforgettable experience that connects visitors with both nature and traditional nomadic culture.",
      fr: "Le Sahara marocain offre l'un des paysages les plus spectaculaires de la planète, avec des dunes dorées sans fin qui changent de couleur tout au long de la journée. La plupart des excursions dans le désert commencent dans les villes de Merzouga ou M'Hamid, portes d'entrée des célèbres systèmes de dunes Erg Chebbi et Erg Chigaga. Une expérience typique du désert comprend une randonnée à dos de chameau à travers les dunes, en regardant le coucher de soleil transformer le paysage, en jouant du tambour et en dansant autour d'un feu de camp, et en passant la nuit dans une tente berbère traditionnelle sous une couverture d'étoiles. Le silence et l'immensité du désert créent une expérience inoubliable qui relie les visiteurs à la fois à la nature et à la culture nomade traditionnelle.",
      ar: "تقدم الصحراء المغربية واحدة من أكثر المناظر الطبيعية إثارة على وجه الأرض ، مع كثبان ذهبية لا نهاية لها تتغير لونها على مدار اليوم. تبدأ معظم الرحلات الصحراوية من بلدتي مرزوقة أو امحاميد ، وهما بوابتان إلى نظامي الكثبان الرملية الشهيرين عرق الشبي وعرق شقاقة. تتضمن التجربة الصحراوية النموذجية رحلة جمل عبر الكثبان الرملية ، ومشاهدة غروب الشمس يغير المناظر الطبيعية ، والعزف على الطبول والرقص حول نار المخيم ، وقضاء الليلة في خيمة بربرية تقليدية تحت غطاء من النجوم. يخلق صمت واتساع الصحراء تجربة لا تُنسى تربط الزوار بالطبيعة والثقافة البدوية التقليدية.",
      ber: "ⵜⴰⵏⵥⵕⵓⴼⵜ ⵜⴰⵎⵔⵔⵓⴽⵉⵜ ⵜⵜⴰⴽⴰ ⵢⴰⵏ ⵙⴳ ⵉⴷⵎⴰⵡⵏ ⴰⴽⴽⵯ ⵉⵅⵛⵛⵏ ⴳ ⵡⴰⴽⴰⵍ, ⵙ ⵉⴷⵓⵔⴰⵔ ⵉⵡⵔⴰⵖⵏ ⵓⵔ ⵉⵜⵜⵎⵜⵜⴰⵏ ⴱⴷⴷⴰ ⵙⵏⴼⴰⵍⵏ ⴰⴽⵍⵓ ⴰⴽⴽⵯ ⴰⵙⵙ. ⵜⴰⵎⵓⵢⴰⵜ ⴰⴽⴽⵯ ⴳ ⵜⵏⵥⵕⵓⴼⵜ ⴱⴷⴷⵓⵏ ⵙⴳ ⵜⵎⴷⵉⵏⵉⵏ ⵏ ⵎⵔⵣⵓⴳⴰ ⵏⵖ ⵎⵀⴰⵎⵉⴷ, ⵜⴰⵡⵡⵓⵔⵜ ⵖⵔ ⵉⵙⵓⵜⴰ ⵏ ⵉⴷⵓⵔⴰⵔ ⵏ ⵄⵕⴳ ⵛⴻⴱⴱⵉ ⴷ ⵄⵕⴳ ⵛⵉⴳⴰⴳⴰ. ⵜⴰⵔⵎⵜ ⵜⴰⵏⴰⵎⵎⴰⵙⵜ ⵏ ⵜⵏⵥⵕⵓⴼⵜ ⵜⵍⵍⴰ ⵜⵉⴽⴽⵉ ⵏ ⵓⵍⵖⵎⵏ ⴳ ⵉⴷⵓⵔⴰⵔ, ⴰⵔⴰⵢ ⵏ ⵜⴼⵓⴽⵜ ⵜⵙⵏⴼⴰⵍ ⴰⴷⵎⴰⵡⵏ, ⵜⴰⴳⴳⵓⵔⵜ ⴷ ⵓⵔⴰⵢ ⴷⴳⴳⵓ ⵜⴰⵎⵙⵙⵓⵜⵍⵜ, ⴷ ⴰⵣⴷⴷⴰⵢ ⴳ ⵜⴰⵇⵉⵎⵜ ⵜⴰⴱⵉⵔⴱⵉⵔⵉⵜ ⴷⴷⴰⵡ ⵜⴰⴼⵍⵡⵉⵜ ⵏ ⵉⵜⵔⴰⵏ. ⵜⴰⵙⵓⵙⵎⵉ ⴷ ⵜⴰⵏⴼⴰⵜ ⵏ ⵜⵏⵥⵕⵓⴼⵜ ⵙⴽⴰⵔⵏ ⵜⴰⵔⵎⵜ ⵓⵔ ⵉⵜⵜⵓⵏⵜⵜⵓⵏ ⵉⵙⵎⵓⵏⵏ ⵉⵎⴰⵔⴰⵡⵏ ⴷ ⵜⴰﺒⴷⴰⴷⵜ ⴷ ⵜⴷⵍⵙⴰ ⵜⴰⵏⴰⵎⵎⴰⵙⵜ."
    },
    location: {
      en: "Southern Morocco",
      fr: "Sud du Maroc",
      ar: "جنوب المغرب",
      ber: "ⴰⵏⵥⵓⵍ ⵏ ⵍⵎⵖⵔⵉⴱ"
    },
    duration: {
      en: "2-3 days",
      fr: "2-3 jours",
      ar: "2-3 أيام",
      ber: "2-3 ⵡⵓⵙⵙⴰⵏ"
    },
    bestTime: {
      en: "October to April",
      fr: "Octobre à Avril",
      ar: "أكتوبر إلى أبريل",
      ber: "ⵓⴽⵜⵓⴱⵔ ⴰⵔ ⴰⴱⵔⵉⵍ"
    },
    groupSize: {
      en: "Small groups recommended",
      fr: "Petits groupes recommandés",
      ar: "يوصى بالمجموعات الصغيرة",
      ber: "ⵉⴳⵔⵓᱯⴰ ⵎⵥⵥⵉⵢⵏ ⵉⵜⵜⵓⵙⵎⵔⴰⵙⵏ"
    },
    activities: {
      en: ["Camel trekking", "Sandboarding", "Stargazing", "Berber cultural experiences", "4x4 desert tours"],
      fr: ["Randonnée à dos de chameau", "Sandboard", "Observation des étoiles", "Expériences culturelles berbères", "Tours en 4x4 dans le désert"],
      ar: ["رحلات الجمال", "التزلج على الرمال", "مراقبة النجوم", "تجارب ثقافية بربرية", "جولات صحراوية بالسيارات ذات الدفع الرباعي"],
      ber: ["ⵜⵉⴽⴽⵉⵡⵉⵏ ⵏ ⵓⵍⵖⵎⵏ", "ⴰⵙⵉⴼⴼⵉ ⴳ ⵓⵔⵎⵍ", "ⴰⵔⴰⵢ ⵏ ⵉⵜⵔⴰⵏ", "ⵜⴰⵔⵎⵉⵜⵉⵏ ⵜⵉⴷⵍⵙⴰⵏⵉⵏ ⵜⵉⴱⵉⵔⴱⵉⵔⵉⵏ", "ⵜⵉⴽⴽⵉⵡⵉⵏ 4x4 ⴳ ⵜⵏⵥⵕⵓⴼⵜ"]
    },
    highlights: {
      en: ["Erg Chebbi dunes", "Erg Chigaga dunes", "Desert camps", "Nomadic villages", "Desert night sky"],
      fr: ["Dunes de l'Erg Chebbi", "Dunes de l'Erg Chigaga", "Camps du désert", "Villages nomades", "Ciel nocturne du désert"],
      ar: ["كثبان عرق الشبي", "كثبان عرق شقاقة", "مخيمات الصحراء", "قرى بدوية", "سماء الليل الصحراوية"],
      ber: ["ⵉⴷⵓⵔⴰⵔ ⵏ ⵄⵕⴳ ⵛⴻⴱⴱⵉ", "ⵉⴷⵓⵔⴰⵔ ⵏ ⵄⵕⴳ ⵛⵉⴳⴰⴳⴰ", "ⵉⵎⵉⵙⵉⵔⵏ ⵏ ⵜⵏⵥⵕⵓⴼⵜ", "ⵜⵓⴷⴷⴰⵔ ⵜⵉⵎⵙⵜⴰⴳⴳⴰⵔⵉⵏ", "ⵉⴳⴳⵓ ⵏ ⵉⴹ ⵏ ⵜⵏⵥⵕⵓⴼⵜ"]
    }
  },
  "fes": {
    title: {
      en: "Fes",
      fr: "Fès",
      ar: "فاس",
      ber: "ⴼⴰⵙ"
    },
    description: {
      en: "Wander through the ancient medina, a UNESCO World Heritage site with over 9,000 streets.",
      fr: "Promenez-vous dans l'ancienne médina, un site du patrimoine mondial de l'UNESCO avec plus de 9 000 rues.",
      ar: "تجول في المدينة القديمة ، أحد مواقع التراث العالمي لليونسكو مع أكثر من 9000 شارع.",
      ber: "ⵣⵡⴳ ⴳ ⵓⵎⴷⴰⵏ ⴰⵇⴱⵓⵔ, ⴰ ᱴⴰⵏⴰ ⵏ ⵜⵓⵔⴰⵔⵉⵜ ⵏ ⵓⵏⵉⵙⴽⵓ ⵙ ⵓⴳⴳⴰⵔ ⵏ 9000 ⵉⴱⵔⵉⴷⵏ."
    },
    fullDescription: {
      en: "Fes (or Fez) is considered Morocco's cultural and spiritual capital, with its UNESCO-protected medina being the largest car-free urban area in the world. Founded in the 9th century, the city reached its height as a center of learning and commerce in the 13th and 14th centuries. Today, Fes maintains much of its historical character, particularly in Fes el-Bali, the oldest walled part of the city with its labyrinthine streets. Visitors can explore traditional tanneries where leather is still processed using methods unchanged for centuries, visit religious schools with stunning Islamic architecture, and experience a city where artisans continue to practice crafts as they have for generations.",
      fr: "Fès est considérée comme la capitale culturelle et spirituelle du Maroc, avec sa médina protégée par l'UNESCO étant la plus grande zone urbaine sans voiture au monde. Fondée au IXe siècle, la ville a atteint son apogée en tant que centre d'apprentissage et de commerce aux XIIIe et XIVe siècles. Aujourd'hui, Fès conserve une grande partie de son caractère historique, en particulier à Fès el-Bali, la partie fortifiée la plus ancienne de la ville avec ses rues labyrinthiques. Les visiteurs peuvent explorer les tanneries traditionnelles où le cuir est encore traité selon des méthodes inchangées depuis des siècles, visiter des écoles religieuses avec une architecture islamique époustouflante et découvrir une ville où les artisans continuent de pratiquer l'artisanat comme ils le font depuis des générations.",
      ar: "تعتبر فاس العاصمة الثقافية والروحية للمغرب ، حيث أن المدينة القديمة المحمية من قبل اليونسكو هي أكبر منطقة حضرية خالية من السيارات في العالم. تأسست المدينة في القرن التاسع وبلغت ذروتها كمركز للتعلم والتجارة في القرنين الثالث عشر والرابع عشر. اليوم ، تحافظ فاس على الكثير من طابعها التاريخي ، لا سيما في فاس البالي ، أقدم جزء مسور من المدينة بشوارعها المتاهة. يمكن للزوار استكشاف المدابغ التقليدية حيث لا تزال تتم معالجة الجلود باستخدام طرق لم تتغير منذ قرون ، وزيارة المدارس الدينية ذات الهندسة المعمارية الإسلامية المذهلة ، وتجربة مدينة يواصل فيها الحرفيون ممارسة الحرف اليدوية كما فعلوا لأجيال.",
      ber: "ⴼⴰⵙ ⵜⵜⵡⴰⵇⵇⵏ ⴰⵎ ⵜⴰⵎⴰⵥⵓⵏⵜ ⵜⴰⴷⵍⵙⴰⵏⵜ ⴷ ⵜⴰⵔⵓⵊⴰⵏⵜ ⵏ ⵍⵎⵖⵔⵉⴱ, ⵙ ⵓⵎⴷⴰⵏ ⵏⵏⵙ ⵉⵜⵜⵓⵃⵔⴰⵙⵏ ⵙ ⵓⵏⵉⵙⴽⵓ ⵉⴳⴰ ⵜⵜ ⴰⴳⵯⵔⵓ ⴰⴷⵖⵔⴰⵏ ⵓⵔ ⵉⵍⵍⵉ ⴳⵉⵙ ⵜⴰⵎⵓⵟⵟⵓ ⴳ ⴰⵎⴰⴹⴰⵍ. ⵜⵜⵓⵙⵙⵉⵙⵍⴷ ⴳ ⵜⴰⵙⵓⵜ ⵜⵉⵙⵙ 9, ⵜⴰⵎⴷⵉⵏⵜ ⵜⵍⴽⵎ ⴰⵙⵙⴰⵖ ⵏⵏⵙ ⴰⵎ ⴰⵎⵎⴰⵙ ⵏ ⵜⵍⵎⵓⴷⵉ ⴷ ⵜⴰⵣⵏⵣⴰ ⴳ ⵜⴰⵙⵓⵜ ⵜⵉⵙⵙ 13 ⴷ 14. ⴰⵙⵙⴰ, ⴼⴰⵙ ⵜⵙⵙⵔⴰⵢ ⵎⴰⵙ ⴰⴷⵖⴰⵔ ⴰⵎⵣⵔⵓⵢ, ⴳ ⴼⴰⵙ ⵍⴱⴰⵍⵉ, ⴰⴳⵣⵣⵓⵎ ⴰⵇⴱⵓⵔ ⵏ ⵜⴰⵎⴷⵉⵏⵜ ⵙ ⵉⴱⵔⵉⴷⵏ ⵏⵏⵙ ⵉⵎⵙⵜⴰⴳⴳⴰⵔⵏ. ⵉⵎⴰⵔⴰⵡⵏ ⵎⵎⴽⵉⵏ ⴰⵔⵎ ⵜⵉⵏⴰⵡⵉⵏ ⵜⵉⵇⴱⵓⵔⵉⵏ ⵎⴰⵏⵉ ⴰⵔ ⵜⵜⵓⵙⴽⴰⵔ ⵉⴳⵍⵉⵎⵏ ⵙ ⵜⵉⵍⴰⵡⵉⵏ ⵓⵔ ⵉⵜⵜⵓⵙⵏⴼⴰⵍⵏ ⵙⴳ ⵜⴰⵙⵓⵜⵉⵏ, ⵣⵔⵢ ⵉⵙⵉⵏⴰⵏ ⵉⵔⵓⵊⴰⵏⵏ ⵙ ⵜⴰⵖⴰⵡⵙⴰ ⵜⴰⵏⵙⵍⴰⵎⵜ ⵉⵛⵡⴰⵏ, ⴷ ⴰⵔⵎ ⵜⴰⵎⴷⵉⵏⵜ ⵎⴰⵏⵉ ⵉⵎⵙⵏﻌⴰⵜⵉⵏ ⴱⴷⴷⴰ ⵙⴽⴰⵔⵏ ⵜⵉⵏⴰⵡⵉⵏ ⴰⵎ ⵎⴰ ⵙⴽⴰⵔⵏ ⵙⴳ ⵜⴰⵔⵡⴰ."
    },
    location: {
      en: "Northern Morocco",
      fr: "Nord du Maroc",
      ar: "شمال المغرب",
      ber: "ⴰⴳⴰⴼⴰ ⵏ ⵍⵎⵖⵔⵉⴱ"
    },
    duration: {
      en: "2-3 days",
      fr: "2-3 jours",
      ar: "2-3 أيام",
      ber: "2-3 ⵡⵓⵙⵙⴰⵏ"
    },
    bestTime: {
      en: "March to May, September to November",
      fr: "Mars à Mai, Septembre à Novembre",
      ar: "مارس إلى مايو ، سبتمبر إلى نوفمبر",
      ber: "ⵎⴰⵕⵚ ⴰⵔ ⵎⴰⵢⵢⵓ, ⵛⵓⵜⴰⵏⴱⵉⵔ ⴰⵔ ⵏⵓⵡⴰⵏⴱⵉⵔ"
    },
    groupSize: {
      en: "Guide recommended for medina",
      fr: "Guide recommandé pour la médina",
      ar: "يوصى بالمرشد للمدينة",
      ber: "ⴰⵎⵙⴽⴰⵔ ⵉⵜⵜⵓⵙⵎⵔⴰⵙ ⵉ ⵓⵎⴷⴰⵏ"
    },
    activities: {
      en: ["Medina exploration", "Cultural tours", "Traditional craft demonstrations", "Food tours", "Historical site visits"],
      fr: ["Exploration de la médina", "Visites culturelles", "Démonstrations d'artisanat traditionnel", "Tours gastronomiques", "Visites de sites historiques"],
      ar: ["استكشاف المدينة", "جولات ثقافية", "عروض الحرف اليدوية التقليدية", "جولات الطعام", "زيارات المواقع التاريخية"],
      ber: ["ⴰⵔⵎ ⵏ ⵓⵎⴷⴰⵏ", "ⵜⵉⴽⴽⵉⵡⵉⵏ ⵜⵉⴷⵍⵙⴰⵏⵉⵏ", "ⵜⵉⵎⵍⴰⵡⵉⵏ ⵏ ⵜⵉⵏⴰⵡⵉⵏ ⵜⵉⵇⴱⵓⵔⵉⵏ", "ⵜⵉⴽⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵡⵓ", "ⵜⵉⵔⵣⵉⵡⵉⵏ ⵏ ⵉⴷⵖⴰⵔⵏ ⵉⵎⵣⵔⵓⵢⴰⵏ"]
    },
    highlights: {
      en: ["Chouara Tannery", "Al-Qarawiyyin University and Mosque", "Bou Inania Madrasa", "Bab Boujloud"],
      fr: ["Tannerie Chouara", "Université et Mosquée Al-Qarawiyyin", "Médersa Bou Inania", "Bab Boujloud"],
      ar: ["دباغة الشوارة", "جامعة ومسجد القرويين", "مدرسة بو عنانية", "باب بوجلود"],
      ber: ["ⵜⴰⵙⵉⵛⵓⵜ ⵏ ⵛⵡⴰⵔⴰ", "ⵜⵉⵏⵎⵍ ⴷ ⵜⵎⵣⴳⵉⴷⴰ ⵏ ⵍⵇⴰⵔⴰⵡⵉⵢⵉⵏ", "ⵜⵉⵏⵎⵍ ⵏ ⴱⵓ ⵄⵏⴰⵏⵉⵢⴰ", "ⴱⴰⴱ ⴱⵓⵊⵍⵓⴷ"]
    }
  }
};

const DestinationDetail = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
