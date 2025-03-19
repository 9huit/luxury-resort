import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const handleClick = (id: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "link_click",
    click_id: id,
  });
};


const Home = () => {
  return (
    <>
      <Helmet>
        <title>Luxury Resort - Faites l’expérience d’un confort inégalé</title>
        <meta name="description" content="Bienvenue chez Luxury Resort, où le confort rencontre l’élégance. Découvrez des équipements de classe mondiale, des restaurants exquis et des vues à couper le souffle." />
      </Helmet>

      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
            alt="Luxury hotel pool"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative flex items-center justify-center h-full text-center text-white px-4"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Bienvenue dans Luxury Living</h1>
            <p className="text-xl md:text-2xl mb-8">Faites l’expérience d’un confort et d’une élégance inégalés</p>
            <Link
              to="/Chambres-et-suites"
              id="chambre"
              className="bg-white text-gray-900 px-8 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-colors inline-block text-center"
              onClick={() => handleClick("chambre")}
            >
              Voir nos chambres
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-16">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const services = [
  {
    icon: "🏊‍♂️",
    title: "Piscine infinie",
    description: "Profitez de notre superbe piscine à débordement."
  },
  {
    icon: "🍽️",
    title: "Gastronomique",
    description: "Faites l’expérience de l’excellence culinaire dans nos restaurants primés"
  },
  {
    icon: "🧖‍♀️",
    title: "Luxury Spa",
    description: "Rajeunissez votre corps et votre esprit dans notre spa de classe mondiale"
  }
];

export default Home;