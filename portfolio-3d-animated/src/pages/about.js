import React from 'react';
import Layout from '../components/layout/Layout';
import AnimatedText from '../components/ui/AnimatedText';

const About = () => {
    return (
        <Layout>
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">About Me</h1>
                <AnimatedText text="Welcome to my portfolio!" />
                <p className="mt-4 text-lg text-center max-w-2xl">
                    I'm a passionate developer with a love for creating interactive and visually stunning web experiences. 
                    My journey in web development has been fueled by a desire to blend creativity with technology, 
                    and I'm excited to share my work with you!
                </p>
                <p className="mt-2 text-lg text-center max-w-2xl">
                    In this portfolio, you'll find a collection of my projects that showcase my skills in 3D graphics, 
                    animations, and modern web technologies. I hope you enjoy exploring my work as much as I enjoyed creating it!
                </p>
            </section>
        </Layout>
    );
};

export default About;