'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from 'lucide-react';

// Placeholder project data - replace with your actual projects
const projects = [
	{
		id: 1,
		title: 'Project Alpha',
		description: 'A cutting-edge web application built with Next.js and Three.js, featuring interactive 3D visualizations.',
		imageUrl: '/assets/images/projects/alpha-preview.png', // Fixed: use actual preview image
		liveLink: '#',
		sourceLink: '#',
		tags: ['Next.js', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
	},
	{
		id: 2,
		title: 'Project Beta',
		description: 'A mobile-first social networking platform with a focus on real-time interactions and a sleek, modern UI.',
		imageUrl: '/assets/images/placeholders/project-beta-placeholder.png', // Updated placeholder path
		liveLink: '#',
		sourceLink: '#',
		tags: ['React Native', 'Firebase', 'Node.js', 'GraphQL'],
	},
	{
		id: 3,
		title: 'Project Gamma',
		description: 'An e-commerce site for a niche market, optimized for performance and user experience, with custom 3D product previews.',
		imageUrl: '/assets/images/placeholders/project-gamma-placeholder.png', // Updated placeholder path
		liveLink: '#',
		sourceLink: '#',
		tags: ['Next.js', 'Stripe', 'PostgreSQL', 'GSAP'],
	},
];

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.2,
			duration: 0.5,
			ease: 'easeOut',
		},
	}),
};

const ProjectsSection = () => {
	return (
		<section id="projects" className="py-16 sm:py-20 px-4 md:px-8 bg-gradient-to-b from-background to-background/90 text-foreground">
			<div className="container mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 text-primary"
				>
					My Creations
				</motion.h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{projects.map((project, index) => (
						<motion.div
							key={project.id}
							custom={index}
							variants={cardVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.2 }}
					>
							<Card className="h-full flex flex-col overflow-hidden bg-card/70 backdrop-blur-sm border-border/50 hover:shadow-accent/20 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 group">
								<div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-gray-200/40 to-gray-100/10 shadow-md border border-border/20">
									<Image
										src={project.imageUrl}
										alt={project.title}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										className="object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 rounded-xl shadow-lg"
										priority={project.id === 1}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></div>
								</div>

								<CardHeader className="pb-2 pt-4">
									<h3 className="text-xl sm:text-2xl font-semibold text-accent group-hover:text-primary transition-colors duration-300">{project.title}</h3>
								</CardHeader>

								<CardContent className="pb-3 flex-grow">
									<p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {project.description}
                  </p>
									<div className="flex flex-wrap gap-1.5 mb-2 sm:mb-4">
										{project.tags.map((tag) => (
											<Badge
												key={tag}
												variant="outline"
												className="text-xs bg-primary/10 text-primary border-primary/30 group-hover:bg-primary/20 transition-colors duration-300"
											>
												{tag}
											</Badge>
										))}
									</div>
								</CardContent>

								<CardFooter className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-3 pt-0 pb-4 px-4">
									<Button
										asChild
										variant="default"
										className="w-full sm:w-auto bg-primary/80 hover:bg-primary text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 text-sm py-2 px-3"
									>
										<a
											href={project.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center gap-1.5"
										>
											<ExternalLink className="w-3.5 h-3.5" />
											Live Demo
										</a>
									</Button>

									<Button
										asChild
										variant="outline"
										className="w-full sm:w-auto border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary group-hover:border-primary/70 group-hover:text-primary transition-all duration-300 text-sm py-2 px-3"
									>
										<a
											href={project.sourceLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center gap-1.5"
										>
											<Github className="w-3.5 h-3.5" />
											Source
										</a>
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
