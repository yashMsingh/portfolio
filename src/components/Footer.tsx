import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, Instagram, Youtube } from "lucide-react";
import { resumeData } from "../data";

export default function Footer() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      const subject = encodeURIComponent(`Portfolio Message from ${formState.name}`);
      const body = encodeURIComponent(`From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`);
      window.location.href = `mailto:${resumeData.email}?subject=${subject}&body=${body}`;

      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 border-t-4 border-black overflow-hidden bg-[var(--color-wall-mid)] font-sans">
      <div className="absolute inset-0 bg-radial-at-b from-[var(--color-neon-magenta)]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left mb-16">
          
          {/* Left Block: Branding & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 select-none">
                <div className="flex items-center justify-center p-2 rounded-none bg-[var(--color-neon-magenta)] text-white font-bold tracking-wide text-xs border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  YKS
                </div>
                <h3 className="font-display font-bold text-white text-md tracking-wide uppercase graffiti-heading">
                  {resumeData.name}
                </h3>
              </div>
              <p className="text-[10px] font-mono text-[var(--color-acid-yellow)] font-bold uppercase tracking-wider">
                {resumeData.title}
              </p>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm font-sans pt-2 font-medium">
                Proven developer and machine learning engineering enthusiast specializing in RAG systems, autonomous agents, and full-stack solutions.
              </p>
            </div>

            {/* Direct Contact Anchors */}
            <div className="space-y-4 font-sans text-xs sm:text-sm text-slate-300 font-semibold">
              <div className="flex items-center gap-3.5 group select-none">
                <div className="p-2.5 rounded-none bg-black border-2 border-[var(--color-spray-orange)] text-[var(--color-spray-orange)] shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <MapPin size={15} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[var(--color-spray-orange)] font-bold block uppercase tracking-wide">Location</span>
                  <span className="text-[13px] text-white font-semibold">{resumeData.location}</span>
                </div>
              </div>

              <a href={`mailto:${resumeData.email}`} className="flex items-center gap-3.5 group">
                <div className="p-2.5 rounded-none bg-black border-2 border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] group-hover:-translate-y-1 transition-transform shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <Mail size={15} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[var(--color-neon-cyan)] font-bold block uppercase tracking-wide font-sans">Direct Email</span>
                  <span className="text-[13px] text-white font-semibold group-hover:text-[var(--color-neon-cyan)] transition-colors">{resumeData.email}</span>
                </div>
              </a>

              <a href={`tel:${resumeData.phone.replace(/[\s-+]/g, "")}`} className="flex items-center gap-3.5 group">
                <div className="p-2.5 rounded-none bg-black border-2 border-[var(--color-acid-yellow)] text-[var(--color-acid-yellow)] group-hover:-translate-y-1 transition-transform shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <Phone size={15} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[var(--color-acid-yellow)] font-bold block uppercase tracking-wide font-sans">Phone Line</span>
                  <span className="text-[13px] text-white font-semibold group-hover:text-[var(--color-acid-yellow)] transition-colors">{resumeData.phone}</span>
                </div>
              </a>
            </div>

            {/* Social Anchor Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={resumeData.github}
                target="_blank"
                rel="noreferrer referrer"
                className="p-3 rounded-none bg-black border-2 border-white text-white hover:border-[var(--color-neon-magenta)] hover:text-[var(--color-neon-magenta)] transition-all font-mono text-xs flex items-center gap-2 font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-y-1"
              >
                <Github size={15} />
                <span>yashMsingh</span>
              </a>
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noreferrer referrer"
                className="p-3 rounded-none bg-black border-2 border-white text-white hover:border-[var(--color-neon-cyan)] hover:text-[var(--color-neon-cyan)] transition-all font-mono text-xs flex items-center gap-2 font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-y-1"
              >
                <Linkedin size={15} />
                <span>yash-k-singh</span>
              </a>
              {resumeData.instagram && (
                <a
                  href={resumeData.instagram}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="p-3 rounded-none bg-black border-2 border-white text-white hover:border-[var(--color-spray-orange)] hover:text-[var(--color-spray-orange)] transition-all font-mono text-xs flex items-center gap-2 font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-y-1"
                >
                  <Instagram size={15} />
                  <span>_yash_3103</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Block: Simulated Email / Action Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-none p-6 md:p-8 border-2 border-black relative shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden select-none">
              <div className="text-left space-y-2 mb-6">
                <h3 className="font-bold text-white text-xl tracking-wide uppercase">
                  Drop a Message
                </h3>
                <p className="text-xs text-slate-300 font-sans font-medium">
                  Construct an email template and launch your default application automatically.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono text-[var(--color-acid-yellow)] uppercase tracking-wide font-bold">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Tony Stark"
                      className="w-full px-4 py-2.5 rounded-none bg-black border-2 border-white text-white font-semibold text-xs sm:text-sm focus:border-[var(--color-neon-magenta)] focus:outline-none transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono text-[var(--color-neon-cyan)] uppercase tracking-wide font-bold">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="tony@starkindustries.com"
                      className="w-full px-4 py-2.5 rounded-none bg-black border-2 border-white text-white font-semibold text-xs sm:text-sm focus:border-[var(--color-neon-magenta)] focus:outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono text-[var(--color-spray-orange)] uppercase tracking-wide font-bold">Message Content</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello Yash! Loved your agent projects. Let's discuss an opportunity..."
                    className="w-full px-4 py-2.5 rounded-none bg-black border-2 border-white text-white font-semibold text-xs sm:text-sm focus:border-[var(--color-neon-magenta)] focus:outline-none transition-all font-sans resize-none"
                  />
                </div>

                {isSubmitted && (
                  <div className="p-3 rounded-none border-2 border-[var(--color-acid-yellow)] bg-black text-[var(--color-acid-yellow)] flex items-center gap-2 text-xs font-semibold shadow-[2px_2px_0_0_var(--color-acid-yellow)]">
                    <CheckCircle2 size={15} />
                    <span>Template validated! Opening default email client...</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-none bg-[var(--color-neon-magenta)] text-white border-2 border-black font-mono uppercase tracking-widest font-bold hover:bg-[var(--color-deep-purple)] shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:translate-y-1 disabled:opacity-50 cursor-pointer"
                >
                  <Send size={13} />
                  <span>{isSubmitting ? "Processing..." : "Generate email draft"}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer Bottom credits */}
        <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 font-semibold select-none">
          <p>© 2026 Yash Kumar Singh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
