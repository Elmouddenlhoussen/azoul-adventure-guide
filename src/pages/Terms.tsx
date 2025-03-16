
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import ScrollReveal from '@/components/ScrollReveal';

const Terms = () => {
  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-morocco-clay hover:text-morocco-terracotta mb-6">
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>Back to home</span>
            </Link>
            
            <ScrollReveal>
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Terms of Service
              </motion.h1>
            </ScrollReveal>
            
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-8">
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing or using the Azoul Adventure Guide website and mobile application (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Azoul Adventure Guide provides travel information, guides, and resources focused on Moroccan destinations. Our Service may include interactive features, content sharing, user accounts, and other offerings.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, including the availability of any feature, database, or content.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To access certain features of the Service, you may need to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">4. User Content</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are solely responsible for the content you post.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By posting content, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">5. Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms, explains how we collect, use, and protect your information. By using the Service, you consent to the collection and use of information in accordance with our Privacy Policy.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    In no event shall Azoul Adventure Guide, its officers, directors, employees, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting a prominent announcement on our Service. Your continued use of the Service after such modifications constitutes your acceptance of the modified Terms.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about these Terms, please contact us at legal@azoul-adventure.com.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Last updated: March 15, 2024
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default Terms;
