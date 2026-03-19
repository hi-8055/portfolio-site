// 

// From here
// data/skills.ts
// This file contains all the skills data for the portfolio
// Customize this file to add/remove/modify your skills

import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiCplusplus,
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiVercel,
  SiFigma,
  SiC,
  SiPytorch,
  SiTensorflow,
  SiSpringboot,
  SiDjango,
  SiWireshark,
} from 'react-icons/si';
import { IconType } from 'react-icons';
import { FaJava } from 'react-icons/fa';


// Skill category interface
export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Individual skill interface
export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

// Skills data organized by categories
export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      {
        name: "Python",
        icon: SiPython,
        color: "#3776AB"
      },
      {
        name: "Java",
        icon: FaJava,
        color: "#ED8B00"
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "#F7DF1E"
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178C6"
      },
      {
        name: "C++",
        icon: SiCplusplus,
        color: "#007396"
      },
      {
        name: "C",
        icon: SiC,
        color: "#007396"
      },
      
      
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      {
        name: "PyTorch",
        icon: SiPytorch,
        color: "#EE4C2C"
      },
      {
        name: "TensorFlow",
        icon: SiTensorflow,
        color: "#FF6F00"
      },
      {
        name: "React",
        icon: SiReact,
        color: "#61DAFB"
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#000000"
      },
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#339933"
      },
      {
        name: "Express",
        icon: SiExpress,
        color: "#000000"
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#06B6D4"
      },
      {
        name: "Spring Boot",
        icon: SiSpringboot,
        color: "#6DB33F"
      },
      {
        name: "Django",
        icon: SiDjango,
        color: "#092E20"
      },
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "#4169E1"
      },
      {
        name: "Git",
        icon: SiGit,
        color: "#F05032"
      },
      {
        name: "Docker",
        icon: SiDocker,
        color: "#2496ED"
      },
      // {
      //   name: "AWS",
      //   icon: SiAmazonwebservices,
      //   color: "#FF9900"
      // },
      {
        name: "Vercel",
        icon: SiVercel,
        color: "#000000"
      },
      {
        name: "Wireshark",
        icon: SiWireshark,
        color: "#1A1A1A"
      },
    ]
  }
];
