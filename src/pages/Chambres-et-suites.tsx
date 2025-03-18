import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Rooms = () => {
  return (
    <>
      <Helmet>
        <title>Chambres et suites - Luxury Resort</title>
        <meta name="description" content="Faites l’expérience du luxe dans nos chambres et suites soigneusement conçues. Chaque espace est conçu pour un confort et une détente ultimes." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-center mb-12">Nos chambres et suites</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={room.image} alt={room.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">{room.price}</span>
                  <button className="bg-gold-600 text-white px-4 py-2 rounded">Réservez maintenant</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

const rooms = [
  {
    name: "Deluxe View",
    description: "Chambre spacieuse avec vue imprenable sur le balcon privé",
    price: "1 200 000 AR/nuit",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Executive Suite",
    description: "Suite luxueuse avec salon séparé et équipements haut de gamme",
    price: "1 800 000 AR/nuit",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Presidential Suite",
    description: "Luxe ultime avec vue panoramique et service de majordome personnel",
    price: "2 000 000 AR/nuit",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"
  }
];

export default Rooms;