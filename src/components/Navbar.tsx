import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-serif">Luxury Resort</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/Chambres-et-suites" className="text-gray-700 hover:text-gray-900">Chambres et suites</Link>
            <Link to="/Restauration" className="text-gray-700 hover:text-gray-900">Restauration</Link>
            <Link to="/Equipement" className="text-gray-700 hover:text-gray-900">Équipement</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            <Link to="/book-now" className="bg-gold-600 text-white px-4 py-2 rounded-md">Réservez maintenant</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/Chambres-et-suites" className="block px-3 py-2 text-gray-700">Chambres et suites</Link>
            <Link to="/Restauration" className="block px-3 py-2 text-gray-700">Restauration</Link>
            <Link to="/Equipement" className="block px-3 py-2 text-gray-700">Équipement</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700">Contact</Link>
            <Link to="/book-now" className="block px-3 py-2 bg-gold-600 text-white rounded-md">Réservez maintenant</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;