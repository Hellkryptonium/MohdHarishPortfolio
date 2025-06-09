import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const useAnimation = (animationProps) => {
    const elementRef = useRef(null);

    useEffect(() => {
        if (elementRef.current) {
            gsap.fromTo(
                elementRef.current,
                animationProps.from,
                {
                    ...animationProps.to,
                    onComplete: animationProps.onComplete,
                }
            );
        }
    }, [animationProps]);

    return elementRef;
};

export default useAnimation;