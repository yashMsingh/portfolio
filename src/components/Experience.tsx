import { Briefcase, Calendar, MapPin, Layers, Layout, BarChart3, CheckCircle2 } from "lucide-react";
import { resumeData } from "../data";
import { motion } from "motion/react";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 60, damping: 15 }
    }
  };

  const getRoleBadgeColor = (role: string) => {
    return "bg-[var(--color-neon-magenta)] text-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]";
  };

  return (
    <section id="experience" className="relative py-20 border-t border-[rgba(255,255,255,0.05)] overflow-hidden bg-[var(--color-wall-dark)]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left space-y-3 mb-16 select-none">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-spray-orange)] uppercase font-bold">
            <Briefcase size={14} className="text-[var(--color-spray-orange)]" />
            <span>Employment Timeline</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight graffiti-heading">
            Industry <span className="text-[var(--color-neon-cyan)]">Internships</span>
          </h2>
          <p className="text-sm text-slate-300 max-w-lg font-sans font-medium">
            Demonstrated capability across three distinct developer and data analyst internship tenures.
          </p>
        </div>

        {/* Timeline Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="relative pl-4 md:pl-8 border-l-4 border-black space-y-12 ml-2 text-left"
        >
          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="relative group"
            >
              {/* Timeline dot decoration */}
              <div className="absolute -left-[30px] md:-left-[46px] top-6 w-6 h-6 rounded-full bg-[var(--color-acid-yellow)] border-4 border-black flex items-center justify-center z-10 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>

              {/* Main Card */}
              <div className="rounded-none glass-panel p-6 md:p-8 border-2 border-[var(--color-neon-magenta)] shadow-[8px_8px_0_0_var(--color-neon-magenta)] hover:shadow-[12px_12px_0_0_var(--color-neon-magenta)] transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  {/* Title & Role Info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-mono rounded-sm uppercase font-bold text-xs tracking-tight ${getRoleBadgeColor(exp.role)}`}>
                        {exp.role}
                      </span>
                      {exp.isRemote && (
                        <span className="px-2 py-0.5 text-[9px] font-mono rounded-sm border-2 border-black bg-[var(--color-acid-yellow)] text-black font-bold uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                          Remote
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-white text-xl tracking-wide uppercase">
                      {exp.company}
                    </h3>
                  </div>

                  {/* Date & Location Badges */}
                  <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-300 md:items-end font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[var(--color-acid-yellow)]" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-[var(--color-neon-cyan)]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Professional bullet accomplishments */}
                <ul className="space-y-3.5 mt-4">
                  {exp.highlights.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex gap-3 text-slate-200 text-sm leading-relaxed text-left align-top items-start font-sans font-medium">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={14} className="text-[var(--color-spray-orange)]" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
