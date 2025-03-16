
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import ScrollReveal from '@/components/ScrollReveal';

const Privacy = () => {
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
                Privacy Policy
              </motion.h1>
            </ScrollReveal>
            
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-8">
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    At Azoul Adventure Guide, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and mobile application (collectively referred to as the "Service").
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We collect information that you provide directly to us when you:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Create an account or profile</li>
                    <li>Fill out forms or surveys</li>
                    <li>Participate in interactive features</li>
                    <li>Communicate with us</li>
                    <li>Search for content or make purchases</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We may also automatically collect certain information when you use our Service, including your IP address, browser type, operating system, mobile device information, and usage patterns.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Provide, maintain, and improve our Service</li>
                    <li>Process transactions and send related information</li>
                    <li>Send you technical notices, updates, and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Personalize your experience and provide tailored content</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, prevent, and address technical issues</li>
                  </ul>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">4. Sharing Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Service providers who perform services on our behalf</li>
                    <li>Business partners with whom we jointly offer products or services</li>
                    <li>Affiliates within our corporate family</li>
                    <li>Other users when you choose to share information publicly</li>
                    <li>In response to legal requests or to protect our rights</li>
                  </ul>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">5. Your Choices</h2>
                  <p className="text-gray-700 leading-relaxed">
                    You can access, update, or delete your account information at any time through your account settings. You can also opt-out of marketing communications, though we may still send you Service-related messages. You can also choose to disable cookies through your browser settings.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">7. Children's Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our Service is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal>
                <section>
                  <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at privacy@azoul-adventure.com.
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

export default Privacy;
