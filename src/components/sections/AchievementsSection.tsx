'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Zap, Trophy } from 'lucide-react'; // Example icons
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: number;
  title: string;
  description: string;
  year: string | number;
  issuer?: string;
  icon?: React.ElementType;
}

// Placeholder achievements data - replace with your actual achievements
const achievementsData: Achievement[] = [
  {
    id: 1,
    title: 'Innovator of the Year (Placeholder)',
    description: 'Recognized for developing a groundbreaking (placeholder) solution that significantly improved (placeholder) efficiency by X%.',
    year: '2024',
    issuer: 'Tech Solutions Inc. (Placeholder)',
    icon: Award,
  },
  {
    id: 2,
    title: 'Top Performer - Project Titan (Placeholder)',
    description: 'Led the (placeholder) team to successfully deliver Project Titan ahead of schedule and under budget, exceeding all KPIs.',
    year: '2023',
    issuer: 'Global Corp Ltd. (Placeholder)',
    icon: Star,
  },
  {
    id: 3,
    title: 'Community Contribution Award (Placeholder)',
    description: 'Awarded for significant contributions to the open-source (placeholder) community, including major feature developments and mentorship.',
    year: '2023',
    issuer: 'Open Source Foundation (Placeholder)',
    icon: Zap,
  },
  {
    id: 4,
    title: 'Hackathon Winner - Future Tech Challenge (Placeholder)',
    description: 'First place in the annual Future Tech Challenge for creating an innovative (placeholder) application using AI and IoT.',
    year: '2022',
    issuer: 'Future Tech Events (Placeholder)',
    icon: Trophy,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-background to-background/90 text-foreground">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
        >
          Milestones & Recognitions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-accent/30 hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-xl flex-shrink-0 mt-1">
                      {achievement.icon ? (
                        <achievement.icon className="w-7 h-7 text-accent" />
                      ) : (
                        <Award className="w-7 h-7 text-accent" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-accent mb-2">
                        {achievement.title}
                      </h3>
                      {achievement.issuer && (
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-primary/10 text-primary border-0">
                            {achievement.year}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {achievement.issuer}
                          </span>
                        </div>
                      )}
                      {!achievement.issuer && (
                        <div className="mb-3">
                          <Badge className="bg-primary/10 text-primary border-0">
                            {achievement.year}
                          </Badge>
                        </div>
                      )}
                      <p className="text-foreground/80">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
