import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Restauration = () => {
  return (
    <>
      <Helmet>
        <title>Restauration - Luxury Resort</title>
        <meta name="description" content="Laissez-vous tenter par des expériences culinaires exquises dans nos restaurants de classe mondiale. De la cuisine raffinée chez Luxury Resort." />
      </Helmet>

      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-center mb-12">Expériences culinaires</h1>
        <section className="grid md:grid-cols-2 gap-12">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-72 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.cuisine.map((type, i) => (
                    <span key={i} className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
                <button className="bg-gold-600 text-white px-4 py-2 rounded">Reservez une table</button>
              </div>
            </motion.div>
          ))}
        </section>
      </section>
    </>
  );
};

const restaurants = [
  {
    name: "Volamena",
    description: "Restaurant gastronomique proposant une cuisine Locale",
    cuisine: ["Malagasy", "Volamena", "Gastronomie"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Zaridaina",
    description: "Lieu de restauration décontracté toute la journée proposant des ingrédients locaux frais et des saveurs du monde",
    cuisine: ["Local", "Bio", "Casual"],
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=800"
  }
];

export default Restauration;