import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Equipement = () => {
  return (
    <>
      <Helmet>
        <title>Equipement - Luxury Resort</title>
        <meta name="description" content="Découvrez nos installations de classe mondiale, notamment un spa, un centre de remise en forme et une piscine à débordement. Tout ce dont vous avez besoin pour un séjour parfait." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-center mb-12">Équipements du complexe</h1>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={facility.image} alt={facility.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2">{facility.name}</h3>
                <p className="text-gray-600 mb-4">{facility.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Heures: {facility.hours}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </>
  );
};

const facilities = [
  {
    name: "Piscine infinie",
    description: "Notre piscine à débordement signature surplombant l’océan, parfaite pour se détendre",
    hours: "6:00 AM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Luxury Spa",
    description: "Rajeunissez votre corps et votre esprit avec nos soins de spa haut de gamme",
    hours: "9:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Centre de Fitness",
    description: "Équipement de pointe et services d’entraînement personnel",
    hours: "Acces 24/7",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
  }
];

export default Equipement;