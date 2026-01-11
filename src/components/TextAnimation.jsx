
"use client";
import './ui/layout-text-flip.css'
import { LayoutTextFlip } from "./ui/layout-text-flip";
import { motion } from "framer-motion";

export default function LayoutTextFlipDemo() {
  return (
    <div>
      <motion.div
        className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row"
      >
        <LayoutTextFlip
          
          words={["Premium Websites", "Luxury Websites ", "SaaS Websites", "Business Websites","Startup Websites","AI-Powered Websites "]}
        
           style={{ fontSize: '36px', color: '#36A5FF', fontWeight: '700' }}
        />
      </motion.div>
 
    </div>
  );
}