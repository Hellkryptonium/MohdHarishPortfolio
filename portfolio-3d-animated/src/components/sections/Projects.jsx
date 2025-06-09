import React from 'react';
import Card from '../ui/Card';

const projects = [
    {
        title: 'Project One',
        description: 'A brief description of Project One.',
        image: '/assets/images/project-one.png',
        link: 'https://link-to-project-one.com'
    },
    {
        title: 'Project Two',
        description: 'A brief description of Project Two.',
        image: '/assets/images/project-two.png',
        link: 'https://link-to-project-two.com'
    },
    {
        title: 'Project Three',
        description: 'A brief description of Project Three.',
        image: '/assets/images/project-three.png',
        link: 'https://link-to-project-three.com'
    }
];

const Projects = () => {
    return (
        <section className="projects-section">
            <h2 className="text-3xl font-bold mb-6">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} title={project.title} description={project.description} image={project.image} link={project.link} />
                ))}
            </div>
        </section>
    );
};

export default Projects;