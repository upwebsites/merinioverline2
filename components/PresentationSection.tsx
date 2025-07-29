'use client';

import { motion } from 'framer-motion';
import { Users, Truck, Headphones, Star } from 'lucide-react';

export default function PresentationSection() {
  const stats = [
    { icon: Users, label: 'Clienti Soddisfatti', value: '15,000+' },
    { icon: Truck, label: 'Consegne Effettuate', value: '50,000+' },
    { icon: Headphones, label: 'Supporto 24/7', value: 'Sempre' },
    { icon: Star, label: 'Valutazione Media', value: '4.9/5' },
  ];

  return (
    <section className="py-20 bg-private-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-6">
            Chi Siamo
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Da oltre 20 anni, Merini Overline è il partner di fiducia per chi ama gli animali. 
            Offriamo una vasta gamma di prodotti di alta qualità, dal cibo ai giocattoli, 
            dalle attrezzature veterinarie ai sistemi di sicurezza più avanzati.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-private-orange/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-private-orange" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-poppins">
                {stat.value}
              </h3>
              <p className="text-gray-600 font-inter">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-semibold font-poppins text-gray-800 mb-4">
            La Nostra Missione
          </h3>
          <p className="text-gray-600 font-inter text-lg leading-relaxed max-w-4xl mx-auto">
            Crediamo che ogni animale meriti il meglio. Per questo selezioniamo accuratamente 
            ogni prodotto, collaboriamo con i migliori fornitori e offriamo un servizio clienti 
            eccellente. Che tu sia un proprietario di animali domestici o un professionista del 
            settore, abbiamo la soluzione giusta per te.
          </p>
        </motion.div>
      </div>
    </section>
  );
}