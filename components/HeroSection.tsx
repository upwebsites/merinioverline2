'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-white/10 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            <img
              src="/images/logo/overline_merini_svg.svg"
              alt="Merini Overline Logo"
              className="h-14 md:h-20 w-auto mx-auto"
              style={{ maxWidth: '320px' }}
            />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-inter"
          >
            La tua fonte di fiducia per prodotti e attrezzature per animali. 
            Soluzioni innovative per privati e professionisti.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Heart className="w-6 h-6 text-private-yellow" />
              <span className="font-medium">Amore per gli Animali</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Shield className="w-6 h-6 text-private-yellow" />
              <span className="font-medium">Qualità Garantita</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Award className="w-6 h-6 text-private-yellow" />
              <span className="font-medium">Esperienza Decennale</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-private-orange hover:bg-white/90 font-semibold text-lg px-8 py-4 h-auto"
            >
              <Link href="#choose-type">
                Scopri i Nostri Prodotti
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}