"use client";
import { AnimatePresence, motion } from "framer-motion";
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
      <SnapEffect />
      <WaveTransition />
      <ShrinkingTransition />
      <TextInBoxWithOverflow />
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

function SnapEffect() {
  const [showFirst, setShowFirst] = useState(true);

  // Variants สำหรับ Animation
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5, rotate: 90 },
  };

  return (
    <div className="flex flex-col items-center justify-center h-fit pt-10 bg-gray-800">
      <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.div
            key="div1"
            className="w-64 h-64 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            Div 1
          </motion.div>
        ) : (
          <motion.div
            key="div2"
            className="w-64 h-64 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            Div 2
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowFirst(!showFirst)}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Snap!
      </button>
    </div>
  );
}

function WaveTransition() {
  const [showFirst, setShowFirst] = useState(true);

  // Variants สำหรับ Animation
  const variants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100, // หาก direction > 0 มาแสดงจากขวา, < 0 จากซ้าย
    }),
    visible: { opacity: 1, x: 0 },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100, // หากกำลังออก ให้เลื่อนตามทิศทางที่กำหนด
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center h-fit pt-10 bg-gray-800">
      <AnimatePresence custom={showFirst ? 1 : -1} mode="wait">
        {showFirst ? (
          <motion.div
            key="div1"
            className="w-64 h-64 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={1} // เลื่อนจากขวาไปซ้าย
            transition={{ duration: 0.8 }}
          >
            Div 1
          </motion.div>
        ) : (
          <motion.div
            key="div2"
            className="w-64 h-64 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={-1} // เลื่อนจากซ้ายไปขวา
            transition={{ duration: 0.8 }}
          >
            Div 2
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowFirst(!showFirst)}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Wave Transition
      </button>
    </div>
  );
}

function ShrinkingTransition() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 relative h-fit pt-10">
      {/* Div ซ้อนกัน */}
      <div className="relative w-64 h-64">
        {/* Div ด้านล่าง (พื้นหลัง) */}
        <AnimatePresence>
          {!isVisible && (
            <motion.div
              key={`div1-${!isVisible}`}
              className="absolute w-full h-full bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl overflow-hidden"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1, transformOrigin: "left" }}
              exit={{ scaleX: 0, transformOrigin: "left" }}
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* ใช้ div สำหรับตัวหนังสือ */}
              <div className="text-white font-bold text-xl w-full text-center">
                Div 1
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Div ด้านบน (ที่ลดขนาดจากขวา) */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              key={`div1-${isVisible}`}
              className="absolute w-full h-full bg-purple-500 rounded-lg flex justify-center items-center"
              initial={{ scaleX: 0, transformOrigin: "right" }}
              animate={{ scaleX: 1, transformOrigin: "right" }}
              exit={{ scaleX: 0, transformOrigin: "right" }}
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* ใช้ div สำหรับตัวหนังสือ */}
              <div className="text-white font-bold text-xl w-full text-center overflow-auto">
                <p className="w-64">Div 1</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ปุ่มสลับสถานะ */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Shrink from Right
      </button>
    </div>
  );
}

function TextInBoxWithOverflow() {
  const [isShrinking, setIsShrinking] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 h-fit pt-10">
      {/* กล่องที่ย่อ */}
      <div
        className="relative w-64 h-32 bg-gray-200 rounded-lg"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.5) 0px 4px 10px",
        }}
      >
        {/* กรอบที่ย่อ */}
        <motion.div
          className="absolute inset-0 bg-purple-500 overflow-hidden  max-w-full"
          initial={{ width: "100%" }}
          animate={{ width: isShrinking ? "0%" : "100%" }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="inline-block">This text stays the same size</div>
        </motion.div>
      </div>

      {/* ปุ่มควบคุม */}
      <button
        onClick={() => setIsShrinking(!isShrinking)}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        {isShrinking ? "Reset" : "Shrink"}
      </button>
    </div>
  );
}
