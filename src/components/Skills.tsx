import { Cpu } from "lucide-react";
import { resumeData } from "../data";
import { motion } from "motion/react";

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    return <Cpu className="w-5 h-5 text-[var(--color-acid-yellow)]" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="skills" className="relative py-20 border-t border-[rgba(255,255,255,0.05)] bg-transparent z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-left space-y-3 mb-16 select-none">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-neon-cyan)] uppercase font-bold">
            <Cpu size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight graffiti-heading">
            Skill <span className="text-[var(--color-neon-magenta)]">Taxonomy</span>
          </h2>
          <p className="text-sm text-slate-300 max-w-lg font-sans font-medium">
            Meticulously mapped technical framework layers spanning full-stack architectures and machine learning systems.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left"
        >
          {resumeData.skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              variants={cardVariants}
              className="glass-panel p-6 hover:border-[var(--color-neon-cyan)] transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
            >
              <div className="space-y-6">
                {/* Header icon / title */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-black text-[var(--color-acid-yellow)] border border-[var(--color-acid-yellow)]">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className="font-display font-bold text-white text-[15px] tracking-wide uppercase group-hover:text-[var(--color-neon-cyan)] transition-colors">
                    {cat.category}
                  </h3>
                </div>

                {/* Tags array */}
                <div className="flex flex-col gap-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between group/item"
                    >
                      <span className="text-slate-300 text-xs font-mono tracking-tight font-semibold group-hover/item:text-[var(--color-neon-magenta)] transition-colors">
                        {skill}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover/item:bg-[var(--color-neon-magenta)] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
