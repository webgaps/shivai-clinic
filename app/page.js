"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const THEME = {
  bg: "#060d1a",
  bgCard: "#0c1628",
  bgCardHover: "#111f38",
  bgSection: "#081120",
  teal: "#00c9b1",
  tealDim: "#00c9b118",
  tealBorder: "#00c9b130",
  tealGlow: "#00c9b140",
  white: "#ffffff",
  offWhite: "#e8f0f0",
  textPrimary: "#cde4e4",
  textSecondary: "#7a9ea0",
  textMuted: "#4a6870",
  border: "#112236",
  borderBright: "#1a3550",
  navy: "#0a1628",
};

const SITE = {
  name: "Shivai Multispecialty Clinic",
  nameShort: "Shivai Clinic",
  phone: "+91 75593 23601",
  address: "1st Floor, Vaishali Heights, Opp. Janseva Bank, Gadital, Hadapsar, Pune 411028",
  addressShort: "Vaishali Heights, Gadital, Hadapsar",
  whatsapp: "https://wa.me/917559323601",
  rating: "5.0",
  reviews: "128+",
  timings: {
    morning: "9:00 AM – 1:00 PM",
    evening: "5:00 PM – 9:00 PM",
    days: "Mon – Sat",
  },
};

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Timings", href: "#timings" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { title: "General Medicine", desc: "Fever, infections, diabetes, hypertension — all acute and chronic conditions managed by experienced physicians.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Paediatrics", desc: "Complete child healthcare — vaccinations, growth monitoring, and treatment for all childhood illnesses.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { title: "Gynaecology", desc: "Women's health services including prenatal care, routine check-ups and menstrual health.", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { title: "Orthopaedics", desc: "Fractures, arthritis, back pain and sports injuries treated effectively.", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
  { title: "ENT", desc: "Ear, nose and throat — hearing issues, sinusitis, throat infections and allergies.", icon: "M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12M8.464 8.464a5 5 0 000 7.072" },
  { title: "Cardiology & ECG", desc: "Heart health monitoring, ECG testing, blood pressure and cardiac risk assessment.", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { title: "Pathology Lab", desc: "Blood tests, thyroid, sugar, lipid profiles and full health check-ups — all on-site.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { title: "Sonography", desc: "Ultrasound imaging for abdomen, pelvis, obstetric scans. Same-day reports.", icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" },
  { title: "Minor Surgery", desc: "Wound care, suturing, abscess drainage and minor removals — done in-clinic.", icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const REVIEWS = [
  { name: "Priya S.", text: "Very professional and caring doctors. Got my reports same day. The clinic is clean and the staff is extremely helpful. Recommended for the whole family.", rating: 5 },
  { name: "Rahul M.", text: "Best multispecialty clinic in Hadapsar. Doctor took time to explain everything clearly. Affordable fees and no unnecessary tests — honest practice.", rating: 5 },
  { name: "Sunita P.", text: "Brought my child for vaccination and the doctor was so patient and gentle. All facilities under one roof — very convenient for working parents.", rating: 5 },
  { name: "Anil K.", text: "Got ECG done and results explained on the spot. Morning and evening timings are perfect for working people. Truly complete care.", rating: 5 },
];

const STATS = [
  { value: "5.0", unit: "/ 5", label: "Google Rating" },
  { value: "128", unit: "+", label: "Patient Reviews" },
  { value: "10", unit: "+", label: "Specialties" },
  { value: "Same", unit: " Day", label: "Lab Reports" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = (d = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: d } },
});

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ECGLine({ opacity = 1, delay = 0 }) {
  const path = "M0,30 L60,30 L80,30 L92,30 L100,4 L108,56 L116,8 L124,30 L144,30 L200,30 L260,30 L272,30 L280,4 L288,56 L296,8 L304,30 L324,30 L380,30 L440,30 L452,30 L460,4 L468,56 L476,8 L484,30 L504,30 L560,30 L620,30 L632,30 L640,4 L648,56 L656,8 L664,30 L684,30 L740,30 L800,30";
  return (
    <svg viewBox="0 0 800 60" className="w-full h-full" fill="none" preserveAspectRatio="none" style={{ opacity }}>
      <motion.path
        d={path}
        stroke={THEME.teal}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.8, delay, ease: "easeInOut" }}
      />
    </svg>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex w-2.5 h-2.5 flex-shrink-0">
      <span className="absolute inline-flex w-full h-full rounded-full animate-ping" style={{ backgroundColor: THEME.teal, opacity: 0.45 }} />
      <span className="relative inline-flex rounded-full w-2.5 h-2.5" style={{ backgroundColor: THEME.teal }} />
    </span>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill={THEME.teal}>
          <path d="M10 1l2.39 4.84 5.35.78-3.87 3.77.91 5.32L10 13.27l-4.78 2.44.91-5.32L2.26 6.62l5.35-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

function SvgIcon({ path, size = 18, color = THEME.teal, sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState("2025");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setMenuOpen(false), 80);
  };

  return (
    <div style={{ backgroundColor: THEME.bg, color: THEME.textPrimary }} className="min-h-screen font-sans overflow-x-hidden">

      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(6,13,26,0.96)" : "transparent",
          borderBottom: scrolled ? `1px solid ${THEME.border}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }} className="cursor-pointer flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: THEME.teal }}>
              <SvgIcon path="M22 12h-4l-3 9L9 3l-3 9H2" size={15} color={THEME.bg} sw={2.5} />
            </div>
            <span className="text-sm font-black tracking-tight" style={{ color: THEME.white }}>
              Shivai <span style={{ color: THEME.teal }}>Clinic</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-xs font-semibold tracking-widest uppercase transition-colors duration-200 cursor-pointer"
                style={{ color: activeSection === link.href.replace("#", "") ? THEME.teal : THEME.textSecondary }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={`tel:${SITE.phone}`}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase cursor-pointer transition-all duration-200"
            style={{ backgroundColor: THEME.teal, color: THEME.bg }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 28px ${THEME.tealGlow}`)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <SvgIcon path="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" size={13} color={THEME.bg} sw={2.5} />
            Call Now
          </a>

          <button className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer" onClick={() => setMenuOpen((p) => !p)}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-px w-5 transition-all duration-300" style={{
                backgroundColor: THEME.white,
                opacity: i === 1 && menuOpen ? 0 : 1,
                transform: i === 0 && menuOpen ? "translateY(6px) rotate(45deg)" : i === 2 && menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }} />
            ))}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
              style={{ backgroundColor: "rgba(6,13,26,0.98)", borderBottom: `1px solid ${THEME.border}` }}
            >
              <div className="px-5 py-4 flex flex-col gap-0">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="py-3.5 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                    style={{ color: activeSection === link.href.replace("#", "") ? THEME.teal : THEME.textSecondary, borderBottom: `1px solid ${THEME.border}` }}
                  >
                    {link.label}
                  </a>
                ))}
                <a href={`tel:${SITE.phone}`} className="mt-4 py-3.5 text-center text-xs font-black tracking-wider uppercase rounded-full cursor-pointer" style={{ backgroundColor: THEME.teal, color: THEME.bg }}>
                  Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-20 md:pt-28 md:pb-32 overflow-hidden">

        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.035 }}>
          <div style={{ backgroundImage: `linear-gradient(${THEME.teal} 1px, transparent 1px), linear-gradient(90deg, ${THEME.teal} 1px, transparent 1px)`, backgroundSize: "60px 60px", width: "100%", height: "100%" }} />
        </div>

        {/* Top right glow */}
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${THEME.teal}14 0%, transparent 65%)`, transform: "translate(20%, -20%)" }} />

        {/* ECG strips — vertically centered */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "50%", transform: "translateY(-50%)", height: "70px" }}>
          <ECGLine opacity={0.4} delay={1.0} />
        </div>
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "50%", transform: "translateY(calc(-50% + 52px))", height: "44px" }}>
          <ECGLine opacity={0.12} delay={1.7} />
        </div>

        <div className="max-w-7xl mx-auto px-5 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <PulseDot />
                <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: THEME.teal }}>
                  Open Today &nbsp;·&nbsp; Gadital, Hadapsar
                </span>
              </motion.div>

              <div className="mb-6">
                {[
                  { text: "Your Family's", teal: false },
                  { text: "Health Is Our", teal: true },
                  { text: "Priority.", teal: false },
                ].map((line, i) => (
                  <motion.h1
                    key={line.text}
                    className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tighter"
                    style={{ color: line.teal ? THEME.teal : THEME.white }}
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.72, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line.text}
                  </motion.h1>
                ))}
              </div>

              <motion.p variants={fadeUp} className="text-sm md:text-base leading-relaxed mb-10 max-w-md" style={{ color: THEME.textSecondary }}>
                Hadapsar's trusted multispecialty clinic — experienced doctors, modern diagnostics, and compassionate care for every age.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm font-black tracking-wide cursor-pointer transition-all duration-200"
                  style={{ backgroundColor: THEME.teal, color: THEME.bg }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 32px ${THEME.tealGlow}`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <SvgIcon path="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" size={15} color={THEME.bg} sw={2.5} />
                  Book Appointment
                </a>
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); scrollTo("#services"); }}
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full text-sm font-black tracking-wide cursor-pointer transition-all duration-200"
                  style={{ backgroundColor: "transparent", color: THEME.white, border: `1px solid ${THEME.borderBright}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = THEME.teal; e.currentTarget.style.color = THEME.teal; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = THEME.borderBright; e.currentTarget.style.color = THEME.white; }}
                >
                  Our Services
                </a>
              </motion.div>
            </motion.div>

            {/* Right — stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-6 rounded-2xl flex flex-col cursor-default transition-all duration-200"
                  style={{ backgroundColor: THEME.bgCard, border: `1px solid ${THEME.border}` }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = THEME.tealBorder; e.currentTarget.style.boxShadow = `0 8px 32px ${THEME.teal}10`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = THEME.border; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="flex items-baseline gap-0.5 mb-1">
                    <span className="text-4xl font-black" style={{ color: THEME.teal }}>{stat.value}</span>
                    <span className="text-base font-bold" style={{ color: THEME.teal }}>{stat.unit}</span>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: THEME.textMuted }}>{stat.label}</span>
                </motion.div>
              ))}

              <motion.div
                className="col-span-2 p-5 rounded-2xl flex items-center gap-4"
                style={{ backgroundColor: THEME.tealDim, border: `1px solid ${THEME.tealBorder}` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.92 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: THEME.teal }}>
                  <SvgIcon path="M22 12h-4l-3 9L9 3l-3 9H2" size={16} color={THEME.bg} sw={2.5} />
                </div>
                <div>
                  <div className="text-sm font-black" style={{ color: THEME.teal }}>Walk-ins Welcome</div>
                  <div className="text-xs mt-0.5" style={{ color: THEME.textSecondary }}>
                    {SITE.timings.days} &nbsp;·&nbsp; {SITE.timings.morning} &nbsp;|&nbsp; {SITE.timings.evening}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28" style={{ backgroundColor: THEME.bgSection }}>
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: THEME.teal }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: THEME.teal }}>Specialties</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3" style={{ color: THEME.white }}>All Care, Under One Roof</h2>
            <p className="text-sm md:text-base max-w-md mb-14" style={{ color: THEME.textSecondary }}>
              From routine check-ups to diagnostics and specialist care — everything your family needs, close to home.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.05}>
                <div
                  className="p-6 rounded-2xl h-full cursor-default transition-all duration-200"
                  style={{ backgroundColor: THEME.bgCard, border: `1px solid ${THEME.border}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = THEME.tealBorder; e.currentTarget.style.backgroundColor = THEME.bgCardHover; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${THEME.teal}0d`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = THEME.border; e.currentTarget.style.backgroundColor = THEME.bgCard; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: THEME.tealDim, border: `1px solid ${THEME.tealBorder}` }}>
                    <SvgIcon path={service.icon} size={17} />
                  </div>
                  <h3 className="text-sm font-black mb-2" style={{ color: THEME.white }}>{service.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: THEME.textSecondary }}>{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28" style={{ backgroundColor: THEME.bg }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: THEME.teal }} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: THEME.teal }}>About</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: THEME.white }}>
                Trusted Care for<br />Every Stage of Life
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: THEME.textSecondary }}>
                Shivai Multispecialty Clinic brings together experienced doctors across multiple disciplines to provide comprehensive, affordable healthcare to families in Hadapsar and Gadital. Whether it is a child's first vaccination, a routine blood test, or a specialist consultation — our team is here for you.
              </p>
              <p className="text-sm leading-relaxed mb-10" style={{ color: THEME.textSecondary }}>
                We believe in taking time with every patient, explaining diagnoses clearly, and recommending only what is necessary. No unnecessary referrals, no unnecessary tests — just honest, patient-first care.
              </p>
              <div className="flex flex-col gap-0">
                {[
                  "Experienced specialist doctors across all departments",
                  "On-site pathology lab and sonography centre",
                  "Same-day test reports — no waiting",
                  "Affordable consultation fees for every family",
                  "Morning and evening slots — designed around your schedule",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3 py-3.5" style={{ borderBottom: `1px solid ${THEME.border}` }}>
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: THEME.tealDim }}>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5l2 2 5-4" stroke={THEME.teal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-xs leading-relaxed" style={{ color: THEME.textSecondary }}>{point}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="flex flex-col gap-4">
              {/* ECG card */}
              <div className="p-6 rounded-2xl" style={{ backgroundColor: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
                <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: THEME.teal }}>ECG Monitoring — On Site</div>
                <div style={{ height: "60px" }}>
                  <ECGLine opacity={0.85} delay={0.4} />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <PulseDot />
                  <span className="text-xs font-semibold" style={{ color: THEME.textSecondary }}>Cardiology & ECG available — no referral needed</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "5.0", u: "/ 5", l: "Google Rating" },
                  { v: "128", u: "+", l: "Happy Patients" },
                ].map((item) => (
                  <div key={item.l} className="p-5 rounded-2xl text-center" style={{ backgroundColor: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
                    <div className="flex items-baseline justify-center gap-0.5 mb-1">
                      <span className="text-3xl font-black" style={{ color: THEME.teal }}>{item.v}</span>
                      <span className="text-base font-bold" style={{ color: THEME.teal }}>{item.u}</span>
                    </div>
                    <div className="text-xs" style={{ color: THEME.textMuted }}>{item.l}</div>
                  </div>
                ))}
              </div>

              <div
                className="p-6 rounded-2xl flex items-start gap-4 transition-all duration-200 cursor-default"
                style={{ backgroundColor: THEME.tealDim, border: `1px solid ${THEME.tealBorder}` }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 32px ${THEME.teal}18`)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: THEME.teal }}>
                  <SvgIcon path="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" size={16} color={THEME.bg} sw={2.5} />
                </div>
                <div>
                  <div className="text-sm font-black mb-1" style={{ color: THEME.teal }}>Urgent Care</div>
                  <div className="text-xs mb-3" style={{ color: THEME.textSecondary }}>Walk-ins welcome. For urgent cases, call directly and we prioritise your slot.</div>
                  <a href={`tel:${SITE.phone}`} className="text-xs font-black cursor-pointer" style={{ color: THEME.teal }}>
                    {SITE.phone} &rarr;
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timings */}
      <section id="timings" className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: THEME.bgSection }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025 }}>
          <div style={{ backgroundImage: `linear-gradient(${THEME.teal} 1px, transparent 1px), linear-gradient(90deg, ${THEME.teal} 1px, transparent 1px)`, backgroundSize: "40px 40px", width: "100%", height: "100%" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: THEME.teal }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: THEME.teal }}>OPD Hours</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3" style={{ color: THEME.white }}>
              Here When You Need Us
            </h2>
            <p className="text-sm max-w-md mb-14" style={{ color: THEME.textSecondary }}>
              Six days a week, morning and evening — designed around your schedule.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Morning OPD", time: SITE.timings.morning, sub: SITE.timings.days, icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z", highlight: false },
              { label: "Evening OPD", time: SITE.timings.evening, sub: SITE.timings.days, icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z", highlight: true },
              { label: "Sunday", time: "By Appointment", sub: "Call to confirm your slot", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", highlight: false },
            ].map((slot, i) => (
              <Reveal key={slot.label} delay={i * 0.1}>
                <div
                  className="p-8 rounded-2xl transition-all duration-200 cursor-default"
                  style={{
                    backgroundColor: slot.highlight ? THEME.tealDim : THEME.bgCard,
                    border: `1px solid ${slot.highlight ? THEME.tealBorder : THEME.border}`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${THEME.teal}12`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: slot.highlight ? THEME.teal : THEME.tealDim }}>
                    <SvgIcon path={slot.icon} size={17} color={slot.highlight ? THEME.bg : THEME.teal} />
                  </div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: THEME.teal }}>{slot.label}</div>
                  <div className="text-2xl font-black mb-1" style={{ color: THEME.white }}>{slot.time}</div>
                  <div className="text-xs" style={{ color: THEME.textMuted }}>{slot.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 md:py-28" style={{ backgroundColor: THEME.bg }}>
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: THEME.teal }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: THEME.teal }}>Patient Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3" style={{ color: THEME.white }}>
              {SITE.reviews} Reviews. {SITE.rating} Stars.
            </h2>
            <p className="text-sm max-w-md mb-14" style={{ color: THEME.textSecondary }}>
              Real patients. Real care. What families across Hadapsar say about us.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <div
                  className="p-7 rounded-2xl h-full transition-all duration-200 cursor-default"
                  style={{ backgroundColor: THEME.bgCard, border: `1px solid ${THEME.border}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = THEME.tealBorder; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = THEME.border; e.currentTarget.style.transform = "none"; }}
                >
                  <Stars count={r.rating} />
                  <p className="text-sm leading-relaxed mt-4 mb-6" style={{ color: THEME.textSecondary }}>"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0" style={{ backgroundColor: THEME.tealDim, color: THEME.teal }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-black" style={{ color: THEME.white }}>{r.name}</div>
                      <div className="text-xs" style={{ color: THEME.textMuted }}>Verified Patient</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28" style={{ backgroundColor: THEME.bgSection }}>
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: THEME.teal }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: THEME.teal }}>Find Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3" style={{ color: THEME.white }}>Visit Shivai Clinic</h2>
            <p className="text-sm max-w-md mb-14" style={{ color: THEME.textSecondary }}>
              Gadital, Hadapsar. Walk in during OPD hours or call to book your slot.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${THEME.border}` }}>
                <iframe
                  title="Shivai Multispecialty Clinic Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5!2d73.9360!3d18.5017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3e964d738cf%3A0xfffdd785ef2ff6c8!2sShivai%20Multispecialty%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="300"
                  className="block w-full md:h-[380px]"
                  style={{ border: "none", filter: "invert(1) hue-rotate(180deg) saturate(0.5) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-0">
                {[
                  { label: "Address", value: SITE.address },
                  { label: "Phone", value: SITE.phone, href: `tel:${SITE.phone}` },
                  { label: "Morning", value: `${SITE.timings.days} · ${SITE.timings.morning}` },
                  { label: "Evening", value: `${SITE.timings.days} · ${SITE.timings.evening}` },
                  { label: "Sunday", value: "By Appointment Only" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-5 py-4" style={{ borderBottom: `1px solid ${THEME.border}` }}>
                    <span className="text-xs font-bold tracking-widest uppercase w-16 flex-shrink-0 mt-0.5" style={{ color: THEME.teal }}>{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold cursor-pointer transition-colors duration-150"
                        style={{ color: THEME.offWhite }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = THEME.teal)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = THEME.offWhite)}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm" style={{ color: THEME.textSecondary }}>{item.value}</span>
                    )}
                  </div>
                ))}
                <div className="flex gap-3 pt-5">
                  <a
                    href={`tel:${SITE.phone}`}
                    className="flex-1 py-4 text-center text-xs font-black tracking-wider uppercase rounded-full cursor-pointer transition-all duration-200"
                    style={{ backgroundColor: THEME.teal, color: THEME.bg }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 24px ${THEME.tealGlow}`)}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    Call Us
                  </a>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 text-center text-xs font-black tracking-wider uppercase rounded-full cursor-pointer transition-all duration-200"
                    style={{ backgroundColor: "transparent", color: THEME.white, border: `1px solid ${THEME.borderBright}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = THEME.teal; e.currentTarget.style.color = THEME.teal; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = THEME.borderBright; e.currentTarget.style.color = THEME.white; }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: THEME.bg, borderTop: `1px solid ${THEME.border}` }}>
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: THEME.teal }}>
              <SvgIcon path="M22 12h-4l-3 9L9 3l-3 9H2" size={11} color={THEME.bg} sw={2.5} />
            </div>
            <span className="text-xs font-black" style={{ color: THEME.white }}>Shivai <span style={{ color: THEME.teal }}>Clinic</span></span>
          </div>
          <span className="text-xs text-center" style={{ color: THEME.textMuted }}>{SITE.addressShort}</span>
          <span className="text-xs" style={{ color: THEME.textMuted }} suppressHydrationWarning>&copy; {year} {SITE.name}</span>
        </div>
      </footer>

    </div>
  );
}