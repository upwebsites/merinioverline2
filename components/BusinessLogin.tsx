'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, Building2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store';

interface BusinessLoginProps {
  onSuccess: () => void;
}

export default function BusinessLogin({ onSuccess }: BusinessLoginProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { loginBusiness } = useStore();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!email) {
      newErrors.email = 'Email richiesta';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email non valida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Invia la mail alla API
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    setIsLoading(false);

    if (res.ok) {
      loginBusiness(email);
      onSuccess();
    } else {
      let msg = 'Errore durante la registrazione. Riprova.';
      try {
        const data = await res.json();
        if (typeof data.error === 'string') msg = data.error;
      } catch {}
      // Se la mail è già registrata, permetti comunque l'accesso
      if (res.status === 409) {
        loginBusiness(email);
        onSuccess();
        return;
      }
      setErrors({ email: msg });
    }
  };

  return (
    <div className="min-h-screen bg-business-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-business-secondary rounded-2xl p-8 border border-business-blue/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-business-blue/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-business-blue" />
            </div>
            <h1 className="text-2xl font-bold font-poppins text-business-light mb-2">
              Accesso Business B2B
            </h1>
            <p className="text-business-light/70 font-inter">
              Accedi alla tua area riservata professionale
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-business-light mb-2">
                Email Aziendale
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-business-light/50 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-business-dark border-business-blue/30 text-business-light placeholder:text-business-light/50 focus:border-business-blue"
                  placeholder="nome@azienda.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-business-blue hover:bg-business-blue/90 text-white font-semibold py-3 h-auto"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Accedi
                </>
              )}
            </Button>
          </form>
          <p className="text-xs text-business-light/60 text-center mt-2">
            L'indirizzo email potrebbe essere utilizzato per l'invio di una newsletter informativa.
          </p>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-business-light/70">
            <p>
              Non hai un account? 
              <a href="mailto:business@merinioverline.com" className="text-business-blue hover:underline ml-1">
                Richiedi l'accesso
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}