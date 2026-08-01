import { useState } from "react";
import { FolderCode, Github, Cpu, Check } from "lucide-react";
import { resumeData } from "../data";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import Magnetic from "./ui/Magnetic";

function ProjectCard({ project }: { project: typeof resumeData.projects[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-5, 5]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getProjectIcon = (title: string) => {
    return <Cpu className="w-5 h-5 text-[var(--color-acid-yellow)]" />;
  };

  const impactBullet = project.highlights.find(b => b.toLowerCase().includes("impact:"));
  const staticBullets = project.highlights.filter(b => !b.toLowerCase().includes("impact:"));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-panel p-6 md:p-8 hover:border-[var(--color-neon-cyan)] transition-all duration-300 flex flex-col justify-between relative group h-full overflow-hidden"
      >
        <motion.div style={{ zIndex: 10, translateZ: 50, translateX, translateY }} className="space-y-6 flex-1">
          {/* Header: Icon & Metadata */}
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-black text-[var(--color-acid-yellow)] border border-[var(--color-acid-yellow)]">
              {getProjectIcon(project.title)}
            </div>
            <span className="text-[10px] font-mono text-black bg-[var(--color-neon-cyan)] px-2 py-1 rounded border border-black font-bold uppercase tracking-tight shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              Deployment Ready
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-white text-lg tracking-normal leading-snug group-hover:text-[var(--color-neon-cyan)] transition-colors uppercase">
            {project.title}
          </h3>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] font-mono rounded bg-black border border-[var(--color-spray-orange)] text-[var(--color-spray-orange)] font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] group-hover:bg-[var(--color-spray-orange)] group-hover:text-black transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Impact Callout if present */}
          {impactBullet && (
            <div className="p-4 rounded-xl bg-black/50 border-2 border-[var(--color-neon-green)] space-y-1 shadow-[4px_4px_0_0_var(--color-neon-green)]">
              <span className="text-[10px] font-mono font-bold text-[var(--color-neon-cyan)] uppercase tracking-wider block">
                Performance Metric
              </span>
              <p className="text-sm font-bold text-white uppercase">
                {impactBullet.replace(/^Impact:\s*/i, "")}
              </p>
            </div>
          )}

          {/* Highlights bullets */}
          <ul className="space-y-3 pt-2">
            {staticBullets.map((bullet, bIdx) => (
              <li key={bIdx} className="flex gap-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed align-top font-sans font-medium">
                <Check size={14} className="text-[var(--color-neon-green)] mt-1 shrink-0 opacity-90" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom details */}
        <motion.div style={{ zIndex: 10, translateZ: 30 }} className="pt-6 border-t border-[rgba(255,255,255,0.1)] mt-8 flex items-center justify-between text-xs font-mono text-slate-400 font-medium">
          <span className="text-[10px]">Source code & config</span>
          <div className="flex items-center gap-3">
            <Magnetic>
              <a
                href={project.githubUrl ?? resumeData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-white hover:text-[var(--color-neon-cyan)] transition-colors font-semibold p-2"
              >
                <Github size={13} />
                <span>GitHub</span>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filterTabs = ["All", "AI & NLP", "Finance & Fraud", "Full-Stack & Blockchain"];

  const getFilteredProjects = () => {
    if (filter === "All") return resumeData.projects;
    if (filter === "AI & NLP") {
      return resumeData.projects.filter(p => 
        p.technologies.some(t => ["Gemini", "Llama 3.1", "LLaMA 3.1", "spaCy", "LangChain", "PyTorch", "DistilBERT", "NLP"].includes(t))
      );
    }
    if (filter === "Finance & Fraud") {
      return resumeData.projects.filter(p =>
        p.technologies.some(t => ["Groq", "LLaMA 3.3 70B", "Monte Carlo", "Yahoo Finance API", "Scikit-learn"].includes(t))
      );
    }
    if (filter === "Full-Stack & Blockchain") {
      return resumeData.projects.filter(p =>
        p.technologies.some(t => ["React", "FastAPI", "Flask", "Solidity", "Hardhat", "Ethereum"].includes(t))
      );
    }
    return resumeData.projects;
  };

  return (
    <section id="projects" className="relative py-20 border-t border-[rgba(255,255,255,0.05)] bg-[var(--color-wall-dark)]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 select-none">
          <div className="text-left space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-acid-yellow)] uppercase font-bold">
              <FolderCode size={14} />
              <span>Project Catalog</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight graffiti-heading">
              Technical <span className="text-[var(--color-spray-orange)]">Showcases</span>
            </h2>
            <p className="text-sm text-slate-300 max-w-md font-sans font-medium">
              Deployable systems leveraging cutting-edge LLMs, multi-agent pipelines, and blockchain.
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap gap-2 bg-[var(--color-wall-mid)] p-2 rounded-none border-2 border-black backdrop-blur-sm self-start shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            {filterTabs.map((tab) => (
              <Magnetic key={tab} intensity={0.1}>
                <button
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-none font-display text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    filter === tab
                      ? "bg-[var(--color-neon-cyan)] text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                      : "text-slate-300 hover:text-white border-2 border-transparent"
                  }`}
                >
                  {tab}
                </button>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
        >
          <AnimatePresence mode="popLayout">
            {getFilteredProjects().map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
