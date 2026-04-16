import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Globe, Zap, Cpu, MapPin, Building, Signal, Mail, Shield, HardHat, TrendingUp, Menu, X } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function ParallaxImage({ src, alt, speed = 0.5 }: { src: string, alt: string, speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden relative">
      <motion.img 
        src={src} 
        alt={alt}
        loading="lazy"
        decoding="async"
        width="800"
        height="437"
        style={{ y, scale: 1.2 }}
        className="absolute inset-0 w-full h-full object-cover origin-center"
      />
    </div>
  );
}

const navLinks = [
  { href: "#thesis", label: "The Thesis" },
  { href: "#divisions", label: "Services" },
  { href: "#scale", label: "Scale" },
  { href: "#projects", label: "Projects" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden selection:bg-primary selection:text-white font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 lg:px-12 flex items-center justify-between bg-background/10 backdrop-blur-md border-b border-white/5">
        <a href="#" className="text-lg lg:text-xl font-serif font-bold tracking-widest uppercase text-white flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
          <div className="w-4 h-4 bg-primary rounded-sm"></div>
          INFRASCALE <span className="text-white/50">AFRICA</span>
        </a>

        {/* Desktop Nav — lg and above */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-white/70">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
          ))}
          <button onClick={() => setContactOpen(true)} className="px-6 py-3 bg-white text-background hover:bg-primary hover:text-white transition-colors duration-300">Partner With Us</button>
        </div>

        {/* Mobile / Tablet hamburger button */}
        <button
          className="lg:hidden text-white/80 hover:text-white transition-colors p-2"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/10 lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 hover:text-primary transition-colors uppercase tracking-[0.2em] text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}
                className="px-6 py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm text-center hover:bg-white hover:text-background transition-colors duration-300 mt-2"
              >
                Partner With Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-background">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <img 
            src="/images/hero.webp" 
            alt="Dawn over construction site in Lagos"
            width="1408"
            height="768"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 mt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[2px] bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Building The Foundation</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif font-bold leading-[0.85] mb-8 text-white tracking-tight">
              Scaling Africa's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-white">Untapped Potential</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 font-light leading-relaxed">
              Construction, installation, deployment, and maintenance of telecommunications systems, IT networks, data centres, and related facilities — serving enterprises, institutions, and governments across Africa.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <a href="#divisions" className="group flex items-center justify-between px-10 py-5 bg-primary text-white font-bold uppercase tracking-[0.15em] text-sm hover:bg-white hover:text-background transition-all duration-500">
                <span>Our Services</span>
                <ArrowRight className="w-5 h-5 ml-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4"
        >
          <div className="text-white/40 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-left translate-x-2">Scroll</div>
          <div className="w-[1px] h-20 bg-white/10 relative overflow-hidden mt-8">
            <motion.div 
              className="w-full h-full bg-primary absolute top-0"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* 2. The Thesis */}
      <section id="thesis" className="py-32 md:py-48 bg-background relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-12">
              We don't just build networks. We design, integrate, manage, and <span className="text-primary italic">sustain</span> the infrastructure Africa runs on.
            </motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-accent mx-auto mb-20"></motion.div>
            
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -left-6 top-0 text-8xl font-serif text-white/5 pointer-events-none select-none -z-10 -translate-y-6">01</div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-primary">
                  <HardHat className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-white mb-4">Build & Integrate</h3>
                <p className="text-white/60 leading-relaxed font-light">Construction, installation, and maintenance of telecoms systems, IT networks, and data centres — combined with end-to-end systems integration, network deployment, and ongoing technical support.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -left-6 top-0 text-8xl font-serif text-white/5 pointer-events-none select-none -z-10 -translate-y-6">02</div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-accent">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-white mb-4">Deliver & Manage</h3>
                <p className="text-white/60 leading-relaxed font-light">Turnkey project delivery, managed infrastructure services, and outsourcing — we take full accountability from inception through commissioning and into long-term operations.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -left-6 top-0 text-8xl font-serif text-white/5 pointer-events-none select-none -z-10 -translate-y-6">03</div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-secondary">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-white mb-4">Supply & Advise</h3>
                <p className="text-white/60 leading-relaxed font-light">Procurement, supply, and distribution of IT and telecoms equipment — backed by consultancy and advisory services in technology, infrastructure development, and project management.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Infrastructure Divisions */}
      <section id="divisions" className="py-24 bg-card border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-20">
            <div className="w-12 h-[2px] bg-primary"></div>
            <h2 className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-white">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Telecom & IT Infrastructure */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative h-[700px] overflow-hidden bg-background"
            >
              <div className="absolute inset-0">
                <ParallaxImage src="/images/connectivity.webp" alt="Telecommunications Infrastructure" />
              </div>
              <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="w-16 h-16 rounded-sm bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-8 text-accent">
                  <Signal className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-serif text-white mb-4">Infrastructure & Systems</h3>
                <p className="text-white/70 mb-8 max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light leading-relaxed">
                  Construction, installation, and maintenance of telecoms systems, IT networks, and data centres — plus end-to-end systems integration, network deployment, and technical support services.
                </p>
                <div className="w-full h-[1px] bg-white/20 mb-6 group-hover:bg-accent/50 transition-colors"></div>
                <div className="flex items-center text-white/50 group-hover:text-accent font-bold uppercase tracking-[0.2em] text-xs transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>

            {/* Contracting & Deployment */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative h-[700px] overflow-hidden bg-background mt-0 lg:mt-16"
            >
              <div className="absolute inset-0">
                <ParallaxImage src="/images/digital.webp" alt="Contracting and System Deployment" />
              </div>
              <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="w-16 h-16 rounded-sm bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-8 text-primary">
                  <HardHat className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-serif text-white mb-4">Contracting & Managed Services</h3>
                <p className="text-white/70 mb-8 max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light leading-relaxed">
                  General contracting for civil, electrical, mechanical, and ICT projects. Turnkey delivery, managed infrastructure services, and outsourcing — from inception to long-term operations.
                </p>
                <div className="w-full h-[1px] bg-white/20 mb-6 group-hover:bg-primary/50 transition-colors"></div>
                <div className="flex items-center text-white/50 group-hover:text-primary font-bold uppercase tracking-[0.2em] text-xs transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>

            {/* Procurement & Trade */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative h-[700px] overflow-hidden bg-background mt-0 lg:mt-32"
            >
              <div className="absolute inset-0">
                <ParallaxImage src="/images/energy.webp" alt="Procurement and Trade" />
              </div>
              <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="w-16 h-16 rounded-sm bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-8 text-secondary">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-serif text-white mb-4">Procurement & Advisory</h3>
                <p className="text-white/70 mb-8 max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light leading-relaxed">
                  Procurement, supply, distribution, and import/export of IT, telecoms, and electrical equipment — plus consultancy and advisory services in technology, infrastructure, and project management.
                </p>
                <div className="w-full h-[1px] bg-white/20 mb-6 group-hover:bg-secondary/50 transition-colors"></div>
                <div className="flex items-center text-white/50 group-hover:text-secondary font-bold uppercase tracking-[0.2em] text-xs transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Scale & Impact Stats */}
      <section id="scale" className="py-32 bg-[#0A1118] relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-white max-w-xl leading-tight mb-8 md:mb-0">
              The footprint of our ambition across the continent.
            </motion.h2>
            <motion.div variants={fadeUp} className="text-white/50 max-w-sm font-light">
              From Lagos to Nairobi, Johannesburg to London — we are positioned where Africa's infrastructure demand is greatest, and where it is growing fastest.
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16"
          >
            <motion.div variants={fadeUp} className="border-t border-white/10 pt-8 relative group">
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700"></div>
              <div className="text-6xl md:text-8xl font-serif text-white mb-4 tracking-tighter">4</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Office Locations</div>
            </motion.div>
            <motion.div variants={fadeUp} className="border-t border-white/10 pt-8 relative group">
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-700"></div>
              <div className="text-6xl md:text-8xl font-serif text-white mb-4 tracking-tighter">3</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Client Sectors</div>
            </motion.div>
            <motion.div variants={fadeUp} className="border-t border-white/10 pt-8 relative group">
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700"></div>
              <div className="text-6xl md:text-8xl font-serif text-white mb-4 tracking-tighter">5</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Core Service Lines</div>
            </motion.div>
            <motion.div variants={fadeUp} className="border-t border-white/10 pt-8 relative group">
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-secondary group-hover:w-full transition-all duration-700"></div>
              <div className="text-6xl md:text-8xl font-serif text-white mb-4 tracking-tighter">Pan</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">African Reach</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. How We Deliver */}
      <section id="projects" className="py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[2px] bg-accent"></div>
            <h2 className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-white">How We Deliver</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-square relative"
            >
              <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4"></div>
              <img src="/images/connectivity-md.webp" alt="Telecom infrastructure installation" loading="lazy" decoding="async" width="800" height="800" className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-8 left-8 z-20 bg-background/90 backdrop-blur p-6 border border-white/10 max-w-xs">
                <div className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-2">End-to-End Capability</div>
                <div className="text-white font-serif text-xl">From Survey to Handover</div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                One Partner. Every Discipline.
              </motion.h3>
              <motion.p variants={fadeUp} className="text-xl text-white/60 mb-8 font-light leading-relaxed">
                Infrascale Africa covers the full scope — from construction and systems integration, through turnkey project delivery and managed operations, to procurement, supply, and strategic advisory. One accountable partner, end to end.
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-6 mb-12">
                {[
                  "Construction, installation & maintenance — telecoms, IT networks, data centres, and facilities",
                  "Systems design, integration, network deployment, and technical support",
                  "General contracting — civil, electrical, mechanical, and ICT works",
                  "Turnkey projects, managed infrastructure services, and outsourcing",
                  "Procurement, supply, distribution, and import/export of IT and telecoms equipment",
                  "Consultancy and advisory in technology, infrastructure development, and project management"
                ].map((item, i) => (
                  <motion.li variants={fadeUp} key={i} className="flex items-start text-white/80">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-4 shrink-0 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                variants={fadeUp}
                onClick={() => setContactOpen(true)}
                className="border-b border-primary text-white hover:text-primary transition-colors pb-1 uppercase tracking-[0.2em] text-sm font-bold flex items-center"
              >
                Discuss a Project <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Partners / Trust */}
      <section className="py-24 bg-card border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Serving Enterprises, Institutions & Government Agencies</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            {/* Abstract geometric representations of corporate logos */}
            <div className="flex items-center gap-2 font-serif text-2xl font-bold"><Globe className="w-8 h-8" /> GLOBAL TELCO</div>
            <div className="flex items-center gap-2 font-sans text-2xl font-black uppercase tracking-tighter"><Building className="w-8 h-8" /> Pan-African Bank</div>
            <div className="flex items-center gap-2 font-serif text-2xl italic"><Shield className="w-8 h-8" /> Sovereign Wealth</div>
            <div className="flex items-center gap-2 font-sans text-xl font-bold uppercase tracking-widest"><Cpu className="w-8 h-8" /> Hyperscaler</div>
          </div>
        </div>
      </section>

      {/* 7. Manifesto / CTA */}
      <section id="contact" className="py-32 md:py-48 bg-background relative">
        <div className="absolute inset-0">
          <img src="/images/hero-md.webp" alt="" loading="lazy" decoding="async" width="800" height="437" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-12">
                <Globe className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
                The future is built on <span className="text-primary italic">hard assets</span>.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-xl text-white/60 mb-6 font-light leading-relaxed">
                Whether you are a government agency, enterprise, or institution looking to build or upgrade critical infrastructure — or a professional, contractor, or organisation seeking to partner with us — we want to hear from you.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6 mb-6 text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
                <span>Project Enquiries</span>
                <span className="text-white/20">|</span>
                <span>Partnerships &amp; Collaborations</span>
                <span className="text-white/20">|</span>
                <span>Career Opportunities</span>
                <span className="text-white/20">|</span>
                <span>Subcontractor Registration</span>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
                <button
                  onClick={() => setContactOpen(true)}
                  className="px-10 py-5 bg-white text-background font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Get In Touch
                </button>
                <a
                  href="#offices"
                  className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-white/5 transition-colors duration-300 flex items-center justify-center"
                >
                  <MapPin className="w-5 h-5 mr-3" />
                  View Office Locations
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-[#050A0F] pt-24 pb-12 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-serif font-bold tracking-widest uppercase text-white mb-6">
                INFRASCALE <span className="text-primary">AFRICA</span> <span className="text-white/30 text-lg">LIMITED</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed font-light mb-8">
                Construction, installation, deployment, and maintenance of telecommunications systems, IT networks, data centres, and related facilities — serving enterprises, institutions, and government agencies across Africa.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all cursor-pointer">In</div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all cursor-pointer">Tw</div>
              </div>
            </div>
            
            <div id="offices">
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-6">Offices</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><span className="text-white block">Lagos (HQ)</span> Victoria Island, Nigeria</li>
                <li><span className="text-white block">Nairobi</span> Upper Hill, Kenya</li>
                <li><span className="text-white block">Johannesburg</span> Sandton, South Africa</li>
                <li><span className="text-white block">London</span> Mayfair, UK</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-6">Services</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#divisions" className="hover:text-primary transition-colors">Infrastructure & Systems Integration</a></li>
                <li><a href="#divisions" className="hover:text-primary transition-colors">Contracting & Managed Services</a></li>
                <li><a href="#divisions" className="hover:text-primary transition-colors">Turnkey Project Delivery</a></li>
                <li><a href="#divisions" className="hover:text-primary transition-colors">Procurement, Supply & Advisory</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs tracking-wider uppercase">
            <p>&copy; {new Date().getFullYear()} Infrascale Africa Limited. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
