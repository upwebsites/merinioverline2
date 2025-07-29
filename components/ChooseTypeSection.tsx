'use client';

import { motion } from 'framer-motion';
import { User, Building2, ArrowRight, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ChooseTypeSection() {
  return (
    <section id="choose-type" className="py-20 bg-gradient-to-br from-private-cream to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-6">
            Sei un Privato o hai una P.IVA?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            Scegli l'area dedicata alle tue esigenze per scoprire prodotti e servizi personalizzati
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Private Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-private-orange/20"
          >
            <div className="text-center">
              <div className="bg-private-orange/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <User className="w-10 h-10 text-private-orange" />
              </div>
              
              <h3 className="text-2xl font-bold font-poppins text-gray-800 mb-4">
                Area Privati
              </h3>
              
              <p className="text-gray-600 font-inter mb-8 leading-relaxed">
                Dedicata agli amanti degli animali che cercano i migliori prodotti 
                per i loro compagni a quattro zampe. Interface colorata e intuitiva.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-private-orange rounded-full"></div>
                  <span>Catalogo prodotti completo</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-private-green rounded-full"></div>
                  <span>Consigli personalizzati</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-private-yellow rounded-full"></div>
                  <span>Community di appassionati</span>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full bg-private-orange hover:bg-private-orange/90 text-white font-semibold"
              >
                <Link href="/clienti">
                  Entra nell'Area Privati
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Business Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-br from-business-dark to-business-secondary rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-business-blue/50 text-white"
          >
            <div className="text-center">
              <div className="bg-business-blue/20 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-business-blue" />
              </div>
              
              <h3 className="text-2xl font-bold font-poppins mb-4">
                Area Business B2B
              </h3>
              
              <p className="text-business-light/80 font-inter mb-8 leading-relaxed">
                Piattaforma professionale per veterinari, pet shop e rivenditori. 
                Accesso a prodotti esclusivi e prezzi all'ingrosso.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-business-light/70">
                  <Shield className="w-4 h-4 text-business-blue" />
                  <span>Accesso riservato con P.IVA</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-business-light/70">
                  <Zap className="w-4 h-4 text-business-green" />
                  <span>Prezzi all'ingrosso</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-business-light/70">
                  <Building2 className="w-4 h-4 text-business-blue" />
                  <span>Prodotti professionali esclusivi</span>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full bg-business-blue hover:bg-business-blue/90 text-white font-semibold"
              >
                <Link href="/business">
                  Accedi al B2B
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 font-inter text-sm">
            Non sei sicuro di quale area scegliere? 
            <a href="mailto:info@merinioverline.com" className="text-private-orange hover:underline ml-1">
              Contattaci per assistenza
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}