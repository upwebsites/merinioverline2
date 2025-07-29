'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Star, Quote, TrendingUp } from 'lucide-react';

const satisfactionData = [
  { name: 'Qualità Prodotti', value: 96 },
  { name: 'Servizio Clienti', value: 94 },
  { name: 'Tempi Consegna', value: 92 },
  { name: 'Rapporto Qualità-Prezzo', value: 90 },
  { name: 'Esperienza Complessiva', value: 95 },
];

const testimonials = [
  {
    name: 'Maria Rossi',
    text: 'Prodotti di qualità eccellente e spedizioni sempre puntuali. Il mio cane adora le crocchette!',
    rating: 5,
    location: 'Milano',
  },
  {
    name: 'Dr. Giuseppe Bianchi',
    text: 'Come veterinario, apprezzo la selezione accurata dei prodotti e la competenza del team.',
    rating: 5,
    location: 'Roma',
  },
  {
    name: 'Laura Verdi',
    text: 'Servizio clienti fantastico! Mi hanno aiutato a scegliere il trasportino perfetto per il mio gatto.',
    rating: 5,
    location: 'Napoli',
  },
];

export default function SatisfactionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-6">
            Soddisfazione Clienti
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            I numeri parlano chiaro: i nostri clienti sono la nostra priorità
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-private-cream rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-private-orange" />
              <h3 className="text-xl font-semibold font-poppins text-gray-800">
                Valutazioni Cliente (%)
              </h3>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                    stroke="#666"
                  />
                  <YAxis stroke="#666" fontSize={12} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {satisfactionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index % 2 === 0 ? '#FF7A59' : '#48C9B0'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Quote className="w-6 h-6 text-private-green" />
              <h3 className="text-xl font-semibold font-poppins text-gray-800">
                Cosa Dicono i Nostri Clienti
              </h3>
            </div>

            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-private-yellow text-private-yellow" 
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 font-inter mb-4 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {testimonial.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {testimonial.location}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Overall Rating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center bg-hero-gradient text-white rounded-xl p-6"
            >
              <div className="text-4xl font-bold font-poppins mb-2">4.9/5</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-private-yellow text-private-yellow" 
                  />
                ))}
              </div>
              <p className="text-sm opacity-90">
                Basato su oltre 3,000 recensioni
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}