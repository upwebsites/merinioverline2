'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/store';
import productsData from '@/lib/products.json';

export default function ClientiPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Filter out business-only products for private clients
    const privateProducts = productsData.filter(product => !product.isBusinessOnly);
    setProducts(privateProducts);
    setFilteredProducts(privateProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'Tutti') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const categories = ['Tutti', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-private-cream">
      <Header variant="private" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold font-poppins text-gray-800 mb-4">
            Area <span className="text-private-orange">Privati</span>
          </h1>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
            Scopri la nostra selezione di prodotti di alta qualità per i tuoi amici a quattro zampe
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Cerca prodotti..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-private-orange"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-private-orange hover:bg-private-orange/90 text-white" 
                    : "border-private-orange text-private-orange hover:bg-private-orange hover:text-white"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredProducts.length} prodotto{filteredProducts.length !== 1 ? 'i' : ''} trovato{filteredProducts.length !== 1 ? 'i' : ''}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`grid gap-6 mb-12 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} variant="private" />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nessun prodotto trovato
              </h3>
              <p className="text-gray-600 mb-6">
                Prova a modificare i filtri di ricerca o la categoria selezionata
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tutti');
                }}
                className="bg-private-orange hover:bg-private-orange/90 text-white"
              >
                Rimuovi Filtri
              </Button>
            </div>
          </motion.div>
        )}
      </main>

      <Footer variant="private" />
    </div>
  );
}