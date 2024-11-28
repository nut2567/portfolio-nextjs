"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";

const ProjectCard = ({
  data,
}: {
  data: { link: string; name: string; Libraries: string }[];
}) => {
  const ref = useRef(null);

  // ตรวจสอบว่ากล่องอยู่ใน Viewport หรือไม่
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  // สุ่มเลื่อนเข้าจากซ้ายหรือขวา
  const direction = Math.random() > 0.5 ? 100 : -100;

  // สร้าง delay โดยสัมพันธ์กับลำดับหรือกลุ่ม
  const delay = Math.random() * 0.5;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 container">
      {data.map((item, index) => (
        <>
          <motion.div
            key={index}
            ref={ref}
            className="relative border rounded-lg shadow-lg bg-[#0000003d] p-6 flex flex-col justify-between"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.5) 0px -10px 60px inset",
              minHeight: "300px",
            }}
            initial={{ opacity: 0, x: direction }}
            animate={isInView ? { opacity: 1, x: 0 } : {}} // Animate เมื่ออยู่ใน Viewport
            transition={{
              duration: 0.8,
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.5)",
            }}
          >
            <div
              className="border rounded-lg shadow p-4 relative bg-[#0000003d] gap-3 grid"
              style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px -10px 60px inset" }}
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-400">Libraries: {item.Libraries}</p>
            </div>
            <Link href={`${item.link}`}>
              <div className="flex items-center p-2 btn btn-primary rounded justify-center">
                <div className="flex">View Project</div>
              </div>
            </Link>
          </motion.div>
        </>
      ))}
    </div>
  );
};

export default ProjectCard;
