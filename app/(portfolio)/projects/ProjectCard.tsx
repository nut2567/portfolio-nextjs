// app/(portfolio)/projects/ProjectCard.tsx
"use client";
import { motion, Variants, useInView } from "framer-motion";
import React from "react";

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
}

const ProjectCard = ({ project }: { project: Project }) => {
  // Variants สำหรับแอนิเมชั่นเลื่อนเข้าซ้าย-ขวาพร้อมเฟดอิน
  const slideInVariants: Variants = {
    hidden: { opacity: 0, x: -100 }, // เริ่มต้นด้านซ้ายพร้อมความโปร่งใส 0
    visible: { opacity: 1, x: 0 }, // เคลื่อนเข้ามาตรงกลางพร้อมความโปร่งใส 1
  };

  // สุ่มเลื่อนเข้าจากซ้ายหรือขวา
  const direction = Math.random() > 0.5 ? 100 : -100;

  // สร้าง delay โดยสัมพันธ์กับ index ของกล่อง
  const delay = project.index * 0.2;
  return (
    <motion.div
      key={project.name}
      className="border rounded-lg shadow p-4 relative bg-[#0000003d] gap-3"
      style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px -10px 60px inset" }}
      initial={{ opacity: 0, x: direction }} // เริ่มต้นเลื่อนจากซ้ายหรือขวา
      animate={{ opacity: 1, x: 0 }} // เคลื่อนเข้ามาอยู่ตรงกลาง
      transition={{
        duration: 0.8,
        delay: delay, // ดีเลย์แต่ละกล่อง
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-400">Framework: {project.framework}</p>
      <p className="text-gray-300">
        Domain: {project.latestDeployments[0]?.alias[0]}
      </p>

      <p className="text-gray-100">
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
      {project.latestDeployments?.length != 0 ? (
        <motion.button
          whileTap={{ scale: 0.9, rotate: 3 }}
          className="btn btn-primary mt-4"
        >
          <a
            href={`https://${project.latestDeployments[0]?.alias[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </motion.button>
      ) : (
        "No deployments"
      )}
    </motion.div>
  );
};

export default ProjectCard;
