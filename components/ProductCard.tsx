'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/store';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  variant?: 'private' | 'business';
}

export default function ProductCard({ product, variant = 'private' }: ProductCardProps) {
  const { addToCart } = useStore();
  const isPrivate = variant === 'private';

  const cardStyle = isPrivate
    ? 'bg-white hover:shadow-xl hover:shadow-private-orange/20 border-private-cream'
    : 'bg-business-secondary hover:shadow-xl hover:shadow-business-blue/20 border-business-blue/10';

  const textStyle = isPrivate
    ? 'text-gray-800'
    : 'text-business-light';

  const priceStyle = isPrivate
    ? 'text-private-green'
    : 'text-business-green';

  const buttonStyle = isPrivate
    ? 'bg-private-orange hover:bg-private-orange/90 text-white'
    : 'bg-business-blue hover:bg-business-blue/90 text-white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`rounded-xl border ${cardStyle} overflow-hidden transition-all duration-300 group`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-800"
            >
              <Eye className="w-4 h-4 mr-2" />
              Dettagli
            </Button>
          </motion.div>
        </div>

        {/* Business Only Badge */}
        {product.isBusinessOnly && (
          <div className="absolute top-2 right-2 bg-business-blue text-white text-xs px-2 py-1 rounded-full">
            B2B
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Esaurito
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <span className={`text-sm ${isPrivate ? 'text-private-orange' : 'text-business-blue'} font-medium`}>
            {product.category}
          </span>
        </div>
        
        <h3 className={`font-semibold text-lg mb-2 ${textStyle} line-clamp-2`}>
          {product.name}
        </h3>
        
        <p className={`text-sm ${textStyle}/70 mb-3 line-clamp-2`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className={`text-xl font-bold ${priceStyle}`}>
            €{product.price.toFixed(2)}
          </span>
          
          {variant === 'business' && (
            <Button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              size="sm"
              className={buttonStyle}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Aggiungi
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}