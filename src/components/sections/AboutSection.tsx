'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileDown } from 'lucide-react'; // Import icon for the download button
import Link from 'next/link';

const AboutSection = () => {
  return (
    <motion.section 
      id="about"
      className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center bg-gradient-to-br from-background to-muted overflow-hidden" // Added overflow-hidden
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Card className="container mx-auto max-w-3xl bg-card/60 backdrop-blur-md border-accent/20">
        <CardContent className="pt-8 px-6 md:px-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary text-center">
            About Me
          </h2>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg glow-effect flex-shrink-0"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <img 
                src="/assets/images/placeholders/profile-placeholder.png" // Updated placeholder path
                alt="Mohd Harish"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-overlay"></div>
            </motion.div>
            <motion.div 
              className="text-center md:text-left"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-accent mb-2">Mohd Harish</h3>
              <p className="text-md md:text-lg text-foreground/80 mb-4">Creative Full-Stack Developer | 3D Enthusiast</p>
              <div className="flex justify-center md:justify-start space-x-3">
                {/* Placeholder for social media icons */}
                <a href="https://github.com/Hellkryptonium" className="text-primary hover:text-accent transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-4.3 1.4 -4.3-2.5 -6-3m12 5v-3.5c0-1 .1-1.4 -.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0 -1.3-3.2a4.2 4.2 0 0 0 -.1-3.2s-1.1-.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4-1.6 -3.5-1.3 -3.5-1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6.5 -.6 1.2 -.5 2V21"/></svg></a>
                <a href="https://www.linkedin.com/in/mohd-harish-126a58256/" className="text-primary hover:text-accent transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0 -2-2 2 2 0 0 0 -2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
                <a href="https://www.instagram.com/_harish999/" className="text-primary hover:text-accent transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>

              </div>
            </motion.div>
          </motion.div>

          <p className="text-md md:text-lg text-foreground/90 mb-4 leading-relaxed">
            Hello! I'm Mohd Harish, a passionate and creative developer with a love for building immersive and dynamic web experiences. My journey into the world of code started with a fascination for how interactive digital art and user interfaces come to life.
          </p>

          <Separator className="my-6 bg-accent/30" />

          <p className="text-md md:text-lg text-foreground/90 mb-4 leading-relaxed">
            I specialize in modern JavaScript frameworks like Next.js and have a strong affinity for 3D graphics using Three.js and React Three Fiber. I believe in the power of combining cutting-edge technology with aesthetic design to create memorable user interactions.
          </p>

          <p className="text-md md:text-lg text-foreground/90 mb-8 leading-relaxed">
            When I'm not coding, you can find me exploring new animation techniques, contributing to open-source projects, or diving into the latest sci-fi novel.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              asChild
              variant="default"
              className="bg-primary hover:bg-accent text-primary-foreground font-semibold py-3 px-6 shadow-lg hover:shadow-accent/30 transition-all duration-300 text-md w-full sm:w-auto"
            >
              <motion.a
                href="/assets/MohdHarish_Resume.pdf" // Replace with your actual resume path
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <FileDown className="w-5 h-5" />
                Download My Resume
              </motion.a>
            </Button>            <Button 
              asChild
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary font-semibold py-3 px-6 shadow-lg hover:shadow-secondary/20 transition-all duration-300 text-md w-full sm:w-auto"
            >
              <a href="mailto:harishjs1006@gmail.com?subject=Hello%20Mohd%20Harish%20-%20From%20Your%20Portfolio" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Let's Connect
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default AboutSection;
