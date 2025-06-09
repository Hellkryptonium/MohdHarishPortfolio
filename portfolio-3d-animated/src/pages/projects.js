import React from 'react';
import Layout from '../components/layout/Layout';
import { projectsData } from '../utils/projectsData'; // Assuming you have a file for project data
import Card from '../components/ui/Card';

const Projects = () => {
    return (
        <Layout>
            <div className="container mx-auto py-10">
                <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsData.map((project, index) => (
                        <Card key={index} project={project} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Projects;