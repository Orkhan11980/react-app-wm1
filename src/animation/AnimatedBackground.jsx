// AnimatedBackground.jsx
import React, { useEffect } from 'react';

const AnimatedBackground = () => {
    useEffect(() => {
        // Function to adjust the height of the container dynamically
        function adjustContainerHeight() {
            const container = document.getElementById('animated-background-container');
            const docHeight = document.body.scrollHeight;
            container.style.height = `${docHeight}px`;
        }

        // Function to create a moving element
        function createMovingElement() {
            const container = document.getElementById('animated-background-container');
            const elem = document.createElement('div');
            elem.classList.add('animated-element');
            elem.style.position = 'absolute';
            elem.style.left = `${Math.random() * 100}%`;
            elem.style.top = '-50px';
            elem.style.width = '50px';
            elem.style.height = '50px';
            elem.style.backgroundColor = '#faa';
            elem.style.opacity = Math.random().toFixed(2);
            container.appendChild(elem);

            const keyframes = [
                { transform: 'translateY(0)' },
                { transform: `translateY(${document.body.scrollHeight}px)` },
            ];

            const timing = {
                duration: 3000 + Math.random() * 10000,
                iterations: 1,
                easing: 'linear',
            };

            const animation = elem.animate(keyframes, timing);
            animation.onfinish = () => elem.remove();
        }

        // Initial setup
        adjustContainerHeight();
        window.addEventListener('resize', adjustContainerHeight);
        const intervalId = setInterval(createMovingElement, 500);

        // Cleanup function
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', adjustContainerHeight);
        };
    }, []);

    return <div id="animated-background-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}></div>;
};

export default AnimatedBackground;
