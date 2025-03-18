import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contactez-nous - Luxury Resort</title>
        <meta name="description" content="Get in touch with our team for reservations, inquiries, or special requests. We're here to help make your stay perfect." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-center mb-12">Contactez-nous</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-serif mb-6">Contactez-nous</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="Votre email"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 h-32"
                  placeholder="Votre message"
                ></textarea>
              </div>
              <button className="bg-gold-600 text-white px-6 py-3 rounded-md hover:bg-gold-700 transition-colors">
                Envoyer un message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-serif mb-6">Information de Contact</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="text-gold-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="text-gray-600">123 Luxury Avenue<br />Antananarivo City, AC 101</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="text-gold-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+261 38 56 594 66</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="text-gold-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@luxuryresort.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;