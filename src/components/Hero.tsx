import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, ChevronRight, Download } from "lucide-react";
import { resumeData } from "../data";
import { downloadResumePDF } from "../utils/pdfGenerator";
import { motion, AnimatePresence } from "motion/react";
import Magnetic from "./ui/Magnetic";
import SignatureTag from "./SignatureTag";
import TornEdgeDivider from "./TornEdgeDivider";

function Typewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 55); 
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="inline-block">
      {displayedText}
      <span className="inline-block animate-pulse ml-0.5 text-[var(--color-neon-magenta)] select-none font-light">|</span>
    </span>
  );
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  const metrics = [
    {
      value: "3",
      label: "Industry Internships",
      desc: "AI, Full-Stack, & Data Analysis",
      color: "var(--color-neon-cyan)"
    },
    {
      value: "5",
      label: "Autonomous & AI Projects",
      desc: "Agents, RAG, Blockchain, & NLP",
      color: "var(--color-neon-magenta)"
    },
    {
      value: "9.08",
      label: "B.Tech CGPA",
      desc: "AI & Data Science | VIIT Pune",
      color: "var(--color-acid-yellow)"
    }
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-wall-dark)]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-display font-extrabold text-white graffiti-hero-text"
            >
              Y<span className="text-[var(--color-neon-magenta)]">K</span>S
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="overview" className="relative min-h-screen flex items-center pt-28 pb-16 md:py-32 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20"
        >
          {/* Main Content Info */}
          <div className="lg:col-span-7 space-y-8 text-left">

            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight graffiti-hero-text leading-[1.05]"
              >
                Yash Kumar{" "}
                <span className="text-[var(--color-neon-magenta)]">
                  Singh
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="font-sans text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-wide py-1"
                style={{ textShadow: '2px 2px 0px var(--color-deep-purple)' }}
              >
                <Typewriter text={resumeData.title} />
              </motion.p>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans font-medium p-4 border-l-4 border-[var(--color-neon-cyan)] bg-[var(--color-wall-mid)]/50 backdrop-blur-sm"
            >
              {resumeData.summary}
            </motion.p>

            {/* Quick Contact Info Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-y-3 gap-x-6 text-xs text-white font-mono font-medium"
            >
              <div className="flex items-center gap-2 hover:text-[var(--color-acid-yellow)] transition-colors">
                <MapPin size={14} className="text-[var(--color-neon-magenta)]" />
                <span>{resumeData.location}</span>
              </div>
              <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 hover:text-[var(--color-neon-cyan)] transition-colors">
                <Mail size={14} className="text-[var(--color-neon-magenta)]" />
                <span>{resumeData.email}</span>
              </a>
              <a href={`tel:${resumeData.phone.replace(/[\s-+]/g, "")}`} className="flex items-center gap-2 hover:text-[var(--color-spray-orange)] transition-colors">
                <Phone size={14} className="text-[var(--color-neon-magenta)]" />
                <span>{resumeData.phone}</span>
              </a>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Magnetic>
                <button
                  onClick={() => {
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="spray-reveal flex items-center gap-2 px-6 py-3 rounded-none bg-[var(--color-neon-magenta)] text-white text-xs font-bold tracking-wider uppercase border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:translate-y-1 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                >
                  <span>View My Work</span>
                  <ChevronRight size={14} />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => {
                    const el = document.getElementById("experience");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="spray-reveal flex items-center gap-2 px-6 py-3 rounded-none bg-transparent border-2 border-[var(--color-neon-cyan)] text-white text-xs font-bold tracking-wider uppercase shadow-[4px_4px_0_0_var(--color-neon-cyan)] transition-transform hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--color-neon-cyan)]"
                >
                  <span>Read Internships</span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => downloadResumePDF(resumeData)}
                  className="spray-reveal flex items-center gap-2 px-6 py-3 rounded-none bg-[var(--color-acid-yellow)] text-black font-bold text-xs tracking-wider uppercase transition-transform border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                  title="Download full PDF Resume"
                >
                  <Download size={14} />
                  <span>Download Resume</span>
                </button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Panel: Profile Photo */}
          <div className="lg:col-span-5 flex justify-center w-full relative">
            <SignatureTag className="top-10 -left-10 z-30 scale-125" />
            
            <motion.div 
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="relative w-full max-w-[420px] aspect-square overflow-hidden bg-black border-4 border-white shadow-[10px_10px_0_0_var(--color-neon-cyan)] group z-20"
            >
              {/* Photo */}
              <img 
                src={resumeData.avatarUrl} 
                alt="Yash Kumar Singh Profile" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 mix-blend-luminosity group-hover:grayscale-0 transition-all duration-700 ease-out select-none"
              />

              <div className="absolute inset-0 bg-[var(--color-neon-magenta)]/20 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 md:pt-24 mt-16 relative z-20">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 bg-[var(--color-wall-mid)] border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex gap-5 items-start text-left transform hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-all"
            >
              <div 
                className="p-4 bg-black border-2 border-white text-white font-bold graffiti-heading text-3xl h-16 w-16 flex items-center justify-center shrink-0"
                style={{ color: m.color }}
              >
                {m.value}
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase">
                  {m.label}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans font-medium">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
      <TornEdgeDivider />
    </>
  );
}
