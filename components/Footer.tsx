'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  variant?: 'private' | 'business';
}

export default function Footer({ variant = 'private' }: FooterProps) {
  const isPrivate = variant === 'private';
  
  const bgStyle = isPrivate 
    ? 'bg-gray-900' 
    : 'bg-business-dark border-t border-business-blue/20';
    
  const textStyle = isPrivate 
    ? 'text-gray-300' 
    : 'text-business-light/70';
    
  const accentStyle = isPrivate 
    ? 'text-private-orange' 
    : 'text-business-blue';

  return (
    <footer className={`${bgStyle} text-white pt-16 pb-8`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold font-poppins mb-4">
              <img
                src="/images/logo/overline_merini_svg.svg"
                alt="Merini Overline Logo"
                className="h-10 w-auto inline-block align-middle"
                style={{ maxWidth: '160px' }}
              />
            </h3>
            <p className={`${textStyle} font-inter mb-4 leading-relaxed`}>
              La tua fonte di fiducia per prodotti e attrezzature per animali. 
              Qualità, passione e competenza al servizio dei tuoi amici a quattro zampe.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className={`${accentStyle} hover:opacity-75 transition-opacity`}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className={`${accentStyle} hover:opacity-75 transition-opacity`}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className={`${accentStyle} hover:opacity-75 transition-opacity`}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold font-poppins mb-4">Link Rapidi</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Area Privati', href: '/clienti' },
                { label: 'Area Business', href: '/business' },
                { label: 'Chi Siamo', href: '#' },
                { label: 'Contatti', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`${textStyle} hover:${accentStyle.replace('text-', 'text-')} transition-colors font-inter`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold font-poppins mb-4">Servizi</h4>
            <ul className="space-y-2">
              {[
                'Alimentazione',
                'Accessori',
                'Salute e Igiene',
                'Giochi e Divertimento',
                'Attrezzature Professionali',
              ].map((service) => (
                <li key={service}>
                  <span className={`${textStyle} font-inter`}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold font-poppins mb-4">Contatti</h4>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 ${textStyle}`}>
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="font-inter text-sm">
                  Via Roma 123, 20100 Milano, Italy
                </span>
              </div>
              <div className={`flex items-center gap-3 ${textStyle}`}>
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="font-inter text-sm">
                  +39 02 1234 5678
                </span>
              </div>
              <div className={`flex items-center gap-3 ${textStyle}`}>
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="font-inter text-sm">
                  info@merinioverline.com
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-2">Orari di Apertura</h5>
              <div className={`${textStyle} text-sm font-inter space-y-1`}>
                <p>Lun - Ven: 9:00 - 18:00</p>
                <p>Sabato: 9:00 - 13:00</p>
                <p>Domenica: Chiuso</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={`border-t ${isPrivate ? 'border-gray-700' : 'border-business-blue/20'} pt-8`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${textStyle} font-inter text-sm text-center md:text-left`}>
              © 2024 Merini Overline. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className={`${textStyle} hover:${accentStyle.replace('text-', 'text-')} transition-colors`}>
                Privacy Policy
              </Link>
              <Link href="#" className={`${textStyle} hover:${accentStyle.replace('text-', 'text-')} transition-colors`}>
                Termini di Servizio
              </Link>
              <Link href="#" className={`${textStyle} hover:${accentStyle.replace('text-', 'text-')} transition-colors`}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}