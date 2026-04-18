import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}
export function SectionWrapper({
  children,
  className = '',
  id
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{
        opacity: 0,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-100px'
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut'
      }}
      className={`py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      
      {children}
    </motion.section>);

}