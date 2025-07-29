'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, CheckCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';

export default function Cart() {
  const { 
    cart, 
    isCartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    clearCart 
  } = useStore();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCheckingOut(false);
    setOrderCompleted(true);
    
    // Clear cart and close after showing success
    setTimeout(() => {
      clearCart();
      setOrderCompleted(false);
      setCartOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setCartOpen(false)}
          />
          
          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-business-dark border-l border-business-blue/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-business-blue/20">
              <h2 className="text-xl font-semibold text-business-light flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Carrello
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-business-light hover:text-business-blue transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {orderCompleted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <CheckCircle className="w-16 h-16 text-business-green mb-4" />
                  <h3 className="text-xl font-semibold text-business-light mb-2">
                    Ordine Completato!
                  </h3>
                  <p className="text-business-light/70">
                    Grazie per il tuo acquisto. Riceverai una conferma via email.
                  </p>
                </motion.div>
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-business-light/30 mb-4" />
                  <p className="text-business-light/70">Il tuo carrello è vuoto</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-business-secondary rounded-lg p-4 border border-business-blue/10"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-business-light/10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-business-light text-sm mb-1">
                            {item.name}
                          </h3>
                          <p className="text-business-green font-semibold">
                            €{item.price.toFixed(2)}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded bg-business-light/10 hover:bg-business-light/20 text-business-light"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-business-light font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded bg-business-light/10 hover:bg-business-light/20 text-business-light"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && !orderCompleted && (
              <div className="border-t border-business-blue/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-business-light">
                    Totale:
                  </span>
                  <span className="text-xl font-bold text-business-green">
                    €{getTotalPrice().toFixed(2)}
                  </span>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-business-green hover:bg-business-green/90 text-white font-semibold py-3"
                >
                  {isCheckingOut ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Procedi al Checkout'
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}