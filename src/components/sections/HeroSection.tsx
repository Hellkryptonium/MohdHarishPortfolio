'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronRight, FileDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <motion.section 
      id="hero"
      className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="container mx-auto text-center max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mohd Harish
          </h1>
          
          <h2 className="text-xl md:text-2xl mb-6 text-foreground/90">
            Full-Stack Developer & 3D Enthusiast
          </h2>
          
          <p className="text-lg mb-8 max-w-lg mx-auto text-foreground/80">
            Building immersive digital experiences with cutting-edge web technologies and creative 3D visualizations
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <Button 
              asChild
              variant="default"
              className="bg-primary hover:bg-accent text-primary-foreground font-semibold py-3 px-6 shadow-lg hover:shadow-accent/30 transition-all duration-300 text-md w-full sm:w-auto"
            >
              <Link href="/about" className="flex items-center gap-2">
                Learn More About Me
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary font-semibold py-3 px-6 shadow-lg hover:shadow-secondary/20 transition-all duration-300 text-md w-full sm:w-auto"
            >
              <motion.a
                href="/assets/MohdHarish_Resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <FileDown className="w-5 h-5" />
                Download Resume
              </motion.a>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
