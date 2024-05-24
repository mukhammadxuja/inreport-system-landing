"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from "react";

function Test() {
  return (
    <div className="relative h-screen">
      <motion.div
        className="absolute w-10 h-10 bg-blue-500 rounded-full"
        drag // Enable dragging
        dragConstraints={{
          top: 0,
          bottom: window.innerHeight,
          left: 0,
          right: window.innerWidth,
        }} // Allow dragging within the window
        dragElastic={0.2} // Make dragging less rigid
        whileTap={{ scale: 1.2 }} // Scale up while dragging
        animate={{ y: window.innerHeight }} // Animate falling from top to bottom
        transition={{ duration: 2, ease: "easeInOut" }} // Falling animation duration and easing
      />
    </div>
  );
}

export default Test;
