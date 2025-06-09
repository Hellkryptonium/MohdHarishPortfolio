import React from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedText = ({ text }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const letters = textRef.current.children;
        const tl = gsap.timeline();

        for (let i = 0; i < letters.length; i++) {
            tl.from(letters[i], {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'power2.out',
            }, 0);
        }
    }, [text]);

    return (
        <h1 ref={textRef} className="text-4xl font-bold">
            {text.split('').map((letter, index) => (
                <span key={index}>{letter}</span>
            ))}
        </h1>
    );
};

export default AnimatedText;