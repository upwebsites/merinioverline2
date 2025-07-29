import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Merini Overline - Prodotti e Attrezzature per Animali',
  description: 'La tua fonte di fiducia per prodotti e attrezzature per animali. Soluzioni per privati e professionisti.',
  keywords: 'animali, prodotti animali, attrezzature veterinarie, pet shop, business animali',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}