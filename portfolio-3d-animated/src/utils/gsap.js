import { gsap } from 'gsap';

export const fadeIn = (element, duration = 1) => {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration });
};

export const slideIn = (element, direction = 'left', duration = 1) => {
    const xValue = direction === 'left' ? '-100%' : '100%';
    gsap.fromTo(element, { x: xValue, opacity: 0 }, { x: 0, opacity: 1, duration });
};

export const bounce = (element, duration = 1) => {
    gsap.to(element, { y: -30, yoyo: true, repeat: 1, duration });
};

export const rotate = (element, duration = 1) => {
    gsap.to(element, { rotation: 360, duration, ease: 'power1.inOut' });
};