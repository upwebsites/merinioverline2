'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  variant?: 'private' | 'business';
}

export default function Header({ variant = 'private' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, setCartOpen, isBusinessLoggedIn, businessEmail, logoutBusiness } = useStore();
  
  const isPrivate = variant === 'private';
  const totalItems = getTotalItems();

  const headerStyle = isPrivate 
    ? 'bg-private-cream border-private-orange/20' 
    : 'bg-business-dark border-business-blue/20';
    
  const textStyle = isPrivate 
    ? 'text-gray-800' 
    : 'text-business-light';
    
  const buttonStyle = isPrivate
    ? 'bg-private-orange hover:bg-private-orange/90 text-white'
    : 'bg-business-blue hover:bg-business-blue/90 text-white';

  return (
    <motion.header 
      className={`sticky top-0 z-50 border-b ${headerStyle} backdrop-blur-md`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/images/logo/overline_merini_svg.svg"
                alt="Merini Overline Logo"
                className="h-10 w-auto"
                style={{ maxWidth: '160px' }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${textStyle} hover:opacity-75 transition-opacity`}>
              Home
            </Link>
            <Link href="/clienti" className={`${textStyle} hover:opacity-75 transition-opacity`}>
              Clienti
            </Link>
            <Link href="/business" className={`${textStyle} hover:opacity-75 transition-opacity`}>
              Business
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Business Auth Status */}
            {!isPrivate && isBusinessLoggedIn && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-business-light">
                <User className="w-4 h-4" />
                <span>{businessEmail}</span>
                <button 
                  onClick={logoutBusiness}
                  className="text-business-blue hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
            
            {/* Cart Button */}
            {!isPrivate && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCartOpen(true)}
                className={`relative p-2 rounded-lg ${buttonStyle}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-business-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ${textStyle}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-opacity-20"
          >
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`${textStyle} hover:opacity-75 transition-opacity`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/clienti" 
                className={`${textStyle} hover:opacity-75 transition-opacity`}
                onClick={() => setIsMenuOpen(false)}
              >
                Clienti
              </Link>
              <Link 
                href="/business" 
                className={`${textStyle} hover:opacity-75 transition-opacity`}
                onClick={() => setIsMenuOpen(false)}
              >
                Business
              </Link>
              
              {!isPrivate && isBusinessLoggedIn && (
                <div className="flex items-center justify-between pt-4 border-t border-opacity-20">
                  <span className="text-sm text-business-light">{businessEmail}</span>
                  <button 
                    onClick={() => {
                      logoutBusiness();
                      setIsMenuOpen(false);
                    }}
                    className="text-business-blue hover:underline text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}