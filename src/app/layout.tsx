import '../styles/globals.css'; // Corrected to relative path
import { Inter } from 'next/font/google'; // Example font
import Navbar from '../components/layout/Navbar'; // Changed to relative path
import Footer from '../components/layout/Footer'; // Changed to relative path
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'; // Added import
import { CosmicThemeProvider } from "@/context/CosmicThemeContext"; // Added import
import dynamic from "next/dynamic";
import VisitorCountFloating from '../components/ui/VisitorCountFloating';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });

export const metadata = {
  title: 'MohdHarishPortfolio',
  description: 'Modern 3D Animated Portfolio by Mohd Harish',
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
      <body className="flex flex-col min-h-screen bg-background">
        <CosmicThemeProvider>
          <SmoothScrollProvider navbarOffset={64}> {/* Assuming 64px navbar height */}
            <Navbar />
            <main className="flex-grow pt-16"> {/* Add padding-top to avoid overlap with fixed navbar */}
              {children}
              <Chatbot />
            </main>
            <Footer />
            <VisitorCountFloating />
          </SmoothScrollProvider>
        </CosmicThemeProvider>
      </body>
    </html>
  );
}
