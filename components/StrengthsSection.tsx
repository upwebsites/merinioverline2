'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Truck, Award, Heart, Users } from 'lucide-react';

export default function StrengthsSection() {
  const strengths = [
    {
      icon: Zap,
      title: 'Consegna Rapida',
      description: 'Spedizioni in 24-48h su tutto il territorio nazionale con tracking in tempo reale.',
      color: 'text-private-orange',
      bgColor: 'bg-private-orange/10',
    },
    {
      icon: Shield,
      title: 'Garanzia Totale',
      description: 'Tutti i prodotti sono coperti da garanzia e certificati per la sicurezza.',
      color: 'text-private-green',
      bgColor: 'bg-private-green/10',
    },
    {
      icon: Heart,
      title: 'Passione Autentica',
      description: 'Il nostro team è composto da veri amanti degli animali che capiscono le tue esigenze.',
      color: 'text-private-yellow',
      bgColor: 'bg-private-yellow/10',
    },
    {
      icon: Award,
      title: 'Qualità Premium',
      description: 'Selezioniamo solo i migliori marchi e prodotti testati da veterinari.',
      color: 'text-private-orange',
      bgColor: 'bg-private-orange/10',
    },
    {
      icon: Users,
      title: 'Supporto Esperto',
      description: 'Il nostro team di esperti è sempre pronto ad aiutarti nella scelta migliore.',
      color: 'text-private-green',
      bgColor: 'bg-private-green/10',
    },
    {
      icon: Truck,
      title: 'Rete Capillare',
      description: 'Presenza su tutto il territorio con magazzini strategici per tempi ridotti.',
      color: 'text-private-yellow',
      bgColor: 'bg-private-yellow/10',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-private-cream/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-6">
            I Nostri Punti di Forza
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            Scopri perché migliaia di clienti scelgono Merini Overline per i loro amici a quattro zampe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`${strength.bgColor} rounded-full p-4 w-16 h-16 mb-6 flex items-center justify-center`}>
                <strength.icon className={`w-8 h-8 ${strength.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold font-poppins text-gray-800 mb-3">
                {strength.title}
              </h3>
              
              <p className="text-gray-600 font-inter leading-relaxed">
                {strength.description}
              </p>

              {/* Decorative Element */}
              <motion.div
                className={`h-1 ${strength.color.replace('text-', 'bg-')} rounded-full mt-4 opacity-0`}
                whileHover={{ opacity: 1, scaleX: 1 }}
                initial={{ scaleX: 0 }}
                style={{ transformOrigin: 'left' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-hero-gradient rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-semibold font-poppins mb-4">
              Pronto a Prenderti Cura del Tuo Amico?
            </h3>
            <p className="text-lg opacity-90 font-inter">
              Unisciti alla famiglia Merini Overline e scopri la differenza della qualità
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}