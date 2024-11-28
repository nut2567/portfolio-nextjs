"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FullScreenDiv: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isResized, setIsResized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsResized(true);
      } else {
        setIsResized(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="space-y-32">
      {children}
      <WatercolorEffect />
      <JigsawBackground />
    </div>
  );
};

export default FullScreenDiv;

const WatercolorEffect = () => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="w-full h-[300px] flex items-center justify-center rounded-lg shadow-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{
        background: hover
          ? [
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,116,224,0.3) 10%, rgba(0,0,0,0.8) 100%)",
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,116,224,0.6) 100%, rgba(0,0,0,0.8) 100%)",
            ]
          : [
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,116,224,0.6) 50%, rgba(0,0,0,0.8) 100%)",
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,116,224,0.3) 0%, rgba(0,0,0,0.8) 100%)",
            ],
      }}
      transition={{
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.div
        className="text-red-600 text-xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
      >
        {hover ? "Color spreading like watercolor!" : "Hover me"}
      </motion.div>
    </motion.div>
  );
};

const JigsawBackground = () => {
  const rows = 5; // จำนวนแถว
  const cols = 5; // จำนวนคอลัมน์
  const gridItems = Array.from({ length: rows * cols }); // สร้าง grid

  // Variants สำหรับการเปลี่ยนสีทีละชิ้น
  const itemVariants = {
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
    visible: { backgroundColor: "rgba(0, 116, 224, 1)" },
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        staggerChildren: 0.2, // เวลา delay ระหว่างแต่ละชิ้น
      },
    },
  };

  return (
    <motion.div
      className="w-full h-screen grid"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "2px", // ระยะห่างระหว่างจิ๊กซอว์
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {gridItems.map((_, index) => (
        <motion.div
          key={index}
          className="w-full h-full"
          variants={itemVariants}
          initial="hidden"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // เปลี่ยนสีเมื่อ hover
          }}
          transition={{
            duration: 0.6, // ระยะเวลาของแต่ละชิ้น
            ease: "easeInOut",
          }}
        ></motion.div>
      ))}
    </motion.div>
  );
};
