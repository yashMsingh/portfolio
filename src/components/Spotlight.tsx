import { Instagram, Youtube, User, ExternalLink, Heart, Video, Code } from "lucide-react";
import { resumeData } from "../data";
import { motion } from "motion/react";

export default function Spotlight() {
  return (
    <section id="identity" className="py-20 md:py-28 relative overflow-hidden border-t border-[rgba(255,255,255,0.05)] bg-[var(--color-wall-dark)]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[var(--color-neon-green)] rounded-full mix-blend-screen blur-[125px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 select-none">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-neon-green)] font-bold tracking-widest uppercase">
              <User size={13} className="text-[var(--color-acid-yellow)]" />
              <span>Identity Spotlight</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight graffiti-heading">
              Aesthetic <span className="text-[var(--color-neon-cyan)]">Showcase</span>
            </h2>
          </div>
          <p className="text-slate-400 text-xs md:text-sm font-mono max-w-sm mt-3 md:mt-0 text-left md:text-right font-semibold">
            [SYS_STATE: V-SERIES_MODEL_ACTIVE]
          </p>
        </div>

        {/* Content Layout */}
        <div className="space-y-10">
          
          <div className="max-w-3xl text-left">
            <p className="text-slate-300 text-sm md:text-base font-sans leading-relaxed font-medium">
              Step beyond the raw source code. When I'm not tuning agent frameworks or scaling data infrastructure, I construct highly engaging stories, capture scenic details, and connect with other creators across digital spaces.
            </p>
          </div>

          {/* Social Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Instagram Card */}
            <motion.a 
              href={resumeData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="group rounded-2xl p-6 glass-panel text-left flex flex-col justify-between h-40 spray-reveal"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] flex items-center justify-center text-white shadow-sm">
                    <Instagram size={20} />
                  </div>
                  <span className="font-mono text-[10px] text-[var(--color-neon-green)] border border-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10 px-2 py-0.5 rounded-full font-bold">
                    @_yash_3103
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-[15px] group-hover:text-[var(--color-neon-green)] transition-colors">
                  Instagram Platform
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 font-semibold">
                <span className="flex items-center gap-1 group-hover:text-[var(--color-neon-green)] transition-colors">
                  <Heart size={12} className="text-[var(--color-neon-green)] animate-pulse" />
                  <span>Creative Stream</span>
                </span>
                <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>Connect</span>
                  <ExternalLink size={10} />
                </span>
              </div>
            </motion.a>

            {/* YouTube Card */}
            <motion.a 
              href={resumeData.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="group rounded-2xl p-6 glass-panel text-left flex flex-col justify-between h-40 spray-reveal"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff0000] flex items-center justify-center text-white shadow-sm">
                    <Youtube size={20} />
                  </div>
                  <span className="font-mono text-[10px] text-[#ff0000] border border-[#ff0000]/50 bg-[#ff0000]/10 px-2 py-0.5 rounded-full font-bold">
                    @yashftyash
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-[15px] group-hover:text-[#ff0000] transition-colors">
                  YouTube Channel
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 group-hover:text-[#ff0000] transition-colors">
                  <Video size={12} className="text-[#ff0000]" />
                  <span>Tutorial Hub</span>
                </span>
                <span className="flex items-center gap-1 group-hover:text-white transition-colors text-slate-400 font-semibold">
                  <span>Subscribe</span>
                  <ExternalLink size={10} />
                </span>
              </div>
            </motion.a>

          </div>

          {/* Combined Media Highlights footer */}
          <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[var(--color-wall-mid)] shadow-sm flex items-center gap-3.5 max-w-2xl text-left select-none">
            <div className="p-2.5 rounded-lg bg-black text-[var(--color-acid-yellow)] shrink-0">
              <Code size={18} />
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed font-semibold">
              Let's construct something impactfully beautiful. Reach out to collaborate on <strong className="text-white underline decoration-[var(--color-neon-green)]">Media Production</strong> or <strong className="text-[var(--color-neon-cyan)]">Autonomous Agent Systems</strong>.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
