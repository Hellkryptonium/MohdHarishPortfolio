'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Code, Database, Zap, LayoutDashboard, Brain } from 'lucide-react'; // Example icons
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Skill {
  name: string;
  level?: string; // e.g., Proficient, Experienced, Familiar
  icon?: React.ElementType;
}

interface SkillCategory {
  category: string;
  icon: React.ElementType;
  skills: Skill[];
}

// Placeholder skills data - replace with your actual skills
const skillsData: SkillCategory[] = [
  {
    category: 'Frontend Development',
    icon: LayoutDashboard,
    skills: [
      { name: 'React & Next.js', level: 'Expert', icon: Code },
      { name: 'TypeScript', level: 'Proficient', icon: Code },
      { name: 'Tailwind CSS', level: 'Expert', icon: Code },
      { name: 'Three.js & R3F', level: 'Experienced', icon: Code },
      { name: 'Framer Motion & GSAP', level: 'Experienced', icon: Zap },
    ],
  },
  {
    category: 'Backend Development',
    icon: Database,
    skills: [
      { name: 'Node.js & Express', level: 'Experienced', icon: Code },
      { name: 'Python & Django/Flask', level: 'Familiar', icon: Code },
      { name: 'REST APIs & GraphQL', level: 'Proficient', icon: Code },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: Zap,
    skills: [
      { name: 'Git & GitHub', level: 'Expert', icon: Code },
      { name: 'Docker', level: 'Familiar', icon: Code },
      { name: 'Vercel & Netlify', level: 'Proficient', icon: Code },
      { name: 'Firebase', level: 'Experienced', icon: Database },
    ],
  },
  {
    category: 'Other Skills',
    icon: Brain,
    skills: [
      { name: 'UI/UX Principles', level: 'Proficient', icon: LayoutDashboard },
      { name: 'Agile Methodologies', level: 'Experienced', icon: CheckCircle },
      { name: 'Problem Solving', level: 'Expert', icon: Brain },
    ],
  },
];

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 px-4 md:px-8 bg-gradient-to-t from-background to-background/90 text-foreground">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-primary"
        >
          My Technical Arsenal
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillsData.map((categoryItem, catIndex) => (
            <motion.div
              key={categoryItem.category}
              custom={catIndex}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="h-full flex flex-col border-border/40 bg-card/70 backdrop-blur-sm hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300 group">
                <CardHeader className="pb-3 pt-5 px-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <categoryItem.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-accent group-hover:text-primary transition-colors duration-300">{categoryItem.category}</h3>
                  </div>
                  <Separator className="bg-accent/20 group-hover:bg-primary/30 transition-colors duration-300" />
                </CardHeader>
                <CardContent className="px-5 pb-5 flex-grow">
                  <ul className="space-y-2.5 sm:space-y-3">
                    {categoryItem.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skill.name}
                        custom={skillIndex}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex items-center group/skill hover:bg-primary/5 p-2 rounded-md transition-colors duration-200 -mx-2"
                      >
                        <div className="bg-secondary/10 group-hover/skill:bg-secondary/20 p-1.5 rounded-md mr-2.5 sm:mr-3 transition-colors duration-200">
                          {skill.icon ? (
                            <skill.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary group-hover/skill:text-secondary/80 transition-colors duration-200" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary group-hover/skill:text-secondary/80 transition-colors duration-200" />
                          )}
                        </div>
                        <span className="flex-grow text-sm sm:text-base text-foreground group-hover/skill:text-primary transition-colors duration-200">{skill.name}</span>
                        {skill.level && (
                          <Badge
                            variant="outline"
                            className={`
                              ml-auto text-xs px-2 py-0.5 border-opacity-50
                              ${skill.level === 'Expert' ? 'bg-accent/15 text-accent border-accent/30 group-hover/skill:bg-accent/25 group-hover/skill:border-accent/50' : 
                                skill.level === 'Proficient' ? 'bg-primary/15 text-primary border-primary/30 group-hover/skill:bg-primary/25 group-hover/skill:border-primary/50' : 
                                skill.level === 'Experienced' ? 'bg-secondary/15 text-secondary border-secondary/30 group-hover/skill:bg-secondary/25 group-hover/skill:border-secondary/50' : 
                                'bg-muted/40 text-muted-foreground border-muted/60 group-hover/skill:bg-muted/60'}
                               transition-all duration-200
                            `}
                          >
                            {skill.level}
                          </Badge>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
