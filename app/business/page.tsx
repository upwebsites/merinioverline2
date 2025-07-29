'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import BusinessLogin from '@/components/BusinessLogin';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/store';
import productsData from '@/lib/products.json';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BusinessPage() {
  const { isBusinessLoggedIn } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (isBusinessLoggedIn) {
      setShowLogin(false);
      // Show all products for business users
      setProducts(productsData);
      setFilteredProducts(productsData);
    }
  }, [isBusinessLoggedIn]);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'Tutti') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const categories = ['Tutti', ...Array.from(new Set(products.map(p => p.category)))];

  if (showLogin || !isBusinessLoggedIn) {
    return <BusinessLogin onSuccess={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-business-dark">
      <Header variant="business" />
      <Cart />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold font-poppins text-business-light mb-4">
            Area <span className="text-business-blue">Business B2B</span>
          </h1>
          <p className="text-lg text-business-light/70 font-inter max-w-2xl mx-auto">
            Catalogo professionale con prezzi riservati e prodotti esclusivi per il tuo business
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-business-secondary rounded-2xl p-6 shadow-lg mb-8 border border-business-blue/10"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-business-light/50 w-5 h-5" />
              <Input
                placeholder="Cerca prodotti..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-business-dark border-business-blue/30 text-business-light placeholder:text-business-light/50 focus:border-business-blue"
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
                    ? "bg-business-blue hover:bg-business-blue/90 text-white" 
                    : "border-business-blue text-business-blue hover:bg-business-blue hover:text-white"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-business-light/70">
            {filteredProducts.length} prodotto{filteredProducts.length !== 1 ? 'i' : ''} disponibile{filteredProducts.length !== 1 ? 'i' : ''}
            {filteredProducts.filter(p => p.isBusinessOnly).length > 0 && (
              <span className="ml-2 text-business-green">
                • {filteredProducts.filter(p => p.isBusinessOnly).length} esclusivo{filteredProducts.filter(p => p.isBusinessOnly).length !== 1 ? 'i' : ''} B2B
              </span>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} variant="business" />
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
            <div className="bg-business-secondary rounded-2xl p-12 shadow-lg max-w-md mx-auto border border-business-blue/10">
              <ShoppingBag className="w-16 h-16 text-business-light/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-business-light mb-2">
                Nessun prodotto trovato
              </h3>
              <p className="text-business-light/70 mb-6">
                Prova a modificare i filtri di ricerca o la categoria selezionata
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tutti');
                }}
                className="bg-business-blue hover:bg-business-blue/90 text-white"
              >
                Rimuovi Filtri
              </Button>
            </div>
          </motion.div>
        )}
      </main>

      <Footer variant="business" />
    </div>
  );
}