import { GraduationCap, Award, Video } from "lucide-react";
import { resumeData } from "../data";
import { motion } from "motion/react";

export default function Credentials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 60, damping: 15 }
    }
  };

  const getCertificationBadgeGlow = (idx: number) => {
    return "border-l-4 border-[var(--color-neon-magenta)] hover:border-[var(--color-neon-cyan)]";
  };

  return (
    <section id="credentials" className="relative py-20 border-t border-[rgba(255,255,255,0.05)] bg-[var(--color-wall-dark)]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left font-sans">
          
          {/* Left Block: Academic & Activities */}
          <div className="lg:col-span-7 space-y-12">
            {/* Education Sub-section */}
            <div className="space-y-8">
              <div className="space-y-3 select-none">
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-spray-orange)] uppercase font-bold">
                  <GraduationCap size={14} />
                  <span>Academic History</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight graffiti-heading">
                  Academic <span className="text-[var(--color-neon-cyan)]">Path</span>
                </h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                {resumeData.education.map((edu) => (
                  <motion.div
                    key={edu.institution}
                    variants={itemVariants}
                    className="glass-panel p-6 border-2 border-[var(--color-spray-orange)] shadow-[8px_8px_0_0_var(--color-spray-orange)] transition-all duration-300 relative group rounded-none"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 font-sans">
                      <div>
                        <h3 className="font-display font-bold text-white text-base tracking-wide group-hover:text-[var(--color-neon-cyan)] transition-colors uppercase">
                          {edu.institution}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 font-mono font-bold uppercase tracking-tight">{edu.degree}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end text-xs font-mono text-slate-300 shrink-0 font-bold">
                        <span className="text-[var(--color-neon-magenta)]">{edu.duration}</span>
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    {/* CGPA display */}
                    {edu.cgpa && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[var(--color-neon-magenta)] text-white text-xs font-mono font-bold mb-4 shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2 border-black">
                        <span>{edu.cgpa}</span>
                      </div>
                    )}

                    {/* Coursework details */}
                    {edu.keyCoursework.length > 0 && (
                      <div className="space-y-2 mb-4 pt-2 border-t border-[rgba(255,255,255,0.1)]">
                        <span className="text-[10px] font-mono font-bold text-[var(--color-acid-yellow)] uppercase tracking-wider block">
                          Core Syllabus
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.keyCoursework.map((course) => (
                            <span key={course} className="px-2 py-0.5 rounded-none bg-black text-[var(--color-acid-yellow)] border border-[var(--color-acid-yellow)] font-mono text-[10px] font-bold">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Honors details */}
                    {edu.honors.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.1)]">
                        <span className="text-[10px] font-mono font-bold text-[var(--color-spray-orange)] uppercase tracking-wider block">
                          Honors & Awards
                        </span>
                        <ul className="space-y-1.5 leading-relaxed">
                          {edu.honors.map((honor) => (
                            <li key={honor} className="flex gap-2 text-xs text-white align-top items-center font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-spray-orange)] shrink-0" />
                              <span>{honor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Leadership Activities Sub-section */}
            {resumeData.leadership.length > 0 && (
              <div className="space-y-8">
                <div className="space-y-3 select-none">
                  <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-acid-yellow)] uppercase font-bold">
                    <Video size={14} className="text-[var(--color-acid-yellow)]" />
                    <span>Leadership & Activities</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight graffiti-heading">
                    Beyond <span className="text-[var(--color-neon-magenta)]">Engineering</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  {resumeData.leadership.map((lead) => (
                    <div
                      key={lead.role}
                      className="glass-panel p-6 border-2 border-[var(--color-neon-cyan)] shadow-[8px_8px_0_0_var(--color-neon-cyan)] transition-all duration-300 group relative overflow-hidden rounded-none"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 font-sans">
                        <div>
                          <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-none bg-[var(--color-neon-cyan)] text-black border-2 border-black uppercase font-semibold shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                            {lead.role}
                          </span>
                          <h3 className="font-bold text-white text-base tracking-wide mt-2 uppercase group-hover:text-[var(--color-neon-magenta)] transition-colors">
                            {lead.organization}
                          </h3>
                        </div>
                        <div className="flex flex-col items-start sm:items-end text-xs font-mono text-slate-300 shrink-0 font-bold">
                          <span className="text-[var(--color-neon-magenta)]">{lead.duration}</span>
                          <span>{lead.location}</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5">
                        {lead.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed align-top font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-magenta)] shrink-0 mt-2" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Block: Professional Certifications */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3 select-none">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-neon-magenta)] uppercase font-bold">
                <Award size={14} />
                <span>Endorsements & Credentials</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight graffiti-heading">
                Certifications
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-4 font-sans"
            >
              {resumeData.certifications.map((cert, idx) => (
                <motion.div
                  key={cert.name}
                  variants={itemVariants}
                  className={`p-4 rounded-none bg-black border-2 border-black shadow-[4px_4px_0_0_var(--color-acid-yellow)] ${getCertificationBadgeGlow(idx)} hover:shadow-[6px_6px_0_0_var(--color-neon-cyan)] transition-all duration-300 flex items-start gap-4 text-left group`}
                >
                  <div className="p-2 rounded-none bg-[var(--color-acid-yellow)] border-2 border-black text-black mt-0.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <Award size={16} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm group-hover:text-[var(--color-acid-yellow)] transition-colors uppercase font-bold">
                      {cert.name}
                    </h3>
                    <div className="flex items-center gap-2.5 text-[10px] font-mono text-slate-400 font-medium font-semibold">
                      {cert.issuer && <span>Issuer: {cert.issuer}</span>}
                      {cert.issuer && cert.year && <span className="w-1 h-1 rounded-full bg-[var(--color-neon-magenta)]" />}
                      {cert.year && <span>{cert.year}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
