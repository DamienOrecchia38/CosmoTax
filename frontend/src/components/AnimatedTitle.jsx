import { motion } from 'framer-motion';

export default function AnimatedTitle() {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-8xl font-extrabold text-center my-20 bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text font-['Bangers'] tracking-widest"
    >
      Payez ou mourrez !
    </motion.h1>
  );
}