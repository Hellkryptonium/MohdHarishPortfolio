import '../styles/globals.css'; // Corrected to relative path
import { Inter } from 'next/font/google';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Mohd Harish - Software Engineer',
  description: 'Computer Science student building software across backend engineering, cloud infrastructure, AI, and cybersecurity.',
  keywords: ['Mohd Harish', 'Software Engineer', 'Backend Engineering', 'Cybersecurity', 'Next.js'],
  openGraph: {
    title: 'Mohd Harish - Software Engineer',
    description: 'Computer Science student building software across backend engineering, cloud infrastructure, AI, and cybersecurity.',
    url: 'https://mohdharish.xyz',
    siteName: 'Mohd Harish',
    type: 'website',
  },
  icons: {
    icon: '/assets/images/fav-icon.png',
    apple: '/assets/images/fav-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
