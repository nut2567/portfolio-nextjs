// app/(portfolio)/projects/ProjectCard.tsx
"use client";
import { motion, Variants, useInView } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

export interface Project {
  id: string;
  index: number;
  name: string;
  framework: string;
  createdAt: number;
  targets: {
    production: {
      alias: string[];
      domain: string[];
    };
  };
  latestDeployments: {
    uid: string;
    state: string;
    url: string;
    alias: string[];
  }[];
  directionx: number;
  directiony: number;
}

const ProjectCard = ({ project }: { project: Project }) => {
  // Variants สำหรับแอนิเมชั่นเลื่อนเข้าซ้าย-ขวาพร้อมเฟดอิน

  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const slideInVariants: Variants = {
    hidden: { opacity: 0, x: -100 }, // เริ่มต้นด้านซ้ายพร้อมความโปร่งใส 0
    visible: { opacity: 1, x: 0 }, // เคลื่อนเข้ามาตรงกลางพร้อมความโปร่งใส 1
  };

  // สร้าง delay โดยสัมพันธ์กับ index ของกล่อง
  const delay = project.index * 0.2;
  return (
    <motion.div
      ref={ref}
      animate={
        isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 0, y: 0 }
      }
      key={project.name}
      className="relative border rounded-lg shadow-lg bg-[#0000003d] p-6 flex flex-col justify-between"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.5) 0px -10px 60px inset",
        minHeight: "300px", // กำหนดความสูงเท่ากัน
      }}
      initial={{ opacity: 0, x: project.directionx, y: project.directiony }}
      transition={{
        duration: Math.random() * 0.5 + 0.8, // สุ่มระยะเวลา,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.5)",
      }}
    >
      <div>
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <p className="text-gray-400 mt-2">Framework: {project.framework}</p>
        <p className="text-gray-300 mt-1">
          Domain: {project.latestDeployments[0]?.alias[0]}
        </p>
        <p className="text-gray-100 mt-1">
          Latest Deployment:{" "}
          {new Date(project.createdAt).toLocaleDateString("th-TH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </div>
      <a
        href={`https://${project.latestDeployments[0]?.alias[0]}`}
        target="_blank"
        rel="noopener noreferrer"
      ><motion.button
        whileTap={{ scale: 0.9, rotate: 3 }}
        className="btn btn-primary mt-auto absolute bottom-6 left-6 right-6"
      >

          View Project

        </motion.button></a>
    </motion.div>
  );
};

export default ProjectCard;
