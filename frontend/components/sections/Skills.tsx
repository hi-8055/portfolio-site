// components/sections/Skills.tsx
"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/lib/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      {/* Separator */}
      <div className="hr-fade mb-20" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Expertise</p>
          <h2 className="font-display text-4xl sm:text-5xl text-paper">
            Skills & <span className="italic text-acid">Tools</span>
          </h2>
        </motion.div>

        {/* Categories */}
        <div className="space-y-16">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {/* Category Title */}
              <h3 className="text-xl sm:text-2xl font-medium text-paper mb-8">
                {category.title}
              </h3>

              {/* Skills Grid (LIKE CODE 2) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay:
                          categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      whileHover={{ y: -6, scale: 1.05 }}
                      className="group"
                    >
                      {/* Card */}
                      <div className="card-border bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-slate-900 transition-all duration-300">

                        {/* Icon */}
                        <div className="mb-3 p-3 rounded-xl bg-slate-800/60 group-hover:bg-slate-800 transition">
                          <Icon
                            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                            style={{ color: skill.color }}
                          />
                        </div>

                        {/* Name */}
                        <p className="text-xs sm:text-sm text-paper font-medium group-hover:text-acid transition-colors">
                          {skill.name}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}