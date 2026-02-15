'use client';

import { motion } from 'framer-motion';

interface AnimationWrapperProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
    delay?: number;
    duration?: number;
}

const variants = {
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
};

export default function AnimationWrapper({
    children,
    className = '',
    animation = 'slideUp',
    delay = 0,
    duration = 0.5,
}: AnimationWrapperProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={variants[animation]}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
